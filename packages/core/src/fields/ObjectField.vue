<script setup lang="ts">
import { computed } from 'vue'
import { isObject } from '../utils'
import { useContext } from '../context'
import type { EmitProps, FieldProps } from '../types'

defineOptions({
  name: 'ObjectField',
})

const props = defineProps<FieldProps>()

const emits = defineEmits<EmitProps>()

const context = useContext()

const { SchemaItem } = context

const properties = props.schema.properties || {}

function handleObjectFieldChange(key: string, v: any) {
  const value = isObject(props.value) ? props.value : {}

  if (v === undefined)
    delete value[key]
  else
    value[key] = v

  emits('change', value)
}

const currentValue = computed(() => (isObject(props.value) ? props.value : {}))
</script>

<template>
  <component
    :is="SchemaItem"
    v-for="(k, index) in Object.keys(properties)"
    :key="index"
    :schema="properties[k]"
    :root-schema="rootSchema"
    :value="currentValue[k]"
    @change="(v:any) => handleObjectFieldChange(k, v)"
  />
</template>

<style scoped></style>
