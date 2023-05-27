import type { DefineComponent, PropType } from 'vue'
import type { ErrorSchema } from './validator'

export enum SchemaTypes {
  'NUMBER' = 'number',
  'INTEGER' = 'integer',
  'STRING' = 'string',
  'OBJECT' = 'object',
  'ARRAY' = 'array',
  'BOOLEAN' = 'boolean',
}

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
  // vjsf?: VueJsonSchemaConfig
  required?: string[]
  enum?: any[]
  enumKeyValue?: any[]
  additionalProperties?: any
  additionalItems?: Schema
}

export const FieldPropsDefine = {
  schema: {
    type: Object as PropType<Schema>,
    required: true,
  },
  value: {
    required: true,
  },
  onChange: {
    type: Function as PropType<(v: any) => void>,
    required: true,
  },
  rootSchema: {
    type: Object as PropType<Schema>,
    required: true,
  },
  errorSchema: {
    type: Object as PropType<ErrorSchema>,
    require: true,
  },
  uiSchema: {
    type: Object as PropType<UISchema>,
  },
} as const

export type CommonFieldDefine = DefineComponent<typeof FieldPropsDefine>

export const CommonWidgetPropsDefine = {
  schema: {
    type: Object as PropType<Schema>,
    required: true,
  },
  value: {},
  onChange: {
    type: Function as PropType<(v: any) => void>,
    required: true,
  },
  errors: {
    type: Array as PropType<string[]>,
  },
  options: {
    type: Object as PropType<{ [keys: string]: any }>,
  },
} as const

export const SelectWidgetPropsDefine = {
  ...CommonWidgetPropsDefine,
  options: {
    type: Array as PropType<{ key: string; value: any }[]>,
    required: true,
  },
} as const

export type CommonWidgetDefine = DefineComponent<typeof CommonWidgetPropsDefine, {}, {}>
export type SelectionWidgetDefine = DefineComponent<typeof SelectWidgetPropsDefine, {}, {}>

export enum SelectionWidgetNames {
  SelectionWidget = 'SelectionWidget',
}

export enum CommonWidgetNames {
  TextWidget = 'TextWidget',
  NumberWidget = 'NumberWidget',
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
