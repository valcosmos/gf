import type SchemaItem from './SchemaItem.vue'

export enum SchemaTypes {
  'NUMBER' = 'number',
  'INTEGER' = 'integer',
  'STRING' = 'string',
  'OBJECT' = 'object',
  'ARRAY' = 'array',
  'BOOLEAN' = 'boolean'
}

export type SchemaItemType = typeof SchemaItem

interface SchemaRef {
  $ref: string
}

// type Schema = any
export interface Schema {
  title: string
  type: SchemaTypes | string
  const?: any
  format?: string
  default?: any
  properties?: {
    [key: string]: Schema
  }
  items?: Schema | Schema[] | SchemaRef
  dependencies?: {
    [key: string]: string[] | Schema | SchemaRef
  }
  oneOf?: Schema[]

  required?: string[]
  enum?: any[]
  enumKeyValue?: any[]
  additionalProperties?: any
  additionalItems?: Schema
}

// export type Simplify<T> = { [K in keyof T]: T[K] } & {}

export type EmitProps = Omit<
  {
    change: [v: any]
  },
  ''
>

export interface FieldProps {
  schema: Schema
  value: any
  rootSchema: Schema
}
