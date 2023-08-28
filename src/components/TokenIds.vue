<script setup>
import { useTokenizerStore } from '../stores/tokenizer'
const tokenizerStore = useTokenizerStore()
const COLORS = [
  'bg-sky-800',
  'bg-[#F79009]',
  'bg-[#149AFB]',
  'bg-[#039855]',
  'bg-orange-800',
  'bg-cyan-800',
  'bg-teal-800',
  'bg-[#7800ed]',
  'bg-indigo-700',
  'bg-lime-800',
  'bg-[#bf182f]',
  'bg-violet-800',
  'bg-yellow-800',
  'bg-[#00cf56]',
  'bg-[#616165]',
  'bg-[#D92D20]',
  'bg-[#dd0070]',
  'bg-pink-800',
  'bg-teal-800'
]

const getColorClass = (index) => {
  if (tokenizerStore.indexHover === null || tokenizerStore.indexHover === index) {
    return COLORS[index % COLORS.length]
  } else {
    return ''
  }
}
</script>

<template>
  <div
    class="bg-raisinBlack min-h-[256px] max-w-[100vw] overflow-auto whitespace-prewrap break-all rounded-md border p-4 shadow-sm font-firaCode border-[#2C2C33]"
  >
    <span class="transition-opacity" v-show="tokenizerStore.filteredTokenIds.length > 0"
      >[<span
        v-for="(value, index) in tokenizerStore.filteredTokenIds"
        :key="index"
        class="transition-colors inline-block"
        :class="tokenizerStore.indexHover != null ? getColorClass(index) : ''"
        @mouseenter="tokenizerStore.setIndexHover(index)"
        @mouseleave="tokenizerStore.setIndexHover(null)"
        >{{ value
        }}<span class="pr-2" v-if="index < tokenizerStore.filteredTokenIds.length - 1"
          >,
        </span></span
      >]</span
    >
  </div>
</template>
