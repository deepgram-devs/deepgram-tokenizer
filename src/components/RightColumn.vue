<script setup>
import TokenCount from './TokenCount.vue'
// import PricePrompt from './PricePrompt.vue'
import SubwordTokens from './SubwordTokens.vue'
import TokenIds from './TokenIds.vue'
import { useTokenizerStore } from '../stores/tokenizer'
const tokenizerStore = useTokenizerStore()
import { useAudioStore } from '../stores/audio'
const audioStore = useAudioStore()

function clearAll() {
  audioStore.clearAudio()
  tokenizerStore.clearTokens()
}
</script>

<template>
  <section class="flex flex-col gap-4">
    <div class="flex gap-4">
      <token-count />
      <!-- <price-prompt /> -->
    </div>
    <subword-tokens />
    <token-ids />
    <div class="flex justify-end">
      <button
        @click="clearAll()"
        class="bg-[#FBFBFF] text-[#101014] py-2 px-8 rounded-[4px] font-bold"
      >
        Clear
      </button>
    </div>
  </section>
</template>
