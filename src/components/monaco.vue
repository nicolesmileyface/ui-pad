<template>
  <div id="container" class="w-full h-full"></div>
</template>

<script>
import * as monaco from 'monaco-editor'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import { onMounted } from 'vue'

export default {
  name: 'Monaco',
  props: {
    modelValue: {
      type: String,
      default: '<div>Hello World</div>'
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    onMounted(() => {
      self.MonacoEnvironment = {
        getWorker(_, label) {
          if (label === 'json') {
            return new jsonWorker()
          }
          if (label === 'css' || label === 'scss' || label === 'less') {
            return new cssWorker()
          }
          if (label === 'html' || label === 'handlebars' || label === 'razor') {
            return new htmlWorker()
          }
          if (label === 'typescript' || label === 'javascript') {
            return new tsWorker()
          }
          return new editorWorker()
        }
      }
      monaco.editor.defineTheme('myCustomTheme', {
          base: 'vs-dark', // can also be vs-dark or hc-black
          inherit: true, // can also be false to completely replace the builtin rules
          rules: [
            { token: 'comment', foreground: 'ffa500', fontStyle: 'italic underline' },
            { token: 'comment.js', foreground: '008800', fontStyle: 'bold' },
            { token: 'comment.css', foreground: '0000ff' } // will inherit fontStyle from `comment` above
          ],
          colors: {
            'editor.background': '#1f2937',
          }
        })
      const editor = monaco.editor.create(document.getElementById('container'), {
        value: props.modelValue,
        language: 'html',
        theme: 'myCustomTheme',
        automaticLayout: true,
        fontSize: 16,
        fontLigatures: true,
        minimap: {enabled: false}
      });
      editor.onDidChangeModelContent(() => {
        emit('update:modelValue', editor.getValue())
      });
    })
  }
}
</script>