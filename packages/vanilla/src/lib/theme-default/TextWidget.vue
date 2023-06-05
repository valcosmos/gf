<script setup lang="ts">
import { computed } from 'vue'
import type { CommonWidgetProps, EmitProps } from '../types'
import FormItem from './FormItem.vue';

defineOptions({ name: 'TextWidget' })

const props = defineProps<CommonWidgetProps>()

const emit = defineEmits<EmitProps>()

const handleChange = (e: any) => {
  const value = e.target.value
  e.target.value = props.value
  emit('change', value)
}

const styleRef = computed(() => ({ color: (props.options && props.options.color) || 'black' }))
</script>

<template>
  <FormItem v-bind="props">
    <input type="text" :value="props.value" @input="handleChange" :style="styleRef" />
  </FormItem>
</template>

<style scoped></style>
