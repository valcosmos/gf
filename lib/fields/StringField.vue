<script setup lang="ts">
import { toRefs } from 'vue'
import type { EmitProps, FieldProps } from '../types'

const props = defineProps<FieldProps>()

const emits = defineEmits<EmitProps>()

const { value } = toRefs(props)

defineOptions({
  name: 'StringField'
})

function handleChange(e: any) {
  emits('change', e.target.value)
}

</script>

<template>
  <input type="text" :value="value" @input="handleChange" />
</template>

<style scoped></style>
