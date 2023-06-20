import SelectionWidget from './SelectionWidget.vue'
import TextWidget from './TextWidget.vue'
import NumberWidget from './NumberWidget.vue'

// const CommonWidget: CommonWidgetDefine = defineComponent({
//   props: CommonWidgetPropsDefine,
//   setup() {
//     return () => null
//   }
// }) as any

export default {
  widgets: {
    SelectionWidget,
    TextWidget,
    NumberWidget
  }
}
