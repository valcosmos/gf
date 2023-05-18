import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import SchemaForm from '../../lib'
import type { Schema } from '../../lib/types'
import ThemeDefaultProvider from './ThemeDefaultProvider'

export default defineComponent({
  name: 'TestComponent',
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
  setup(props) {
    return () => (
      <ThemeDefaultProvider>
        <SchemaForm {...props} />
      </ThemeDefaultProvider>
    )
  }
})
