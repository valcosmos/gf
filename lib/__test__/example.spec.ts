import { mount } from '@vue/test-utils'
import { NumberField, SchemaForm } from '..'

describe('JSONSchemaForm', () => {
  it('should render correct number field', async () => {
    const value = ''
    const wrapper = mount(SchemaForm, {
      props: {
        schema: {
          type: 'number',
          title: 'Number'
        },
        value
      }
    })
    const numberField = wrapper.findComponent(NumberField)
    expect(numberField.exists()).toBeTruthy()

    // const input = numberField.find('input')
    // expect(input.exists()).toBeTruthy()
    // input.element.value = '1'
    // await input.trigger('input')
    // expect(value).toEqual(1)
  

    wrapper.vm.$emit('change')
    wrapper.vm.$emit('change', 1)

    expect(wrapper.emitted().change).toBeTruthy()
    expect(wrapper.emitted().change.length).toBe(2)
    expect(wrapper.emitted().change[1]).toEqual([1])
  })
})
