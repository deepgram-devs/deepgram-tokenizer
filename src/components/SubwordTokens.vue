<script setup>
import { watch } from 'vue'
import { useTokenizerStore } from '../stores/tokenizer'
const tokenizerStore = useTokenizerStore()
const COLORS = [
  'bg-sky-800',
  'bg-[#F79009]',
  'bg-[#149AFB]',
  'bg-[#039855]',
  'bg-orange-800',
  'bg-[#ef4ea2]',
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

watch(
  () => tokenizerStore.textInput,
  (newValue) => {
    if (newValue) {
      const newlineElement = document.querySelector('.newline')
      if (newlineElement) {
        const brElement = document.createElement('br')
        newlineElement.parentNode.replaceChild(brElement, newlineElement)
      }
    }
    if (newValue === '') {
      const subwordElement = document.querySelector('.subword-pre')
      const spanElements = subwordElement.querySelectorAll('span')
      spanElements.forEach((span) => {
        span.remove()
      })
      tokenizerStore.tokenIds = ''
      tokenizerStore.filteredTokenIds = []
    }
  }
)

watch(
  () => tokenizerStore.indexHover,
  () => {
    const subwordElement = document.querySelector('.subword-pre')

    const spanElements = subwordElement.querySelectorAll('span')
    spanElements.forEach((span, i) => {
      if (i !== tokenizerStore.indexHover) {
        span.classList.remove(COLORS[i % COLORS.length])
      }
      if (i === tokenizerStore.indexHover) {
        span.classList.add(COLORS[i % COLORS.length])
      }
      if (tokenizerStore.indexHover === null) {
        span.classList.add(COLORS[i % COLORS.length])
      }
    })
  }
)
</script>

<template>
  <div
    class="subword-pre font-firaCode w-full rounded-md border bg-raisinBlack p-4 shadow-sm border-[#2C2C33] whitespace-pre-wrap text-left min-h-[256px] overflow-y-auto max-h-[256px]"
  >
    <span
      v-for="(subwordToken, index) in tokenizerStore.subwordTokens"
      :key="index"
      class="transition-all inline-block max-h-6 leading-3 py-1 mx-[1px]"
      :class="[
        COLORS[index % COLORS.length] +
          ' ' +
          (subwordToken === '\n' ? 'newline bg-transparent' : '')
      ]"
      @mouseenter="tokenizerStore.setIndexHover(index)"
      @mouseleave="tokenizerStore.setIndexHover(null)"
      >{{ subwordToken }}
    </span>
  </div>
</template>
