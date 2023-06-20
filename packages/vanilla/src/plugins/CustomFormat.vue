<script setup lang="ts">
import type { CommonWidgetProps, EmitProps } from '@/lib'
import { computed } from 'vue'

const props = defineProps<CommonWidgetProps>()

const emits = defineEmits<EmitProps>()

const handleChange = (e: any) => {
  const value = e.target.value
  e.target.value = props.value
  // e.target.value = props.value
  emits('change', value)
}

const styleRef = computed(() => {
  return {
    color: (props.options && props.options.color) || 'black'
  }
})
</script>

<template>
  <input
    type="color"
    placeholder="1"
    :value="props.value"
    @input="handleChange"
    :style="styleRef"
  />
</template>

<style scoped></style>
