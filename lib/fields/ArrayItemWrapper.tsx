import { type PropType, defineComponent } from 'vue'
import { createUseStyles } from 'vue-jss'

const useStyles = createUseStyles({
  container: {
    border: '1px solid #eee'
  },
  actions: {
    background: '#eee',
    padding: '10px',
    textAlign: 'right'
  },
  action: {
    '& + &': {
      marginLeft: '10px'
    }
  },
  content: {
    padding: '10px'
  }
})

export default defineComponent({
  name: 'ArrayItemWrapper',
  props: {
    onAdd: {
      type: Function as PropType<(index: number) => void>,
      required: true
    },
    onDelete: {
      type: Function as PropType<(index: number) => void>,
      required: true
    },
    onUp: {
      type: Function as PropType<(index: number) => void>,
      required: true
    },
    onDown: {
      type: Function as PropType<(index: number) => void>,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  setup(props, { slots }) {
    const classesRef = useStyles()
    return () => {
      const classes = classesRef.value
      return (
        <div class={classes.container}>
          <div class={classes.actions}>
            <button class={classes.action} onClick={() => props.onAdd(props.index)}>
              新增
            </button>
            <button class={classes.action} onClick={() => props.onDelete(props.index)}>删除</button>
            <button class={classes.action} onClick={() => props.onUp(props.index)}>上移</button>
            <button class={classes.action} onClick={() => props.onDown(props.index)}>下移</button>
          </div>

          <div class={classes.content}>{slots.default?.()}</div>
        </div>
      )
    }
  }
})
