import { defineComponent } from 'vue'
import { FieldPropsDefine } from '../types'
import { isObject } from '../utils'
import { useVJSFContext } from './context'

const schema = {
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



export default defineComponent({
  name: 'ObjectField',
  props: FieldPropsDefine,
  setup(props) {
    const context = useVJSFContext()

    const handleObjectFieldChange = (key: string, v: string) => {
      const value: any = isObject(props.value) ? props.value : {}
      if (value === undefined) {
        delete value[key]
      } else {
        value[key] = v
      }
      props.onChange(value)
    }

    return () => {
      const { schema, rootSchema, value, errorSchema , uiSchema} = props
      const { SchemaItem } = context
      const properties = schema.properties || {}
      const currentValue: any = isObject(value) ? value : {}

      return Object.keys(properties).map((k: string, index: number) => (
        <SchemaItem
          schema={properties[k]}
          rootSchema={rootSchema}
          errorSchema={errorSchema?.[k] || {}}
          value={currentValue[k]}
          key={index}
          uiSchema={uiSchema?.properties ? uiSchema.properties[k] || {} : {}}
          onChange={(v) => handleObjectFieldChange(k, v)}
        />
      ))
    }
  }
})
