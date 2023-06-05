<script setup lang="ts">
import { CommonWidgetNames, EmitProps, FieldPropsDefineProps } from '../types'
import { getWidget } from '../theme'
import { toRefs } from 'vue'

const props = defineProps<FieldPropsDefineProps>()
const emit = defineEmits<EmitProps>()

function handleChange(v: string) {
  const value = Number(v)
  if (isNaN(value)) emit('change', undefined)
  else emit('change', value)
}

const NumberWidget = getWidget(CommonWidgetNames.NumberWidget)
// <input type="number" :value="value" @input="handleChange">
const { schema, rootSchema, errorSchema, ...rest } = toRefs(props)
</script>

<template>
  <NumberWidget
    v-bind="rest"
    :schema="schema"
    :errors="errorSchema?.__errors"
    :on-change="handleChange"
  />
</template>

<style scoped></style>
