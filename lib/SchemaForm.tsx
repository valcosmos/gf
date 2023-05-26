import {
  type PropType,
  defineComponent,
  provide,
  watchEffect,
  watch,
  type Ref,
  shallowRef,
} from 'vue'
import { type Schema } from './types'
import SchemaItem from './SchemaItem'
import { SchemaFormContextKey } from './fields/context'
import type { Options } from 'ajv'
import Ajv from 'ajv'
import { validateFormData, type Language, type ErrorSchema } from './validator'

interface ContextRef {
  doValidate: () => {
    errors: any[]
    valid: boolean
  }
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

    watch(
      () => props.contextRef,
      () => {
        if (props.contextRef) {
          props.contextRef.value = {
            doValidate() {
              // const valid = validatorRef.value?.validate(props.schema, props.value)!

              const result = validateFormData(
                validatorRef.value!,
                props.value,
                props.schema,
                props.locale,
                props.customValid
              )

              errorSchemaRef.value = result.errorSchema

              return result
              // return {
              //   valid: valid,
              //   errors: validatorRef.value?.errors || [],
              // }
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
