<script setup>
import { useTokenizerStore } from '../stores/tokenizer'
const tokenizerStore = useTokenizerStore()
function setIndexHover(index) {
  console.log(index)
}
</script>

<template>
  <div
    class="min-h-[256px] max-w-[100vw] overflow-auto whitespace-prewrap break-all rounded-md border bg-slate-50 p-4 shadow-sm font-mono"
  >
    <span class="transition-opacity"
      >[<span
        v-for="(value, index) in tokenizerStore.filteredTokenIds"
        :key="index"
        class="transition-colors inline-block pr-2"
        @mouseenter="setIndexHover(index)"
        @mouseleave="setIndexHover(null)"
        >{{ value }}<span v-if="index < tokenizerStore.filteredTokenIds.length - 1">, </span></span
      >]</span
    >
  </div>
</template>
