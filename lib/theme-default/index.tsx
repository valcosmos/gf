import { defineComponent } from 'vue'
import { type CommonWidgetDefine, CommonWidgetPropsDefine } from '../types'
import SelectionWidget from './SelectionWidget'
import TextWidget from './TextWidget'
import NumberWidget from './NumberWidget'

const CommonWidget: CommonWidgetDefine = defineComponent({
  props: CommonWidgetPropsDefine,
  setup() {
    return () => null
  },
}) as any

export default {
  widgets: {
    SelectionWidget,
    TextWidget,
    NumberWidget,
  },
}
