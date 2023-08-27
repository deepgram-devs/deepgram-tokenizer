<script setup>
import TokenCount from './TokenCount.vue'
import PricePrompt from './PricePrompt.vue'
import SubwordTokens from './SubwordTokens.vue'
import TokenIds from './TokenIds.vue'
// import WhitespaceToggle from './WhitespaceToggle.vue'
</script>

<template>
  <section class="flex flex-col gap-4">
    <div class="flex gap-4">
      <token-count />
      <price-prompt />
    </div>
    <subword-tokens />
    <token-ids />
    <!-- <whitespace-toggle /> -->
  </section>
</template>
