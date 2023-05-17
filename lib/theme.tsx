import { type ComputedRef, type PropType, computed, defineComponent, inject, provide } from 'vue'
import type { CommonWidgetNames, SelectionWidgetNames, Theme } from './types'

const THEME_PROVIDER_KEY = Symbol('THEME_PROVIDER_KEY')

const ThemeProvider = defineComponent({
  name: 'VJSFThemeProvider',
  props: {
    theme: {
      type: Object as PropType<Theme>,
      required: true
    }
  },
  setup(props, { slots }) {
    const context = computed(() => props.theme)

    provide(THEME_PROVIDER_KEY, context)

    return () => slots.default?.()
  }
})

export function getWidget<T extends SelectionWidgetNames | CommonWidgetNames>(name: T) {
  const context = inject<ComputedRef<Theme>>(THEME_PROVIDER_KEY)
  if (!context) {
    throw new Error('vjsf theme required')
  }

  const widgetRef = computed(() => {
    return context.value.widgets[name]
  })

  return widgetRef
}

export default ThemeProvider
