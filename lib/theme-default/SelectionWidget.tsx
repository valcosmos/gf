import { defineComponent, ref, watch } from 'vue'
import { SelectWidgetPropsDefine, type SelectionWidgetDefine } from '../types'

export const SelectionWidget: SelectionWidgetDefine = defineComponent({
  name: 'SelectionWidget',
  props: SelectWidgetPropsDefine,
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

export default SelectionWidget
