import { inject } from 'vue'
import type { SchemaItemType, Theme } from './types'

export const SchemaFormContextKey = Symbol()

interface ContextProps {
  SchemaItem: SchemaItemType
  theme: Theme
}

export function useContext() {
  const context = inject<ContextProps>(SchemaFormContextKey)

  if (!context) {
    throw new Error('context is undefined')
  }

  return context
}
