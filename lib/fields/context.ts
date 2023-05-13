import { inject } from 'vue'
import type { CommonFieldDefine } from './../types'

export const SchemaFormContextKey = Symbol('SchemaFormContextKey')

export function useVJSFContext() {
  const context: { SchemaItem: CommonFieldDefine } | undefined = inject(SchemaFormContextKey)
  if (!context) throw new Error('SchemaForm should be used')
  return context
}
