import { type PropType, defineComponent, provide, watchEffect, watch, type Ref } from 'vue'
import { type Schema } from './types'
import SchemaItem from './SchemaItem'
import { SchemaFormContextKey } from './fields/context'

interface ContextRef {
  doValidate: () => {
    errors: any[]
    valid: boolean
  }
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
    // theme: {
    //   type: Object as PropType<Theme>,
    //   required: true
    // }
  },
  setup(props) {
    const handleChange = (v: any) => {
      props.onChange(v)
    }

    watch(
      () => props.contextRef,
      () => {
        if (props.contextRef) {
          props.contextRef.value = {
            doValidate () {
              console.log('is exec')
              return {
                valid: true,
                errors: [],
              }
            },
          }
        }
      },
      {
        immediate: true
      }
    )

    provide(SchemaFormContextKey, { SchemaItem })

    return () => {
      const { schema, value } = props
      return (
        <SchemaItem schema={schema} value={value} rootSchema={schema} onChange={handleChange} />
      )
    }
  },
})
