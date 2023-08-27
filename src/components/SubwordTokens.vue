<script setup>
import { watch } from 'vue'
import { useTokenizerStore } from '../stores/tokenizer'
const tokenizerStore = useTokenizerStore()
const COLORS = [
  'bg-sky-200',
  'bg-amber-200',
  'bg-blue-200',
  'bg-green-200',
  'bg-orange-200',
  'bg-cyan-200',
  'bg-gray-200',
  'bg-purple-200',
  'bg-indigo-200',
  'bg-lime-200',
  'bg-rose-200',
  'bg-violet-200',
  'bg-yellow-200',
  'bg-emerald-200',
  'bg-zinc-200',
  'bg-red-200',
  'bg-fuchsia-200',
  'bg-pink-200',
  'bg-teal-200'
]

watch(
  () => tokenizerStore.textInput,
  (newValue) => {
    if (newValue) {
      const newlineElement = document.querySelector('.newline')
      if (newlineElement) {
        console.log(newlineElement)
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
    }
  }
)
</script>

<template>
  <div
    class="subword-pre font-mono w-full rounded-md border bg-slate-50 p-4 shadow-sm border-gray-200 whitespace-pre-wrap text-left min-h-[256px] overflow-y-auto"
  >
    <span
      v-for="(subwordToken, index) in tokenizerStore.subwordTokens"
      :key="subwordToken"
      class="transition-all inline-block max-h-6 leading-3 py-1"
      :class="[
        COLORS[index % COLORS.length] +
          ' ' +
          (subwordToken === '\n' ? 'newline bg-transparent' : '')
      ]"
      >{{ subwordToken }}
    </span>
  </div>
</template>
