import { type PropType, defineComponent, provide } from 'vue'
import { type Schema } from './types'
import SchemaItem from './SchemaItem'
import { SchemaFormContextKey } from './fields/context'

export default defineComponent({
  name: 'SchemaForm',
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true
    },
    value: {
      required: true
    },
    onChange: {
      type: Function as PropType<(v: any) => void>,
      required: true
    }
  },
  setup(props, { slots }) {
    const handleChange = (v: any) => {
      props.onChange(v)
    }

    provide(SchemaFormContextKey, { SchemaItem })

    return () => {
      const { schema, value } = props
      return (
        <SchemaItem schema={schema} value={value} rootSchema={schema} onChange={handleChange} />
      )
    }
  }
})
