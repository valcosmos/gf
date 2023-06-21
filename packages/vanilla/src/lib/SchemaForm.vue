<script setup lang="ts">
import { computed, shallowRef, type Ref, watchEffect, ref, watch, provide } from 'vue'
import SchemaItem from './SchemaItem.vue'
import type {
  CommonWidgetDefine,
  CustomFormatProps,
  CustomKeywordProps,
  EmitProps,
  ErrorSchema,
  LanguageProps,
  Schema,
  UISchema
} from './types'
import type { Options } from 'ajv'
import Ajv from 'ajv'
import { validateFormData } from './validator'
import { SchemaFormContextKey } from './fields/context'

interface ContextRef {
  doValidate: () => Promise<any>
}

const defaultAjvOptions: Options = {
  allErrors: true
}
interface SchemaFormProps {
  schema: Schema
  value: any
  contextRef?: Ref<ContextRef | undefined>
  ajvOptions?: Options
  locale?: LanguageProps
  customValid?: (data: any, errors: any) => void
  uiSchema?: UISchema
  customFormats?: CustomFormatProps[] | CustomFormatProps
  customKeywords?: CustomKeywordProps[] | CustomKeywordProps
}

const props = withDefaults(defineProps<SchemaFormProps>(), {
  locale: 'zh'
})

const emit = defineEmits<EmitProps & { (e: 'update:contextRef', value: ContextRef): void }>()
const handleChange = (v: any) => {
  emit('change', v)
}

const formatMapRef = computed(() => {
  if (props.customFormats) {
    const customFormats = Array.isArray(props.customFormats)
      ? props.customFormats
      : [props.customFormats]
    return customFormats.reduce((result, format) => {
      result[format.name] = format.component
      return result
    }, {} as { [key: string]: CommonWidgetDefine })
  } else {
    return {}
  }
})

const transformSchemaRef = computed(() => {
  if (props.customKeywords) {
    const customKeywords = Array.isArray(props.customKeywords)
      ? props.customKeywords
      : [props.customKeywords]
    return (schema: Schema) => {
      let newSchema = schema
      customKeywords.forEach((keyword) => {
        if ((newSchema as any)[keyword!.name]) newSchema = keyword?.transformSchema(schema)
      })
      return newSchema
    }
  } else {
    return (s: Schema) => s
  }
})

const errorSchemaRef = shallowRef<ErrorSchema>({})

const validatorRef = shallowRef<Ajv>()

watchEffect(() => {
  validatorRef.value = new Ajv({
    ...defaultAjvOptions,
    ...props.ajvOptions
  })

  if (props.customFormats) {
    const customFormats = Array.isArray(props.customFormats)
      ? props.customFormats
      : [props.customFormats]
    customFormats.forEach((format) => {
      validatorRef.value?.addFormat(format.name, format.definition)
    })
  }

  if (props.customKeywords) {
    const customKeywords = Array.isArray(props.customKeywords)
      ? props.customKeywords
      : [props.customKeywords]
    customKeywords.forEach(
      (keyword) => validatorRef.value?.addKeyword(keyword.definition)
      // validatorRef.value?.addKeyword(keyword.name, keyword.definition),
    )
  }
})

const validateResolveRef = ref()
const validateIndex = ref(0)

watch(
  () => props.value,
  () => {
    validateResolveRef.value && doValidate()
  },
  { deep: true }
)

async function doValidate() {
  const index = (validateIndex.value += 1)
  const result = await validateFormData(
    validatorRef.value!,
    props.value,
    props.schema,
    props.locale,
    props.customValid
  )
  if (index !== validateIndex.value) return
  errorSchemaRef.value = result.errorSchema
  // return result
  validateResolveRef.value(result)
  validateResolveRef.value = undefined
}

watch(
  () => props.contextRef,
  () => {
    if (props.contextRef) {
      // props.contextRef.value =
      emit('update:contextRef', {
        async doValidate() {
          // const valid = validatorRef.value?.validate(props.schema, props.value)!
          return new Promise((resolve) => {
            validateResolveRef.value = resolve
            doValidate()
          })
        }
      })
    }
  },
  {
    immediate: true
  }
)

provide(SchemaFormContextKey, { SchemaItem, formatMapRef, transformSchemaRef })
</script>

<template>
  <SchemaItem
    :schema="schema"
    :value="value"
    :root-schema="schema"
    @change="handleChange"
    :error-schema="errorSchemaRef"
    :ui-schema="uiSchema || {}"
  />
</template>

<style scoped></style>
