<script setup lang="ts">
import * as Monaco from 'monaco-editor'
import { onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue'
interface EditorProps {
  code: string
  title: string
}

type EmitProps = {
  change: [value: string, event: Monaco.editor.IModelContentChangedEvent]
}

const props = defineProps<EditorProps>()
const emits = defineEmits<EmitProps>()

const editorRef = shallowRef()

const containerRef = ref()

let _subscription: Monaco.IDisposable | undefined
let __prevent_trigger_change_event = false

onMounted(() => {
  const editor = (editorRef.value = Monaco.editor.create(containerRef.value, {
    value: props.code,
    language: 'json',
    formatOnPaste: true,
    tabSize: 2,
    minimap: {
      enabled: false
    }
  }))

  _subscription = editor.onDidChangeModelContent((event) => {
    if (!__prevent_trigger_change_event) emits('change', editor.getValue(), event)
  })
})

onBeforeUnmount(() => {
  if (_subscription) _subscription.dispose()
})

watch(
  () => props.code,
  (v) => {
    const editor = editorRef.value
    const model = editor.getModel()
    if (v !== model.getValue()) {
      editor.pushUndoStop()
      __prevent_trigger_change_event = true
      // pushEditOperations says it expects a cursorComputer, but doesn't seem to need one.
      model.pushEditOperations(
        [],
        [
          {
            range: model.getFullModelRange(),
            text: v
          }
        ]
      )
      editor.pushUndoStop()
      __prevent_trigger_change_event = false
    }
    // if (v !== editorRef.value.getValue()) {
    //   editorRef.value.setValue(v)
    // }
  }
)
</script>

<template>
  <div class="editor-container">
    <div class="title">
      <span>{{ title }}</span>
    </div>
    <div class="code" ref="containerRef"></div>
  </div>
</template>

<style lang="scss" scoped>
.editor-container {
  border: 1px solid #eee;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
}

.title {
  background-color: #eee;
  padding: 10px 0;
  padding-left: 20px;
}

.code {
  flex-grow: 1;
}
</style>
