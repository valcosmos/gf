import Ajv from 'ajv'

import localize from 'ajv-i18n'

const schema = {
  type: 'object',
  minLength: 10
}

const ajv = new Ajv()
const validate = ajv.compile(schema)
const valid = validate('cupid')

if (!valid) {
  localize.zh(validate.errors)
  console.log(validate.errors)
}
