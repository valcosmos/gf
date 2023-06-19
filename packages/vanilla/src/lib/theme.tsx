import { type ComputedRef, computed, inject, shallowRef, toRaw } from 'vue'
import type { CommonWidgetNames, FieldPropsDefineProps, SelectionWidgetNames, Theme } from './types'
import { isObject } from './utils'
import { useVJSFContext } from './fields/context'

export const THEME_PROVIDER_KEY = Symbol('THEME_PROVIDER_KEY')

export function getWidget<T extends SelectionWidgetNames | CommonWidgetNames>(
  name: T,
  props?: FieldPropsDefineProps
) {
  const formContext = useVJSFContext()

  if (props) {
    const { uiSchema, schema } = props
    if (uiSchema?.widget && isObject(uiSchema.widget)) return shallowRef(toRaw(uiSchema.widget))

    if (schema.format) {
      console.log(formContext.formatMapRef.value, schema.format)
      if (formContext.formatMapRef.value[schema.format]) {
        console.log(111)

        return shallowRef(formContext.formatMapRef.value[schema.format])
      }
    }
  }

  const context = inject<ComputedRef<Theme>>(THEME_PROVIDER_KEY)
  if (!context) throw new Error('vjsf theme required')

  const widgetRef = computed(() => {
    return context.value.widgets[name]
  })

  return widgetRef
}
