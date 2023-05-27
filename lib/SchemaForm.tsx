import {
  type PropType,
  defineComponent,
  provide,
  watchEffect,
  watch,
  type Ref,
  shallowRef,
  ref,
} from 'vue'
import { type Schema } from './types'
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
    // theme: {
    //   type: Object as PropType<Theme>,
    //   required: true
    // }
  },
  setup(props) {
    const handleChange = (v: any) => {
      props.onChange(v)
    }

    const errorSchemaRef = shallowRef<ErrorSchema>({})

    const validatorRef = shallowRef<Ajv>()

    watchEffect(() => {
      validatorRef.value = new Ajv({
        ...defaultAjvOptions,
        ...props.ajvOptions,
      })
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

    provide(SchemaFormContextKey, { SchemaItem })

    return () => {
      const { schema, value } = props
      return (
        <SchemaItem
          schema={schema}
          value={value}
          rootSchema={schema}
          onChange={handleChange}
          errorSchema={errorSchemaRef.value || {}}
        />
      )
    }
  },
})
