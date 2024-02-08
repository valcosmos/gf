<script setup lang="ts">
import { toRefs } from 'vue'
import type { EmitProps, FieldProps } from '../types'

defineOptions({
  name: 'NumberField',
})

const props = defineProps<FieldProps>()

const emits = defineEmits<EmitProps>()

const { value } = toRefs(props)

function handleChange(e: any) {
  const value = e.target.value
  const num = Number(value)
  emits('change', Number.isNaN(num) ? '' : num)
}
</script>

<template>
  <input type="number" :value="value" @input="handleChange">
</template>

<style scoped></style>
