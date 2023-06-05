<script setup lang="ts">
import { ref, toRefs, watch } from 'vue'
import type { EmitProps, SelectWidgetProps } from '../types'
import FormItem from './FormItem.vue'

defineOptions({ name: 'SelectionWidget' })

const props = defineProps<SelectWidgetProps>()

const emit = defineEmits<EmitProps>()

const currentValueRef = ref(props.value)

const { options } = toRefs(props)

watch(currentValueRef, (newValue) => {
  if (newValue !== props.value) {
    emit('change', newValue)
  }
})

watch(
  () => props.value,
  (v) => {
    if (v !== currentValueRef.value) {
      currentValueRef.value = v
    }
  }
)
</script>

<template>
  <FormItem v-bind="props">
    <select multiple v-model="currentValueRef">
      <option v-for="(op, index) in options" :key="index" :value="op.value">{{ op.key }}</option>
    </select>
  </FormItem>
</template>

<style scoped></style>
