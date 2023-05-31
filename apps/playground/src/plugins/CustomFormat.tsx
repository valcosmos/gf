import { computed, defineComponent } from 'vue'
import {
  CommonWidgetPropsDefine,
  type CustomFormatProps,
} from '../../lib/types'
import { withFormItem } from '../../lib/theme-default/FormItem'

export const CustomFormat: CustomFormatProps = {
  name: 'color',
  definition: {
    type: 'string',
    validate: /^#[0-9A-Fa-f]{6}$/,
  },
  component: withFormItem(
    defineComponent({
      name: 'ColorWidget',
      props: CommonWidgetPropsDefine,
      setup(props) {
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
          <input
            type="color"
            placeholder="1"
            value={props.value}
            onInput={handleChange}
            style={styleRef.value}
          />
          // </FormItem>
        )
      },
    }),
  ),
}
