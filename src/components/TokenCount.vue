<script setup>
import { useTokenizerStore } from '../stores/tokenizer'
const tokenizerStore = useTokenizerStore()
</script>

<template>
  <div class="flex-grow rounded-[4px] border bg-raisinBlack p-4 shadow-sm border-[#2C2C33] h-24">
    <p class="text-2xl">Token count</p>
    <p class="text-2xl">{{ tokenizerStore.tokenIds.length }}</p>
  </div>
</template>
