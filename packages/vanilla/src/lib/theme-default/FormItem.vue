<script setup lang="ts">
import { toRefs } from 'vue'
import type { CommonWidgetProps, EmitProps } from '../types'

defineOptions({
  name: 'FormItem'
})

const props = defineProps<CommonWidgetProps>()

const emit = defineEmits<EmitProps>()

const { schema, errors } = toRefs(props)
</script>

<template>
  <div>
    <label>{{ schema.title }}</label>
    <slot />
    <ul>
      <li v-for="(err, index) in errors" :key="index">{{ err }}</li>
    </ul>
  </div>
</template>

<style scoped></style>
