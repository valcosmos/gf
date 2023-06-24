<script setup lang="ts">
import { computed } from 'vue'
import { useContext } from '../context'
import type { EmitProps, FieldProps, Schema } from '../types'
import SelectionWidget from '../widgets/SelectionWidget.vue'
import ArrayItemWrapper from './ArrayItemWrapper.vue'

const props = defineProps<FieldProps>()
const emits = defineEmits<EmitProps>()

defineOptions({
  name: 'ArrayField'
})

const { SchemaItem } = useContext()

const isMultiType = Array.isArray(props.schema.items)

const arrValue = computed(() => (Array.isArray(props.value) ? props.value : []))

function handleMultiTypeChange(v: any, index: number) {
  const arr = Array.isArray(props.value) ? props.value : []
  arr[index] = v
  emits('change', arr)
}

const isSelect = props.schema.items && Boolean((props.schema.items as any).enum)

const options = computed(() => {
  if (isSelect) {
    const enumOptions = (props.schema.items as any).enum as Array<any>
    return enumOptions.map((item) => ({ key: item, value: item }))
  }
  return []
})

function handleAdd(index: number) {
  const value = props.value
  const arr = Array.isArray(value) ? value : []
  arr.splice(index + 1, 0, undefined)

  emits('change', arr)
}

function handleDelete(index: number) {
  const value = props.value
  const arr = Array.isArray(value) ? value : []
  arr.splice(index, 1)
  emits('change', arr)
}

function handleUp(index: number) {
  const value = props.value

  if (index === 0) {
    return
  }

  const arr = Array.isArray(value) ? value : []
  const item = arr.splice(index, 1)
  arr.splice(index - 1, 0, item[0])
  emits('change', arr)
}

function handleDown(index: number) {
  const value = props.value
  const arr = Array.isArray(value) ? value : []

  if (index === arr.length - 1) {
    return
  }

  const item = arr.splice(index, 1)
  arr.splice(index + 1, 0, item[0])
  emits('change', arr)
}
</script>

<template>
  <div v-if="isMultiType">
    <component
      :is="SchemaItem"
      v-for="(s, index) in schema.items"
      :key="index"
      :schema="s"
      :root-schema="rootSchema"
      :value="arrValue[index]"
      @change="(v) => handleMultiTypeChange(v, index)"
    />
  </div>
  <div v-else-if="!isSelect">
    <ArrayItemWrapper
      v-for="(v, index) in arrValue"
      :key="index"
      :index="index"
      @add="handleAdd"
      @delete="handleDelete"
      @up="handleUp"
      @down="handleDown"
    >
      <component
        :is="SchemaItem"
        :schema="schema.items as Schema"
        :value="v"
        :root-schema="rootSchema"
        @change="(v) => handleMultiTypeChange(v, index)"
      />
    </ArrayItemWrapper>
  </div>
  <div v-else>
    <component
      :is="SelectionWidget"
      :options="options"
      :value="value"
      @change="(v) => emits('change', v)"
    />
  </div>
</template>

<style scoped></style>
