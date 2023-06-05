<script setup lang="ts">
import { toRefs } from 'vue'
import FormItem from './FormItem.vue';
import type { CommonWidgetProps, EmitProps } from '../types'

defineOptions({
  name: 'NumberWidget'
})

const props = defineProps<CommonWidgetProps>()

const emit = defineEmits<EmitProps>()

const { value } = toRefs(props)

const handleChange = (e: any) => {
  const value = e.target.value
  e.target.value = value.value
  emit('change', value)
}
</script>

<template>
  <FormItem v-bind="props">
    <input type="number" :value="value" @change="handleChange" />
  </FormItem>
</template>

<style scoped></style>
