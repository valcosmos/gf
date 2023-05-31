<script setup lang="ts">
import { FieldPropsDefine } from '../types'

const props = defineProps(FieldPropsDefine)

function handleChange(v: string) {
  console.log(v)

  props.onChange(v)
}

// <!-- <input type="text" :value="value" @input="handleChange"> -->
const { schema, rootSchema, ...rest } = props
</script>

<template>
  <TextWidgetRef v-bind="rest" @onChange="handleChange" />
</template>

<style scoped />
