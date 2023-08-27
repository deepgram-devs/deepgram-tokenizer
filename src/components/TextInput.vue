<script setup>
import { ref } from 'vue'
import { useTokenizerStore } from '../stores/tokenizer'
const tokenizerStore = useTokenizerStore()
import { useDebounceFn } from '@vueuse/core'
const text = ref('')
const debouncedTokenize = useDebounceFn((input) => {
  tokenizerStore.textInput = input
}, 100)
</script>

<template>
  <textarea
    @input="debouncedTokenize(text)"
    v-model="text"
    class="flex w-full border-slate-300 bg-transparent placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 min-h-[256px] rounded-md border p-4 font-mono shadow-sm"
  >
  </textarea>
</template>
