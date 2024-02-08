const Ajv = require('ajv')
const addFormats = require('ajv-formats')
const localize = require('ajv-i18n')

const ajv = new Ajv()

addFormats(ajv)

ajv.addFormat('test', (data) => {
  return data === 'Cupid'
})

ajv.addKeyword('test', {
  validate(schema, data) {
    return data === 'Cupid'
  },
})

const schema = {
  type: 'object',
  properties: {
    name: { type: 'string', format: 'test', test: true, minLength: 10 },
    age: { type: 'number' },
    pets: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    isWorker: {
      type: 'boolean',
    },
  },
  // minLength: 10
}

const data = {
  name: 'Cupid',
  age: 18,
  pets: ['cat', 'dog'],
  isWorker: false,
}
const valid = ajv.validate(schema, data)
if (!valid)
  localize.zh(ajv.errors)
