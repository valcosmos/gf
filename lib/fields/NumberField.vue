<script setup lang="ts">
import { CommonWidgetNames, FieldPropsDefine } from '../types'
import { getWidget } from '../theme'

const props = defineProps(FieldPropsDefine)

function handleChange(v: string) {
  const value = Number(v)
  if (isNaN(value))
    props.onChange(undefined)
  else
    props.onChange(value)
}

const NumberWidget = getWidget(CommonWidgetNames.NumberWidget)
// <input type="number" :value="value" @input="handleChange">
const { schema, rootSchema, errorSchema,...rest } = props
</script>

<template>
  <NumberWidget v-bind="rest" :schema="schema" :errors="errorSchema?.__errors" :on-change="handleChange" />
</template>

<style scoped></style>
