import { inject } from 'vue'
import type { SchemaItemType } from './types'

export const SchemaFormContextKey = Symbol()

interface ContextProps {
  SchemaItem: SchemaItemType
}

export function useContext() {
  const context = inject<ContextProps>(SchemaFormContextKey)

  if (!context) {
    throw new Error('context is undefined')
  }

  return context
}
