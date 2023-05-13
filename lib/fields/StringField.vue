<script setup lang="ts">
import { FieldPropsDefine } from '../types'

const props = defineProps(FieldPropsDefine)

function handleChange (e: any) { 
  props.onChange(e.target.value)
}

</script>

<template>
  <input type="text" :value="value" @input="handleChange" />
</template>

<style scoped></style>
