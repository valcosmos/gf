import { defineComponent } from 'vue'
import { FieldPropsDefine, type Schema } from '../types'
import { useVJSFContext } from './context'

/**
 * {
 *    items: { type: string }
 * }
 *
 * {
 *    items: [ { type: string }, { type: number } ]
 * }
 *
 * {
 *    items: { type: string, enum: ['1', '2'] }
 * }
 *
 */
export default defineComponent({
  name: 'ArrayField',
  props: FieldPropsDefine,
  setup(props) {
    const context = useVJSFContext()

    const handleMultiTypeChange = (v: any, index: number) => {
      const { value } = props
      const arr = Array.isArray(value) ? value : []
      arr[index] = v
      props.onChange(arr)
    }

    return () => {
      const { schema, rootSchema, value } = props

      const SchemaItem = context.SchemaItem

      const isMultiType = Array.isArray(schema.items)

      if (isMultiType) {
        const items: Schema[] = schema.items as any
        const arr = Array.isArray(value) ? value : []

        return items.map((s: Schema, index: number) => (
          <SchemaItem
            schema={s}
            key={index}
            rootSchema={rootSchema}
            value={arr[index]}
            onChange={(v) => handleMultiTypeChange(v, index)}
          />
        ))
      }
      return <div>11</div>
    }
  }
})
