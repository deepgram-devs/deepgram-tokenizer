<script setup>
import { useTokenizerStore } from '../stores/tokenizer'
const tokenizerStore = useTokenizerStore()
</script>

<template>
  <div class="flex-grow rounded-md border bg-raisinBlack p-4 shadow-sm border-[#2C2C33]">
    <p class="text-sm">Token count</p>
    <p class="text-lg">{{ tokenizerStore.tokenIds.length }}</p>
  </div>
</template>
