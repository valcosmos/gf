import { URL, fileURLToPath } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import dts from 'vite-plugin-dts'
import commonjs from 'vite-plugin-commonjs'

// const prefix = 'monaco-editor/esm/vs'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx({ mergeProps: false }),
    commonjs(),

    dts({
      insertTypesEntry: true,
      compilerOptions: {
        jsx: 1
      },
      include: './lib/**'
    })
    // monacoEditorPlugin({}),
  ],
  // optimizeDeps: {
  //   include: ['json-schema-merge-allof'],
  // },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // optimizeDeps: {
  //   include: [
  //     'monaco-editor/esm/vs/language/json/json.worker',
  //     'monaco-editor/esm/vs/language/css/css.worker',
  //     'monaco-editor/esm/vs/language/html/html.worker',
  //     'monaco-editor/esm/vs/language/typescript/ts.worker',
  //     'monaco-editor/esm/vs/editor/editor.worker',
  //   ],
  // },
  build: {
    sourcemap: true,
    lib: {
      entry: './lib/index.ts',
      name: 'index'
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
