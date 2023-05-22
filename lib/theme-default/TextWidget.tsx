import { defineComponent } from 'vue'
import { type CommonWidgetDefine, CommonWidgetPropsDefine } from '../types'

const TextWidget: CommonWidgetDefine = defineComponent({
  name: 'TextWidget',
  props: CommonWidgetPropsDefine,
  setup(props) {
    const handleChange = (e: any) => {
      const value = e.target.value
      e.target.value = props.value
      // e.target.value = props.value
      props.onChange(value)
    }
    return () => <input type='text' value={props.value} onInput={handleChange} />
  },
}) as any

export default TextWidget