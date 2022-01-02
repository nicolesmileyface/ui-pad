<template>
<div class="flex flex-col h-screen overflow-hidden">
<section class="px-4 py-2 space-x-6 flex items-center bg-gray-900 border-b border-black">
  <img src="../assets/logo.svg" alt="logo" class="h-7">
  <p class="font-mono text-green-500 font-bold text-lg">ui-pad</p>
</section>
<splitpanes class="default-theme flex-1">
  <pane style="min-width: 30%;" id="left-pane">
    <div class="text-gray-400 border-b border-black bg-gray-900">
      options
    </div>
    <Monaco v-model="code" v-if="ready" />
  </pane>
   
   <pane id="preview-window" style="min-width: 320px">
     <div class="relative h-full bg-gray-800 text-blue-100">

      <iframe class="w-full h-full" src="/preview" :key="updateKey" />
      <div class="absolute top-0 right-0 pointer-events-none p-2" v-if="previewSize">
        <div class="px-2 py-1 rounded-full bg-gray-600 text-sm text-white">
          {{previewSize}}
        </div>
      </div>
     </div>
   </pane>
</splitpanes>
</div>
</template>

<script>
import { debounce } from 'lodash'
import Monaco from '../components/monaco.vue'

import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import { nextTick, onMounted, ref, watch } from 'vue'

export default {
  name: 'App',
  components: {
    Splitpanes, Pane, Monaco
  },
  setup() {
    const previewSize = ref('')
    const code = ref('')
    const updateKey = ref(0)
    const ready = ref(false)

    const clearSize = debounce(() => {
      previewSize.value = ''
    }, 800)

    const updateState = debounce(() => {
      console.log('updateState')
      localStorage.setItem('template', code.value)
      updateKey.value++
    }, 1000)

    watch(() => code.value, () => { 
      updateState()
    })

    const updateSize = (evt) => {
      previewSize.value = [evt[0].target.scrollWidth, evt[0].target.scrollHeight].join(' x ')
      clearSize()
    }
    onMounted(() => {
      code.value = localStorage.getItem('template')
      console.log({ code: code.value })
      new ResizeObserver(updateSize).observe(document.querySelector('#preview-window'))
      ready.value = true
    })
    return { previewSize, code, updateKey, ready }
  }
}
</script>


<style lang="postcss">
.default-theme.splitpanes--vertical>.splitpanes__splitter, .default-theme .splitpanes--vertical>.splitpanes__splitter {
  border-color:  theme('colors.gray.600') !important;
}
.splitpanes.default-theme .splitpanes__splitter {
  min-width: 6px;
  background: theme('colors.gray.600') !important;
}
.splitpanes.default-theme .splitpanes__splitter:after, .splitpanes.default-theme .splitpanes__splitter:before {
  background: theme('colors.gray.800') !important;
}
.splitpanes.default-theme .splitpanes__splitter:hover:after, .splitpanes.default-theme .splitpanes__splitter:hover:before {
  box-shadow: 0px 0 0 4px theme('colors.blue.400');
  overflow: visible;
  z-index: 1000;
  border-radius: 1000px;
  background: theme('colors.blue.400') !important;
}
</style>