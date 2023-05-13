import { type PropType, defineComponent, h } from 'vue'
import { type Schema, SchemaTypes } from './types'

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
    return () => {
      const schema = props.schema
      const type = schema?.type

      switch (type) {
        case SchemaTypes.STRING: {
          return <input type="text" />
        }
      }

      return h('div', 'this is form')
    }
  }
})
