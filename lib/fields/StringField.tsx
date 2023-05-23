import { CommonWidgetNames, FieldPropsDefine } from '../types'
import { getWidget } from '../theme'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'StringField',
  props: FieldPropsDefine,
  setup(props) {
    function handleChange(v: string) {
      props.onChange(v)
    }
    const TextWidgetRef = getWidget(CommonWidgetNames.TextWidget)


    return () => {
      const { rootSchema, ...rest } = props
      const TextWidget = TextWidgetRef.value

      return <TextWidget {...rest} onChange={handleChange} />
    }
  },
})
