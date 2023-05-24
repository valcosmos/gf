import { URL, fileURLToPath } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import monacoEditorPlugin from 'vite-plugin-monaco-editor'

// const prefix = 'monaco-editor/esm/vs'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx({ mergeProps: false }), monacoEditorPlugin({})],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  optimizeDeps: {
    include: [
      'monaco-editor/esm/vs/language/json/json.worker',
      'monaco-editor/esm/vs/language/css/css.worker',
      'monaco-editor/esm/vs/language/html/html.worker',
      'monaco-editor/esm/vs/language/typescript/ts.worker',
      'monaco-editor/esm/vs/editor/editor.worker'
    ]
  },
  build: {
    lib: {
      // entry: ['./lib/index.ts', './lib/theme-default/index.tsx'],
      // name: 'gf',
      // fileName: 'gf'
      entry: {
        gf: './lib/index.ts',
        theme: './lib/theme-default/index.tsx'
      }
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue'
        }
      }
      // input: './lib/index.ts',
      // output: {
      //   manualChunks: {
      //     jsonWorker: [`${prefix}/language/json/json.worker`],
      //     cssWorker: [`${prefix}/language/css/css.worker`],
      //     htmlWorker: [`${prefix}/language/html/html.worker`],
      //     tsWorker: [`${prefix}/language/typescript/ts.worker`],
      //     editorWorker: [`${prefix}/editor/editor.worker`]
      //   }
      // }
    }
  }
})
