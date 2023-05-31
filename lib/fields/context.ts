import { type Ref, inject } from 'vue'
import type { CommonFieldDefine, CommonWidgetDefine, Schema } from './../types'

export const SchemaFormContextKey = Symbol('SchemaFormContextKey')

export function useVJSFContext() {
  const context:
  | {
    SchemaItem: CommonFieldDefine
    formatMapRef: Ref<{ [key: string]: CommonWidgetDefine }>
    transformSchemaRef: Ref<(schema: Schema) => Schema>
  }
  | undefined = inject(SchemaFormContextKey)

  if (!context)
    throw new Error('SchemaForm should be used')

  return context
}
