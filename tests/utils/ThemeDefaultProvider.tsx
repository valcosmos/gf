import { defineComponent } from 'vue'

import { ThemeProvider } from '../../lib'
import defaultTheme from '../../lib/theme-default'

export default defineComponent({
  name: 'ThemeDefaultProvider',
  setup(p, { slots }) {
    return () => <ThemeProvider theme={defaultTheme}>{slots.default?.()}</ThemeProvider>
  }
})
