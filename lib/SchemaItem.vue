<script setup lang="ts">
import { computed, toRefs } from 'vue'
import { type EmitProps, type FieldProps, SchemaTypes } from './types'

import StringField from './fields/StringField.vue'
import NumberField from './fields/NumberField.vue'
import ObjectField from './fields/ObjectField.vue'

import { retrieveSchema } from './utils'
import ArrayField from './fields/ArrayField.vue'

defineOptions({ name: 'SchemaItems' })

const props = defineProps<FieldProps>()

const emits = defineEmits<EmitProps>()

const { value } = toRefs(props)

const retrievedSchemaRef = computed(() =>
  retrieveSchema(props.schema, props.rootSchema, props.value),
)

const currentComponent = computed(() => {
  let Component:
  | typeof StringField
  | typeof NumberField
  | typeof ObjectField
  | typeof ArrayField
  | undefined
  switch (props.schema.type) {
    case SchemaTypes.STRING: {
      Component = StringField
      break
    }
    case SchemaTypes.NUMBER: {
      Component = NumberField
      break
    }
    case SchemaTypes.OBJECT: {
      Component = ObjectField
      break
    }
    case SchemaTypes.ARRAY: {
      Component = ArrayField
      break
    }
    default: {
      console.warn(`${props.schema.type} is not supported`)
    }
  }
  return Component
})

function handleChange(v: any) {
  emits('change', v)
}
</script>

<template>
  <component
    :is="currentComponent"
    v-if="currentComponent"
    :value="value"
    :root-schema="rootSchema"
    :schema="retrievedSchemaRef"
    @change="handleChange"
  />
</template>

<style scoped></style>
