import { mount } from '@vue/test-utils'
import { NumberField, SchemaForm } from '..'

describe('jSONSchemaForm', () => {
  it('should render correct number field', async () => {
    const value = ''
    const wrapper = mount(SchemaForm, {
      props: {
        schema: {
          type: 'number',
          title: 'Number',
        },
        value,
      },
    })
    const numberField = wrapper.findComponent(NumberField)
    expect(numberField.exists()).toBeTruthy()

    const input = numberField.find('input')
    expect(input.exists()).toBeTruthy()
    // input.element.value = '1'
    // await input.trigger('input')
    input.setValue('1')
    expect(input.element.value).toBe('1')

    input.element.value = 'n'
    await input.trigger('input')
    expect(input.element.value).toBe('')

    await wrapper.vm.$emit('change')
    await wrapper.vm.$emit('change', 1)

    expect(wrapper.emitted().change).toBeTruthy()
    expect(wrapper.emitted().change.length).toBe(4)
    expect(wrapper.emitted().change[3]).toEqual([1])
  })
})
