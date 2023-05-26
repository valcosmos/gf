import { CommonWidgetPropsDefine, type CommonWidgetDefine } from '../types'
import { defineComponent } from 'vue'

import { createUseStyles } from 'vue-jss'

const useStyles = createUseStyles({
  container: {},
  label: {
    display: 'block',
    color: '#777',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    margin: '5px 0',
    padding: 0,
    paddingLeft: 20,
  },
})

export const FormItem = defineComponent({
  name: 'FormItem',
  props: CommonWidgetPropsDefine,
  setup(props, { slots }) {
    const classesRef = useStyles()

    return () => {
      const { schema, errors } = props
      const classes = classesRef.value

      return (
        <div class={classes.container}>
          <label class={classes.label}>{schema.title}</label>
          {slots.default?.()}
          <ul class={classes.errorText}>
            {errors?.map((err) => (
              <li>{err}</li>
            ))}
          </ul>
        </div>
      )
    }
  },
})

export default FormItem

export function withFormItem(Widget: any) {
  return defineComponent({
    name: `Wrapped${Widget.name}`,
    props: CommonWidgetPropsDefine,
    setup(props) {
      return () => {
        return (
          <FormItem {...props}>
            <Widget {...props} />
          </FormItem>
        )
      }
    },
  }) as CommonWidgetDefine
}
