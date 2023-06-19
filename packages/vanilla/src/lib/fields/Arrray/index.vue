<script setup lang="ts">
import { toRefs } from 'vue'
import { SelectionWidgetNames, type FieldPropsDefineProps, Schema, EmitProps } from '../../types'
import { getWidget } from '../../theme'
import { useVJSFContext } from '../context'

defineOptions({
  name: 'ArrayField'
})

const props = defineProps<FieldPropsDefineProps>()

const emits = defineEmits<EmitProps>()

const context = useVJSFContext()

const { schema, rootSchema, value, errorSchema, uiSchema } = toRefs(props)

const SelectionWidgetRef = getWidget(SelectionWidgetNames.SelectionWidget)

const SchemaItem = context.SchemaItem as any

const isMultiType = Array.isArray(schema.value.items)
const isSelect = schema.value.items && (schema.value.items as any).enum

const items: Schema[] = schema.value.items as any
const arr = Array.isArray(value) ? value : []

const itemsUISchema = uiSchema.value?.items
const us = (index) =>
  Array.isArray(itemsUISchema) ? itemsUISchema[index] || {} : itemsUISchema || {}

const handleArrayItemChange = (v: any, index: number) => {
  const { value } = props
  const arr = Array.isArray(value) ? value : []
  arr[index] = v
  emits('change', arr)
}
</script>

<template>
  <div>
    <template v-if="isMultiType">
      <component
        v-for="(s, index) in items"
        :key="index"
        :is="SchemaItem"
        :schema="s"
        :ui-schema="us(index)"
        :root-schema="rootSchema"
        :error-schema="errorSchema[index] || {}"
        :value="arr[index]"
        @change="(v) => handleArrayItemChange(v, index)"
      />
    </template>
  </div>
</template>

<style scoped></style>
