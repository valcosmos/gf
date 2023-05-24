import type Ajv from 'ajv'
import type { Schema } from './types'
import i18n from 'ajv-i18n'
import type { ErrorObject } from 'ajv'
import toPath from 'lodash.topath'

interface TransformedErrorObject {
  name: string
  property: string
  message?: string
  params: Record<string, any>
  schemaPath: string
}

export type Language = keyof typeof i18n

export type ErrorSchema = {
  [level: string]: ErrorSchema
} & { __errors: string[] }

function transformErrors(errors: ErrorObject[] | null | undefined): TransformedErrorObject[] {
  if (errors === null || errors === undefined) return []

  return (
    errors?.map(({ message, instancePath, keyword, params, schemaPath }) => {
      return {
        name: keyword,
        property: `${instancePath}`,
        message,
        params,
        schemaPath,
      }
    }) || []
  )
}

function toErrorSchema(errors: TransformedErrorObject[]) {
  if (errors.length < 1) return {}

  return errors.reduce((errorSchema, error) => {
    const { property, message } = error
    const path = toPath(property) // /obj/obj1  ==>  [obj, obj1]
    let parent = errorSchema

    if (path.length > 0 && path[0] === '') {
      path.splice(0, 1)
    }
    for (const segment of path.slice(0)) {
      if (!(segment in parent)) {
        ;(parent as any)[segment] = {}
      }
      parent = parent[segment]
    }
    if (Array.isArray(parent.__errors)) {
      parent.__errors = parent.__errors.concat(message || '')
    } else {
      if (message) {
        parent.__errors = [message]
      }
    }
    return errorSchema
  }, {} as ErrorSchema)
}

export function validateFormData(validator: Ajv, formData: any, schema: Schema, locale: Language = 'zh') {
  let validationError: any
  try {
    validator.validate(schema, formData)
  } catch (error) {
    validationError = error
  }

  i18n[locale](validator.errors)

  let errors = transformErrors(validator.errors)

  if (validationError) {
    errors = [...errors, { message: validationError.message } as TransformedErrorObject]
  }
  const errorSchema = toErrorSchema(errors)

  return { errors, errorSchema, valid: errors.length === 0 }
}
