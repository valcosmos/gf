import {
  type PropType,
  defineComponent,
  provide,
  watchEffect,
  watch,
  type Ref,
  shallowRef,
  ref,
  computed,
} from 'vue'
import { type CommonWidgetDefine, type CustomFormatProps, type Schema, type UISchema } from './types'
import SchemaItem from './SchemaItem'
import { SchemaFormContextKey } from './fields/context'
import type { Options } from 'ajv'
import Ajv from 'ajv'
import { validateFormData, type Language, type ErrorSchema } from './validator'

interface ContextRef {
  doValidate: () => Promise<{
    errors: any[]
    valid: boolean
  }>
}

const defaultAjvOptions: Options = {
  allErrors: true,
}

export default defineComponent({
  name: 'SchemaForm',
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true,
    },
    value: {
      required: true,
    },
    onChange: {
      type: Function as PropType<(v: any) => void>,
      required: true,
    },
    contextRef: {
      type: Object as PropType<Ref<ContextRef | undefined>>,
    },
    ajvOptions: {
      type: Object as PropType<Options>,
    },
    locale: {
      type: String as PropType<Language>,
      default: 'zh',
    },
    customValid: {
      type: Function as PropType<(data: any, errors: any) => void>,
    },
    uiSchema: {
      type: Object as PropType<UISchema>,
    },
    customFormats: {
      type: [Array, Object] as PropType<CustomFormatProps[] | CustomFormatProps>,
    },
    // theme: {
    //   type: Object as PropType<Theme>,
    //   required: true
    // }
  },
  setup(props) {
    const handleChange = (v: any) => {
      props.onChange(v)
    }

    const formatMapRef = computed(() => {
      if (props.customFormats) {
        const customFormats = Array.isArray(props.customFormats)
          ? props.customFormats
          : [props.customFormats]
        return customFormats.reduce((result, format) => {
          result[format.name] = format.component
          return result
        }, {} as { [key: string]: CommonWidgetDefine })
      } else {
        return {}
      }
    })

    const errorSchemaRef = shallowRef<ErrorSchema>({})

    const validatorRef = shallowRef<Ajv>()

    watchEffect(() => {
      validatorRef.value = new Ajv({
        ...defaultAjvOptions,
        ...props.ajvOptions,
      })

      if (props.customFormats) {
        const customFormats = Array.isArray(props.customFormats)
          ? props.customFormats
          : [props.customFormats]
        customFormats.forEach((format) => {
          validatorRef.value?.addFormat(format.name, format.definition)
        })
      }
    })

    const validateResolveRef = ref()
    const validateIndex = ref(0)

    watch(
      () => props.value,
      () => {
        validateResolveRef.value && doValidate()
      },
      { deep: true },
    )

    async function doValidate() {
      const index = (validateIndex.value += 1)
      const result = await validateFormData(
        validatorRef.value!,
        props.value,
        props.schema,
        props.locale,
        props.customValid,
      )
      if (index !== validateIndex.value) return
      errorSchemaRef.value = result.errorSchema
      // return result
      validateResolveRef.value(result)
      validateResolveRef.value = undefined
    }

    watch(
      () => props.contextRef,
      () => {
        if (props.contextRef) {
          props.contextRef.value = {
            async doValidate() {
              // const valid = validatorRef.value?.validate(props.schema, props.value)!
              return new Promise((resolve) => {
                validateResolveRef.value = resolve
                doValidate()
              })
            },
          }
        }
      },
      {
        immediate: true,
      },
    )

    provide(SchemaFormContextKey, { SchemaItem, formatMapRef })

    return () => {
      const { schema, value, uiSchema } = props
      return (
        <SchemaItem
          schema={schema}
          value={value}
          rootSchema={schema}
          onChange={handleChange}
          errorSchema={errorSchemaRef.value || {}}
          uiSchema={uiSchema}
        />
      )
    }
  },
})
