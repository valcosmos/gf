<script setup lang="ts">
import { getWidget } from '../theme'
import { CommonWidgetNames, FieldPropsDefine } from '../types'

const props = defineProps(FieldPropsDefine)

// function handleChange(e: any) {
//   props.onChange(e.target.value)
// }

const TextWidgetRef = getWidget(CommonWidgetNames.TextWidget)
// <!-- <input type="text" :value="value" @input="handleChange"> -->
const { schema, rootSchema, ...rest } = props
</script>

<template>
  <TextWidgetRef v-bind="rest" />
</template>

<style scoped />
