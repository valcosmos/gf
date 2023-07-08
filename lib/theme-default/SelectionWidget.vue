<script setup lang="ts">
import { ref, watch } from 'vue'

defineOptions({
  name: 'SelectionWidget',
})
const props = defineProps<SelectionProps>()
const emits = defineEmits<SelectionEmitProps>()

interface SelectionProps {
  value: any
  options: Array<{ key: string; value: any }>
}

type SelectionEmitProps = Omit<
  {
    change: [v: any]
  },
  ''
>

const currentRef = ref(props.value)

watch(currentRef, (newValue) => {
  if (newValue !== props.value)
    emits('change', newValue)
})

watch(
  () => props.value,
  (v) => {
    if (v !== currentRef.value)
      currentRef.value = v
  },
)
</script>

<template>
  <select v-model="currentRef" multiple>
    <option v-for="(op, index) in options" :key="index" :value="op.value">
      {{ op.key }}
    </option>
  </select>
</template>

<style scoped></style>
