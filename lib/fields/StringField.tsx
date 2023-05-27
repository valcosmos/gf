import { CommonWidgetNames, FieldPropsDefine } from '../types'
import { getWidget } from '../theme'
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'StringField',
  props: FieldPropsDefine,
  setup(props) {
    function handleChange(v: string) {
      props.onChange(v)
    }
    const TextWidgetRef = computed(() => { 
      const widgetRef = getWidget(CommonWidgetNames.TextWidget, props.uiSchema)
      return widgetRef.value
    })

    return () => {
      const { rootSchema, errorSchema, ...rest } = props
      const TextWidget = TextWidgetRef.value

      return <TextWidget {...rest} errors={errorSchema?.__errors} onChange={handleChange} />
    }
  },
})
