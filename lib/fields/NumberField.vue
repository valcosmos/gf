<script setup lang="ts">
import { FieldPropsDefine } from '../types'

const props = defineProps(FieldPropsDefine)

function handleChange (e:any) { 
  const value = Number(e.target.value)
  if (value && !isNaN(value)) {
    props.onChange(value)
  } else { 
    props.onChange(undefined)
  }
}

</script>

<template>
  <input type="number" :value="value" @input="handleChange" />
</template>

<style scoped></style>
