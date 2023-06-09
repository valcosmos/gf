// import PasswordWidget from '../components/PasswordWidget.vue'

export default {
  name: 'Demo',
  schema: {
    // title: 'label',
    type: 'number',
    // minLength: 10,
    // properties: {
    //   pass1: {
    //     type: 'string',
    //     // minLength: 10,
    //     test: true,
    //     title: 'password'
    //   },
    //   pass2: {
    //     type: 'string',
    //     minLength: 10,
    //     title: 'retry password'
    //   },
    //   color: {
    //     title: 'input color',
    //     type: 'string',
    //     format: 'color'
    //   }
    // }
  },
  async customerValidate(data: any, errors: any) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (data.pass1 !== data.pass2)
          errors.pass2.addError('密码必须相同')

        resolve(true)
      }, 2000)
    })
  },
  uiSchema: {
    properties: {
      pass1: {
        // widget: PasswordWidget
      },
      pass2: {
        color: 'red',
      },
    },
  },
  default: 'Cupid',
}
