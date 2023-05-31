import {
  type ComputedRef,
  type ExtractPropTypes,
  type PropType,
  computed,
  defineComponent,
  inject,
  provide,
  shallowRef,
  toRaw,
} from 'vue'
import type {
  CommonWidgetNames,
  FieldPropsDefine,
  SelectionWidgetNames,
  Theme,
} from './types'
import { isObject } from './utils'
import { useVJSFContext } from './fields/context'

const THEME_PROVIDER_KEY = Symbol('THEME_PROVIDER_KEY')

const ThemeProvider = defineComponent({
  name: 'VJSFThemeProvider',
  props: {
    theme: {
      type: Object as PropType<Theme>,
      required: true,
    },
  },
  setup(props, { slots }) {
    const context = computed(() => props.theme)

    provide(THEME_PROVIDER_KEY, context)

    return () => slots.default?.()
  },
})

export function getWidget<T extends SelectionWidgetNames | CommonWidgetNames>(
  name: T,
  props?: ExtractPropTypes<typeof FieldPropsDefine>,
) {
  const formContext = useVJSFContext()

  if (props) {
    const { uiSchema, schema } = props
    if (uiSchema?.widget && isObject(uiSchema.widget))
      return shallowRef(toRaw(uiSchema.widget))

    if (schema.format) {
      console.log(formContext.formatMapRef.value, schema.format)
      if (formContext.formatMapRef.value[schema.format]) {
        console.log(111)

        return shallowRef(formContext.formatMapRef.value[schema.format])
      }
    }
  }

  const context = inject<ComputedRef<Theme>>(THEME_PROVIDER_KEY)
  if (!context)
    throw new Error('vjsf theme required')

  const widgetRef = computed(() => {
    return context.value.widgets[name]
  })

  return widgetRef
}

export default ThemeProvider
