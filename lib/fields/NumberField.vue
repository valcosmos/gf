<script setup lang="ts">
import type { EmitProps, FieldProps } from 'lib/types'
import { toRefs } from 'vue';

const props = defineProps<FieldProps>()

const emits = defineEmits<EmitProps>()

const { value } = toRefs(props)

defineOptions({
  name: 'NumberField'
})

function handleChange (e: any) {
  const value = e.target.value
  const num = Number(value)
  emits('change', Number.isNaN(num) ? '' : num)
}
</script>

<template>
  <input type="number" :value="value" @input="handleChange" />
</template>

<style scoped></style>
