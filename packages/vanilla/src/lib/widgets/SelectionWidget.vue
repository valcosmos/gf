<script setup lang="ts">
import { ref, toRefs, watch } from 'vue'

interface SelectionWidgetProps {
  options: { key: string; value: any }[]
  value?: any
}

type EmitProps = {
  change: [v: any]
}

defineOptions({
  name: 'SelectionWidget'
})

const props = defineProps<SelectionWidgetProps>()

const emit = defineEmits<EmitProps>()

const { options } = toRefs(props)

const currentValueRef = ref(props.value)

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
  <select multiple v-model="currentValueRef">
    <option v-for="(op, index) in options" :key="index" :value="op.value">{{ op.key }}</option>
  </select>
</template>

<style scoped></style>
