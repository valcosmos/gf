<script setup lang="ts">
import { toRefs } from 'vue'
import { SelectionWidgetNames, type FieldPropsDefineProps } from '../types'
import { useVJSFContext } from './context'
import { getWidget } from '../theme'

defineOptions({
  name: 'ArrayField'
})

const props = defineProps<FieldPropsDefineProps>()

const context = useVJSFContext()

const { schema, rootSchema, value, errorSchema, uiSchema } = toRefs(props)

const SchemaItem = context.SchemaItem

const SelectionWidgetRef = getWidget(SelectionWidgetNames.SelectionWidget)
</script>

<template>
  <div></div>
</template>

<style scoped></style>
