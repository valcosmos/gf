import { mount } from '@vue/test-utils'
import { NumberField } from '../lib'
import TestComponent from './utils/TestComponent'

describe('JSONSchemaForm', () => {
  it('should render correct number field', async () => {
    let value = ''
    const wrapper = mount(TestComponent, {
      props: {
        schema: {
          title: '',
          type: 'number',
        },
        value,
        onChange: (v: string) => {
          value = v
        },
      },
    })

    const numberField = wrapper.findComponent(NumberField)
    expect(numberField.exists()).toBeTruthy()

    // await numberField.props('onChange')('123')
    const input = numberField.find('input')
    input.element.value = '123'
    input.trigger('input')
    expect(value).toBe(123)
  })
})
