<template>
  <div id="preview">
  </div>
</template>

<script>
import { onMounted, createApp } from "vue"

export default {
  name: "Preview",
  setup() {
    const recompile = () => {
      const template = localStorage.getItem('template')
      createApp({
        props: ["state"],
        data: () => ({}),
        template: [
          `<div @input="(e) => $emit('input', e)">`,
          template,
          "</div>",
        ].join("\n"),
      }).mount('#preview')
    }
    onMounted(() => {
      recompile()
    })
  },
}
</script>