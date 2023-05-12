import Ajv from 'ajv'

const schema = {
  type: 'string',
  minLength: 10
}

const ajv = new Ajv()
const validate = ajv.compile(schema)
const valid = validate('cupid')

if (!valid) {
  console.log(validate.errors)
}
