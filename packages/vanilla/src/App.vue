<script setup lang="ts">
import { reactive, ref, watchEffect, type Ref } from 'vue'
import type { Schema, UISchema } from './lib'

import ThemeProvider from './lib/ThemeProvider.vue'
import demos from './demos'
import CustomFormat from './plugins/CustomFormat.vue'
import { keyword } from './plugins/CustomKeyword'
import MonacoEditor from './components/MonacoEditor.vue'

import SchemaForm from './lib/SchemaForm.vue'

import themeDefault from './lib/theme-default'

const selectedRef: Ref<number> = ref(0)

function toJson(data: any) {
  return JSON.stringify(data, null, 2)
}

const demo: {
  schema: Schema | null
  data: any
  uiSchema: UISchema | null
  schemaCode: string
  dataCode: string
  uiSchemaCode: string
  customerValidate?: (data: any, error: any) => void
} = reactive({
  schema: null,
  data: {},
  uiSchema: {},
  schemaCode: '',
  dataCode: '',
  uiSchemaCode: '',
  customerValidate: undefined
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

const handleChange = (v: any) => {
  demo.data = v
  demo.dataCode = toJson(v)
}

function handleCodeChange(filed: 'schema' | 'data' | 'uiSchema', value: string) {
  try {
    const json = JSON.parse(value)
    demo[filed] = json
    ;(demo as any)[`${filed}Code`] = value
  } catch (err) {
    // some thing
  }
}

const handleSchemaChange = (v: string) => handleCodeChange('schema', v)
const handleDataChange = (v: string) => handleCodeChange('data', v)
const handleUISchemaChange = (v: string) => handleCodeChange('uiSchema', v)

const contextRef = ref()

function validateForm() {
  contextRef.value.doValidate().then((res: any) => {
    console.log(res)
  })
}
</script>

<template>
  <div class="container">
    <div class="menu">
      <h1>Vue3 JsonSchema Form</h1>
    </div>
    <div class="content">
      <div class="code">
        <MonacoEditor
          :code="demo.schemaCode"
          class="codePanel"
          @change="handleSchemaChange"
          title="Schema"
        />
        <div class="uiAndValue">
          <MonacoEditor
            :code="demo.uiSchemaCode"
            class="codePanel"
            @change="handleUISchemaChange"
            title="UISchema"
          />
          <MonacoEditor
            :code="demo.dataCode"
            class="codePanel"
            @change="handleDataChange"
            title="Value"
          />
        </div>
      </div>
      <div class="form">
        <ThemeProvider :theme="themeDefault">
          <SchemaForm
            :schema="demo.schema"
            @change="handleChange"
            :uiSchema="demo.uiSchema || {}"
            :value="demo.data"
            :contextRef="contextRef"
            :customFormats="CustomFormat"
            :customKeywords="keyword"
            :customValid="demo.customerValidate"
          />
        </ThemeProvider>
        <button @click="validateForm">校验</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
