import { defineComponent } from 'vue'
import { type CommonWidgetDefine, CommonWidgetPropsDefine } from '../types'

const NumberWidget: CommonWidgetDefine = defineComponent({
  name: 'TextWidget',
  props: CommonWidgetPropsDefine,
  setup(props) {
    const handleChange = (e: any) => {
      const value = e.target.value
      e.target.value = props.value
      // e.target.value = props.value
      props.onChange(value)
    }
    return () => <input type="number" value={props.value} onInput={handleChange} />
  },
}) as any

export default NumberWidget
