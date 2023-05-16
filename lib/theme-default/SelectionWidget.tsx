import { type PropType, defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'SelectionWidget',
  props: {
    value: {},
    onChange: {
      type: Function as PropType<(v: any) => void>,
      required: true
    },
    options: {
      type: Array as PropType<{ key: string; value: any }[]>,
      required: true
    }
  },
  setup(props) {
    const currentValueRef = ref(props.value)

    watch(currentValueRef, (newValue) => {
      if (newValue !== props.value) {
        props.onChange(newValue)
      }
    })

    watch(
      () => props.value,
      (v) => {
        if (v !== currentValueRef.value) {
          currentValueRef.value = v
        }
      }
    )

    return () => {
      const { options } = props

      return (
        <select multiple v-model={currentValueRef.value}>
          {options.map((op) => (
            <option value={op.value}>{op.key}</option>
          ))}
        </select>
      )
    }
  }
})
