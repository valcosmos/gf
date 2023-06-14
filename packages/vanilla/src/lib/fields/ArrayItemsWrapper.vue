<script setup lang="ts">
type actionType = [index: number]

interface ArrayItemsWrapperProps {
  index: number
}

type emitType = {
  add: actionType
  delete: actionType
  up: actionType
  down: actionType
}

const props = defineProps<ArrayItemsWrapperProps>()

const emits = defineEmits<emitType>()

const slots = defineSlots<{ default(): any }>()
</script>

<template>
  <div>
    <div>
      <button @click="() => emits('add', props.index)">新增</button>
      <button @click="() => emits('delete', props.index)">删除</button>
      <button @click="() => emits('up', props.index)">上移</button>
      <button @click="() => emits('down', props.index)">下移</button>
    </div>
    <div>{{ slots.default?.() }}</div>
  </div>
</template>

<style scoped></style>
