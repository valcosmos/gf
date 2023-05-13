import { defineComponent } from 'vue'
import { FieldPropsDefine, SchemaTypes } from './types'
import StringField from './fields/StringField.vue'
import NumberField from './fields/NumberField'

export default defineComponent({
  name: 'SchemaItem',
  props: FieldPropsDefine,
  setup (props) { 

    const { schema } = props
    
    // TODO: 如果type没有制定，我们需要猜测这个type

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
        
      default: { 
        console.warn(`${type} is not supported`)
      }
    }

    return () => { 
      return <Component {...props} />
    }
  }
})
