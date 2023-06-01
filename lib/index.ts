import SchemaForm from './SchemaForm'
import NumberField from './fields/NumberField.vue'
import StringField from './fields/StringField'
import ArrayField from './fields/ArrayField'
import SelectionWidget from './widgets/SelectionWidget'
import ThemeProvider from './theme'
import themeDefault from './theme-default'
import { withFormItem } from './theme-default/FormItem'

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
