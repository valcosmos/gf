<script setup lang="ts">
import { toRefs } from 'vue'
import {
  SelectionWidgetNames,
  type FieldPropsDefineProps,
  type Schema,
  type EmitProps
} from '../types'
import { getWidget } from '../theme'
import { useVJSFContext } from './context'
import ArrayItemsWrapper from './ArrayItemsWrapper.vue'

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
const us = (index: number) =>
  Array.isArray(itemsUISchema) ? itemsUISchema[index] || {} : itemsUISchema || {}

const handleArrayItemChange = (v: any, index: number) => {
  const { value } = props
  const arr = Array.isArray(value) ? value : []
  arr[index] = v
  emits('change', arr)
}

const handleAdd = (index: number) => {
  const { value } = props
  const arr = Array.isArray(value) ? value : []
  arr.splice(index + 1, 0, undefined)

  emits('change', arr)
}

const handleDelete = (index: number) => {
  const { value } = props
  const arr = Array.isArray(value) ? value : []
  arr.splice(index, 1)
  emits('change', arr)
}
const handleUp = (index: number) => {
  const { value } = props

  if (index === 0) return

  const arr = Array.isArray(value) ? value : []
  const item = arr.splice(index, 1)
  arr.splice(index - 1, 0, item[0])
  emits('change', arr)
}
const handleDown = (index: number) => {
  const { value } = props
  const arr = Array.isArray(value) ? value : []

  if (index === arr.length - 1) return

  const item = arr.splice(index, 1)
  arr.splice(index + 1, 0, item[0])
  emits('change', arr)
}

const enumOptions = (schema as any).items.enum
const options = enumOptions.map((e: any) => ({ key: e, value: e }))
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
        @change="(v:any) => handleArrayItemChange(v, index)"
      />
    </template>
    <template v-else-if="!isSelect">
      <ArrayItemsWrapper
        v-for="(v, index) in arr"
        :key="index"
        :index="index"
        @add="handleAdd"
        @delete="handleDelete"
        @up="handleUp"
        @down="handleDown"
      >
        <component
          :is="SchemaItem"
          :schema="schema.items"
          :ui-schema="uiSchema.items || {}"
          :error-schema="errorSchema[index] || {}"
          :value="v"
          :key="index"
          :root-schema="rootSchema"
          @change="(v:any) => handleArrayItemChange(v, index)"
        />
      </ArrayItemsWrapper>
    </template>
    <template v-else>
      <component
        :is="SelectionWidgetRef"
        @change="(v:any) => emits('change', v)"
        :value="value"
        :schema="schema"
        :options="options"
        :errors="errorSchema.__errors"
      />
    </template>
  </div>
</template>

<style scoped></style>
