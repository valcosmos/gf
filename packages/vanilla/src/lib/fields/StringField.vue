<script setup lang="ts">
import { computed, toRefs } from 'vue'

import { CommonWidgetNames, type EmitProps, type FieldPropsDefineProps } from '../types'

import { getWidget } from '../theme'

const props = defineProps<FieldPropsDefineProps>()

const emit = defineEmits<EmitProps>()

function handleChange(v: string) {
  emit('change', v)
}
const TextWidgetRef = computed(() => {
  const widgetRef = getWidget(CommonWidgetNames.TextWidget, props)
  return widgetRef.value
})

const widgetOptionsRef = computed(() => {
  const { widget, properties, items, ...rest } = props.uiSchema!
  return rest
})

const { rootSchema, errorSchema, ...rest } = toRefs(props)
</script>

<template>
  <component
    :is="TextWidgetRef"
    v-bind="rest"
    @change="handleChange"
    :errors="errorSchema?.__errors"
    :options="widgetOptionsRef"
  />
</template>

<style scoped></style>
