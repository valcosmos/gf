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
  <div class="container">
    <div class="actions">
      <button class="action" @click="() => emits('add', props.index)">新增</button>
      <button class="action" @click="() => emits('delete', props.index)">删除</button>
      <button class="action" @click="() => emits('up', props.index)">上移</button>
      <button class="action" @click="() => emits('down', props.index)">下移</button>
    </div>
    <div class="content">{{ slots.default?.() }}</div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  border: 1px solid #eee;
}

.actions {
  background: #eee;
  padding: 10px;
  text-align: right;
}

.action {
  & + & {
    margin-left: 10px;
  }
}
.content {
  padding: 10px;
}
</style>
