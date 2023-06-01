import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx({ mergeProps: false })],
  resolve: {
    alias: {
      '@': resolve(__filename, 'src')
    }
  },
  optimizeDeps: {
    // include: ['gf'],
  }
})
