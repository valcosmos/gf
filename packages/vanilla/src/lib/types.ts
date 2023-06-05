import type { FormatDefinition, KeywordDefinition } from 'ajv'
import i18n from 'ajv-i18n'
import type { DefineComponent, PropType } from 'vue'

export enum SchemaTypes {
  'NUMBER' = 'number',
  'INTEGER' = 'integer',
  'STRING' = 'string',
  'OBJECT' = 'object',
  'ARRAY' = 'array',
  'BOOLEAN' = 'boolean'
}

export type LanguageProps = keyof typeof i18n

interface SchemaRef {
  $ref: string
}

export interface EmitProps {
  // change: [value: string]
  (e: 'change', value: any): void
}

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
  // vjsf?: VueJsonSchemaConfig
  required?: string[]
  enum?: any[]
  enumKeyValue?: any[]
  additionalProperties?: any
  additionalItems?: Schema
}

export type ErrorSchema = {
  [level: string]: ErrorSchema
} & { __errors?: string[] }

export interface FieldPropsDefineProps {
  schema: Schema
  value: any
  rootSchema: Schema
  errorSchema: ErrorSchema
  uiSchema: UISchema
}

export type CommonFieldDefine = DefineComponent<FieldPropsDefineProps>

export interface CommonWidgetProps {
  schema: Schema
  value?: any
  errors?: string[]
  options?: Record<string, any>
}

// export const SelectWidgetPropsDefine = {
//   ...CommonWidgetPropsDefine,
//   options: {
//     type: Array as PropType<{ key: string; value: any }[]>,
//     required: true
//   }
// } as const

export interface SelectWidgetProps extends Omit<CommonWidgetProps, 'options'> {
  options: { key: string; value: any }[]
}

export type CommonWidgetDefine = DefineComponent<CommonWidgetProps, {}, {}>
export type SelectionWidgetDefine = DefineComponent<SelectWidgetProps, {}, {}>

export enum SelectionWidgetNames {
  SelectionWidget = 'SelectionWidget'
}

export enum CommonWidgetNames {
  TextWidget = 'TextWidget',
  NumberWidget = 'NumberWidget'
}
/**
 * define theme
 */
export interface Theme {
  widgets: {
    [SelectionWidgetNames.SelectionWidget]: SelectionWidgetDefine
    [CommonWidgetNames.TextWidget]: CommonWidgetDefine
    [CommonWidgetNames.NumberWidget]: CommonWidgetDefine
  }
}

export type UISchema = {
  widget?: string | CommonWidgetDefine
  properties?: {
    [key: string]: UISchema
  }
  items?: UISchema | UISchema[]
} & {
  [key: string]: any
}

export interface CustomFormatProps {
  name: string
  definition: FormatDefinition<string | number>
  component: CommonWidgetDefine
}

export interface CustomKeywordProps {
  name: string
  definition: KeywordDefinition
  transformSchema: (originSchema: Schema) => Schema
}