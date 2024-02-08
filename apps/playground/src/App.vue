<script setup lang="ts">
import { type Ref, reactive, ref, watchEffect } from 'vue'

import { SchemaForm, themeDefault } from 'gf'
import demos from './demos/index'

import MonacoEditor from './components/MonacoEditor.vue'

const selectedRef: Ref<number> = ref(0)

type Schema = any
type UISchema = any

function toJson(data: any) {
  return JSON.stringify(data, null, 2)
}

const demo = reactive<{
  schema: Schema | null
  data: any
  uiSchema: UISchema | null
  schemaCode: string
  dataCode: string
  uiSchemaCode: string
  customerValidate?: (data: any, error: any) => void
}>({
      schema: null,
      data: {},
      uiSchema: {},
      schemaCode: '',
      dataCode: '',
      uiSchemaCode: '',
      customerValidate: undefined,
    })

watchEffect(() => {
  const index = selectedRef.value
  const d: any = demos[index]
  demo.schema = d.schema
  demo.data = d.default
  demo.uiSchema = d.uiSchema
  demo.schemaCode = toJson(d.schema)
  demo.dataCode = toJson(d.default)
  demo.uiSchemaCode = toJson(d.uiSchema)
  demo.customerValidate = d.customerValidate
})

function handleChange(v: any) {
  demo.data = v
  demo.dataCode = toJson(v)
}

function handleCodeChange(filed: 'schema' | 'data' | 'uiSchema', value: string) {
  try {
    const json = JSON.parse(value)
    demo[filed] = json
    ;(demo as any)[`${filed}Code`] = value
  }
  catch (err) {
    // some thing
  }
}

const handleSchemaChange = (v: string) => handleCodeChange('schema', v)
const handleDataChange = (v: string) => handleCodeChange('data', v)
const handleUISchemaChange = (v: string) => handleCodeChange('uiSchema', v)

const contextRef = ref()

function validateForm() {
  contextRef.value.doValidate().then(() => {})
}
</script>

<template>
  <div class="container">
    <div class="menu">
      <h1>Vue3 JsonSchema Form</h1>
      <div>
        <button
          v-for="(demo, index) in demos"
          :key="index"
          class="menuButton"
          :class="{ menuSelected: index === selectedRef }"
          @click="() => (selectedRef = index)"
        >
          {{ demo.name }}
        </button>
      </div>
    </div>
    <div class="content">
      <div class="code">
        <MonacoEditor
          :code="demo.schemaCode"
          class="codePanel"
          title="Schema"
          @change="handleSchemaChange"
        />
        <div class="uiAndValue">
          <MonacoEditor
            :code="demo.uiSchemaCode"
            class="codePanel"
            title="UISchema"
            @change="handleUISchemaChange"
          />
          <MonacoEditor
            :code="demo.dataCode"
            class="codePanel"
            title="Value"
            @change="handleDataChange"
          />
        </div>
      </div>
      <div class="form">
        <SchemaForm
          :theme="themeDefault"
          :schema="demo.schema"
          :value="demo.data"
          @change="handleChange"
        />
        <button @click="validateForm">
          校验
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* html,
body {
  width: 100vw;
  height: 100vh;
  background-color: #fff;
} */
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 1200px;
  margin: 0 auto;
}
.menu {
  margin-bottom: 20px;
}
.code {
  width: 700px;
  flex-shrink: 0;
}

.codePanel {
  min-height: 400px;
  margin-bottom: 20px;
}

.uiAndValue {
  display: flex;
  justify-content: space-between;
  & > * {
    width: 46%;
  }
}

.content {
  display: flex;
}

.form {
  padding: 0 20px;
  flex-grow: 1;
}

.menuButton {
  appearance: none;
  border-width: 0;
  background-color: transparent;
  cursor: pointer;
  display: inline-block;
  padding: 15px;
  border-radius: 5px;
  &:hover {
    background: #efefef;
  }
}
.menuSelected {
  background: #337ab7;
  color: #fff;
  &:hover {
    background: #337ab7;
  }
}
</style>
