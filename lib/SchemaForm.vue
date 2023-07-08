<script setup lang="ts">
import { provide, toRefs } from 'vue'
import { type EmitProps, type Schema, type Theme } from './types'
import SchemaItem from './SchemaItem.vue'
import { SchemaFormContextKey } from './context'

defineOptions({
  name: 'SchemaForm',
})
const props = defineProps<SchemaFormProps>()
const emits = defineEmits<EmitProps>()

const { value } = toRefs(props)

interface SchemaFormProps {
  schema: Schema
  value: any
  theme: Theme
}

function handleChange(v: any) {
  emits('change', v)
}

const context = {
  SchemaItem,
  theme: props.theme,
}

provide(SchemaFormContextKey, context)
</script>

<template>
  <SchemaItem :schema="schema" :value="value" :root-schema="schema" @change="handleChange" />
</template>

<style scoped></style>
