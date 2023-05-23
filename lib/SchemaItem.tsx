import { computed, defineComponent } from 'vue'
import { FieldPropsDefine, SchemaTypes } from './types'
import StringField from './fields/StringField'
import NumberField from './fields/NumberField.vue'
import ObjectField from './fields/ObjectField'
import ArrayField from './fields/ArrayField'
import { retrieveSchema } from './utils'

export default defineComponent({
  name: 'SchemaItem',
  props: FieldPropsDefine,
  setup(props) {
    const retrievedSchemaRef = computed(() => {
      const { schema, rootSchema, value } = props

      return retrieveSchema(schema, rootSchema, value)
    })

    // TODO: 如果type没有制定，我们需要猜测这个type

    return () => {
      const { schema } = props

      const type = schema.type

      let Component: any

      switch (type) {
        case SchemaTypes.STRING: {
          Component = StringField
          break
        }

        case SchemaTypes.NUMBER: {
          Component = NumberField
          break
        }

        case SchemaTypes.OBJECT: {
          Component = ObjectField
          break
        }

        case SchemaTypes.ARRAY: {
          Component = ArrayField
          break
        }

        default: {
          console.warn(`${type} is not supported`)
        }
      }

      const retrievedSchema = retrievedSchemaRef.value
      return <Component {...props} schema={retrievedSchema} />
    }
  }
})
