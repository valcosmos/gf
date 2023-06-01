import { defineComponent } from 'vue'
import { withFormItem } from 'gf'
import { type CommonWidgetDefine, CommonWidgetPropsDefine } from 'gf'

const PasswordWidget: CommonWidgetDefine = withFormItem(
  defineComponent({
    name: 'PasswordWidget',
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
        <input type="password" value={props.value} onInput={handleChange} />
        // </FormItem>
      )
    }
  })
)

export default PasswordWidget
