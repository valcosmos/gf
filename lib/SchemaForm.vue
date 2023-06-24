<script setup lang="ts">
import { provide, toRefs } from 'vue'
import { type EmitProps, type Schema } from './types'
import SchemaItem from './SchemaItem.vue'
import { SchemaFormContextKey } from './context'

const props = defineProps<SchemaFormProps>()
const emits = defineEmits<EmitProps>()

const { value } = toRefs(props)

defineOptions({
  name: 'SchemaForm'
})

interface SchemaFormProps {
  schema: Schema
  value: any
}

function handleChange (v: any) {
  emits('change', v)
}

const context = {
  SchemaItem
}

provide(SchemaFormContextKey, context)
</script>

<template>
  <SchemaItem :schema="schema" :value="value" :root-schema="schema" @change="handleChange" />
</template>

<style scoped></style>
