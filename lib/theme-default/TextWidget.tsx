import { defineComponent } from 'vue'
import { type CommonWidgetDefine, CommonWidgetPropsDefine } from '../types'
import FormItem, { withFormItem } from './FormItem'

const TextWidget: CommonWidgetDefine = withFormItem(
  defineComponent({
    name: 'TextWidget',
    props: CommonWidgetPropsDefine,
    setup(props, { emit }) {
      console.log(props.onChange)
      const handleChange = (e: any) => {
        const value = e.target.value
        e.target.value = props.value
        // e.target.value = props.value
        props.onChange(value)
      }
      return () => (
        // <FormItem {...props}>
          <input type="text" value={props.value} onInput={handleChange} />
        // </FormItem>
      )
    },
  }),
)

export default TextWidget
