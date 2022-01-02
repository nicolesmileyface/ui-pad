import vue from '@vitejs/plugin-vue'
const prefix = `monaco-editor/esm/vs`

export default {
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js'
    }
  },
  plugins: [ vue() ],
  optimizeDeps: {
    include: [
      `${prefix}/language/json/json.worker`,
      `${prefix}/language/css/css.worker`,
      `${prefix}/language/html/html.worker`,
      `${prefix}/language/typescript/ts.worker`,
      `${prefix}/editor/editor.worker`
    ]
  }
}