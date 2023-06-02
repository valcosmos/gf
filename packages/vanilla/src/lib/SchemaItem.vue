<script setup lang="ts">
import { computed, toRef, toRefs } from 'vue'
import { useVJSFContext } from './fields/context'
import { SchemaTypes, type FieldPropsDefineProps, type EmitProps } from './types'
import { retrieveSchema } from './utils'
import StringField from './fields/StringField.vue'
import NumberField from './fields/NumberField.vue'
import ObjectField from './fields/ObjectField.vue'
import ArrayField from './fields/ArrayField.vue'

const props = defineProps<FieldPropsDefineProps>()

const emit = defineEmits<EmitProps>()

const formContext = useVJSFContext()

const retrievedSchemaRef = computed(() => {
  const { schema, rootSchema, value } = props
  return formContext.transformSchemaRef.value(retrieveSchema(schema, rootSchema, value))
})

const { schema } = toRefs(props)

const type = schema.value.type

let Component: any

switch (type) {
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
    console.warn(`${type} is not supported`)
  }
}
Component.props = { ...props, schema: retrievedSchemaRef.value }

const handleChange = (v: string) => {
  emit('change', v)
}
</script>
<template>
  <component :is="Component" @change="handleChange" />
</template>

<style scoped></style>
