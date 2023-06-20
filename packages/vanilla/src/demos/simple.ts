export default {
  name: 'Simple',
  schema: {
    description: 'A simple form example.',
    type: 'object',
    required: ['firstName', 'lastName'],
    properties: {
      firstName: {
        title: 'first name',
        type: 'string',
        default: 'Chuck'
      },
      lastName: {
        title: 'last name',
        type: 'string'
      },
      telephone: {
        title: 'telephone',
        type: 'string',
        minLength: 10
      },
      staticArray: {
        title: 'static array',
        type: 'array',
        items: [
          {
            type: 'string'
          },
          {
            type: 'number'
          }
        ]
      },
      singleTypeArray: {
        title: 'single type array',
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: {
              type: 'string'
            },
            age: {
              type: 'number'
            }
          }
        }
      },
      multiSelectArray: {
        title: 'multi select array',
        type: 'array',
        items: {
          type: 'string',
          enum: ['123', '456', '789']
        }
      }
    }
  },
  uiSchema: {
    title: 'A registration form',
    properties: {
      firstName: {
        title: 'First name'
      },
      lastName: {
        title: 'Last name'
      },
      telephone: {
        title: 'Telephone'
      }
    }
  },
  default: {
    firstName: 'Chuck',
    lastName: 'Norris',
    age: 75,
    bio: 'Roundhouse kicking asses since 1940',
    password: 'noneed',
    singleTypeArray: [{ name: 'Cupid', age: 12 }]
  }
}
