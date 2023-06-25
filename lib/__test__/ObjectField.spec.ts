import { mount } from '@vue/test-utils'
import { NumberField, SchemaForm, StringField } from '..'

describe('ObjectField', () => {
  it('should render correct number field', async () => {
    const wrapper = mount(SchemaForm, {
      props: {
        schema: {
          type: 'object',
          title: 'Object field',
          properties: {
            name: {
              title: 'name',
              type: 'string'
            },
            age: {
              title: 'age',
              type: 'number'
            }
          },

        },
        value: {}
      }
    })

    const strField = wrapper.findComponent(StringField)
    const numField = wrapper.findComponent(NumberField)
    expect(strField.exists()).toBeTruthy()
    expect(numField.exists()).toBeTruthy()
  })
})
