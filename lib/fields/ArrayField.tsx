import { defineComponent } from 'vue'
import SelectionWidget from '../widgets/SelectionWidget'
import { FieldPropsDefine, type Schema } from '../types'
import { useVJSFContext } from './context'
import ArrayItemWrapper from './ArrayItemWrapper'

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

    const handleArrayItemChange = (v: any, index: number) => {
      const { value } = props
      const arr = Array.isArray(value) ? value : []
      arr[index] = v
      props.onChange(arr)
    }

    const handleAdd = (index: number) => {
      const { value } = props
      const arr = Array.isArray(value) ? value : []
      arr.splice(index + 1, 0, undefined)
      props.onChange(arr)
    }

    const handleDelete = (index: number) => {
      const { value } = props
      const arr = Array.isArray(value) ? value : []
      arr.splice(index, 1)
      props.onChange(arr)
    }
    const handleUp = (index: number) => {
      const { value } = props

      if (index === 0) {
        return
      }
      const arr = Array.isArray(value) ? value : []
      const item = arr.splice(index, 1)
      arr.splice(index - 1, 0, item[0])
      props.onChange(arr)
    }
    const handleDown = (index: number) => {
      const { value } = props
      const arr = Array.isArray(value) ? value : []

      if (index === arr.length - 1) {
        return
      }
      const item = arr.splice(index, 1)
      arr.splice(index + 1, 0, item[0])
      props.onChange(arr)
    }

    return () => {
      const { schema, rootSchema, value } = props

      const SchemaItem = context.SchemaItem

      const isMultiType = Array.isArray(schema.items)
      const isSelect = schema.items && (schema.items as any).enum

      if (isMultiType) {
        const items: Schema[] = schema.items as any
        const arr = Array.isArray(value) ? value : []

        return items.map((s: Schema, index: number) => (
          <SchemaItem
            schema={s}
            key={index}
            rootSchema={rootSchema}
            value={arr[index]}
            onChange={(v) => handleArrayItemChange(v, index)}
          />
        ))
      } else if (!isSelect) {
        console.log(111)
        const arr = Array.isArray(value) ? value : []
        return arr.map((v: any, index: number) => {
          return (
            <ArrayItemWrapper
              index={index}
              onAdd={handleAdd}
              onDelete={handleDelete}
              onUp={handleUp}
              onDown={handleDown}
            >
              <SchemaItem
                schema={schema.items as Schema}
                value={v}
                key={index}
                rootSchema={rootSchema}
                onChange={(v) => handleArrayItemChange(v, index)}
              />
            </ArrayItemWrapper>
          )
        })
      } else {
        const enumOptions = (schema as any).items.enum
        const options = enumOptions.map((e: any) => ({ key: e, value: e }))
        return <SelectionWidget onChange={props.onChange} value={props.value} options={options} />
      }
      // return <div></div>
    }
  }
})