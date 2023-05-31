import { computed, defineComponent } from 'vue'
import { type CommonWidgetDefine, CommonWidgetPropsDefine } from '../types'
import { withFormItem } from './FormItem'

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

      const styleRef = computed(() => {
        return {
          color: (props.options && props.options.color) || 'black',
        }
      })

      return () => (
        // <FormItem {...props}>
        <input type="text" value={props.value} onInput={handleChange} style={styleRef.value} />
        // </FormItem>
      )
    },
  }),
)

export default TextWidget
