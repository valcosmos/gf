import SchemaForm from './SchemaForm.vue'
import NumberField from './fields/NumberField.vue'
import StringField from './fields/StringField.vue'
import ArrayField from './fields/ArrayField.vue'
import SelectionWidget from './widgets/SelectionWidget.vue'
import ThemeProvider from './ThemeProvider.vue'
import themeDefault from './theme-default'
import withFormItem from './theme-default/WithFormItem.vue'

// export default SchemaForm
export * from './types'

export {
  NumberField,
  StringField,
  ArrayField,
  SelectionWidget,
  ThemeProvider,
  SchemaForm,
  themeDefault,
  withFormItem
}
