<script setup lang="ts">
import type { CommonWidgetProps, EmitProps } from '@/lib'

const props = defineProps<CommonWidgetProps>()
const emits = defineEmits<EmitProps>()

const handleChange = (e: any) => {
  const value = e.target.value
  e.target.value = props.value
  emits('change', value)
}
</script>

<template>
  <input type="password" :value="value" @input="handleChange" />
</template>

<style scoped></style>
