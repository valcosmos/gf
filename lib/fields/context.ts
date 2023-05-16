import { inject } from 'vue'
import type { CommonFieldDefine, Theme } from './../types'

export const SchemaFormContextKey = Symbol('SchemaFormContextKey')

export function useVJSFContext() {
  const context: { theme: Theme; SchemaItem: CommonFieldDefine } | undefined =
    inject(SchemaFormContextKey)

  if (!context) {
    throw new Error('SchemaForm should be used')
  }

  return context
}
