import type Ajv from 'ajv'
import i18n from 'ajv-i18n'
import type { ErrorObject } from 'ajv'
import { toPath } from 'lodash-es'
import type { Schema } from './types'
import { isObject } from './utils'

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
} & { __errors?: string[] }

function transformErrors(errors: ErrorObject[] | null | undefined): TransformedErrorObject[] {
  if (errors === null || errors === undefined) return []

  return (
    errors?.map(({ message, instancePath, keyword, params, schemaPath }) => {
      return {
        name: keyword,
        property: `${instancePath}`,
        message,
        params,
        schemaPath
      }
    }) || []
  )
}

function toErrorSchema(errors: TransformedErrorObject[]) {
  if (errors.length < 1) return {}

  return errors.reduce((errorSchema, error) => {
    const { property, message } = error
    console.log(property)
    const path = toPath(property.replace('/', '')) // /obj/obj1  ==>  [obj, obj1]
    console.log(path)
    let parent = errorSchema

    if (path.length > 0 && path[0] === '') path.splice(0, 1)

    for (const segment of path.slice(0)) {
      if (!(segment in parent)) (parent as any)[segment] = {}

      parent = parent[segment]
    }
    if (Array.isArray(parent.__errors)) {
      parent.__errors = parent.__errors.concat(message || '')
    } else {
      if (message) parent.__errors = [message]
    }
    return errorSchema
  }, {} as ErrorSchema)
}

export async function validateFormData(
  validator: Ajv,
  formData: any,
  schema: Schema,
  locale: Language = 'zh',
  customValidate?: (data: any, errors: any) => void
) {
  let validationError: any
  try {
    validator.validate(schema, formData)
  } catch (error) {
    validationError = error
  }

  i18n[locale](validator.errors)

  let errors = transformErrors(validator.errors)

  if (validationError)
    errors = [...errors, { message: validationError.message } as TransformedErrorObject]

  const errorSchema = toErrorSchema(errors)

  if (!customValidate) return { errors, errorSchema, valid: errors.length === 0 }

  /**
   * {
   *
   * }
   */

  const proxy = createErrorProxy()
  await customValidate(formData, proxy)
  const newErrorSchema = mergeObjects(errorSchema, proxy, true)

  return {
    errors,
    errorSchema: newErrorSchema,
    valid: errors.length === 0
  }
}

function createErrorProxy() {
  const raw = {}

  return new Proxy(raw, {
    get(target, key, receiver) {
      if (key === 'addError') {
        return (msg: string) => {
          const __errors = Reflect.get(target, '__errors', receiver)
          if (__errors && Array.isArray(__errors)) __errors.push(msg)
          else (target as any).__errors = [msg]
        }
      }

      const res = Reflect.get(target, key, receiver)
      if (res === undefined) {
        const p: any = createErrorProxy()
        ;(target as any)[key] = p
        return p
      }

      return res
    }
  })
}

export function mergeObjects(obj1: any, obj2: any, concatArrays = false) {
  // Recursively merge deeply nested objects.
  const acc = Object.assign({}, obj1) // Prevent mutation of source object.
  return Object.keys(obj2).reduce((acc, key) => {
    const left = obj1 ? obj1[key] : {}
    const right = obj2[key]
    if (obj1 && obj1.hasOwnProperty(key) && isObject(right))
      acc[key] = mergeObjects(left, right, concatArrays)
    else if (concatArrays && Array.isArray(left) && Array.isArray(right))
      acc[key] = left.concat(right)
    else acc[key] = right

    return acc
  }, acc)
}
