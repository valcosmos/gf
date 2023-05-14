import { mount } from '@vue/test-utils'
import JSONSchemaForm, { NumberField } from '../lib'

describe('JSONSchemaForm', () => {
  it('should render correct number field', async () => {
    let value = ''
    const wrapper = mount(JSONSchemaForm, {
      props: {
        schema: {
          type: 'number'
        },
        value,
        onChange: (v: string) => {
          value = v
        }
      }
    })

    const numberField = wrapper.findComponent(NumberField)
    expect(numberField.exists()).toBeTruthy()

    await numberField.props('onChange')('123')
    expect(value).toBe('123')
  })
})
