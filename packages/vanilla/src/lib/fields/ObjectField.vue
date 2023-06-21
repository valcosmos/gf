<script setup lang="ts">
import { toRefs } from 'vue'
import type { EmitProps, FieldPropsDefineProps } from '../types'
import { isObject } from '../utils'
import { useVJSFContext } from './context'

const schemaData = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    age: {
      type: 'number'
    }
  }
}

const props = defineProps<FieldPropsDefineProps>()
const emit = defineEmits<EmitProps>()

const { schema, rootSchema, value: propsValue, errorSchema, uiSchema } = toRefs(props)

const context = useVJSFContext()

const handleObjectFieldChange = (key: string, v: string) => {
  const value: any = isObject(propsValue.value) ? propsValue.value : {}
  if (value === undefined) delete value[key]
  else value[key] = v
  emit('change', value)
}

const { SchemaItem } = context
const properties = schema.value?.properties || {}
const currentValue: any = isObject(propsValue.value) ? propsValue.value : {}
</script>

<template>
  <SchemaItem
    v-for="(key, index) in Object.keys(properties)"
    :key="index"
    :schema="properties[key]"
    :root-schema="rootSchema"
    :error-schema="errorSchema?.[key] || {}"
    :value="currentValue[key]"
    :ui-schema="uiSchema?.properties ? uiSchema.properties[key] || {} : {}"
    @change="(v) => handleObjectFieldChange(key, v)"
  />
</template>

<style scoped></style>
