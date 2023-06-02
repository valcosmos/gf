import { URL, fileURLToPath } from 'node:url'

import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import commonjs from '@rollup/plugin-commonjs'
import dts from 'vite-plugin-dts'

// const prefix = 'monaco-editor/esm/vs'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx({ mergeProps: false }),

    dts({
      insertTypesEntry: true,
      tsConfigFilePath: resolve(__dirname, 'tsconfig.json'),
      include: resolve(__dirname, 'lib', '**'),
    }),
    // monacoEditorPlugin({}),
  ],
  // optimizeDeps: {
  //   include: ['json-schema-merge-allof'],
  // },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
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
      name: 'index',
    },
    rollupOptions: {
      external: ['vue'],
      plugins: [commonjs()],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
        },
      },
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
    },
  },
})
