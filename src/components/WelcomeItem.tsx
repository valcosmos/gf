import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    count: {
      type: Array<number>,
      default: () => [],
    },
  },
  setup(props) {
    const { count } = props

    return () => {
      return <div>{count}</div>
    }
  },
})
