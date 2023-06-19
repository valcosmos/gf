<script setup lang="ts">
import { computed, provide } from 'vue'
import type { Theme } from './types'
import { THEME_PROVIDER_KEY } from './theme'

interface ThemeProviderProps {
  theme: Theme
}

const props = defineProps<ThemeProviderProps>()

const context = computed(() => props.theme)

provide(THEME_PROVIDER_KEY, context)
</script>

<template>
  <slot />
</template>

<style scoped></style>
