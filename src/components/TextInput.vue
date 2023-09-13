<script setup>
import { ref, watch } from 'vue'
import { useTokenizerStore } from '../stores/tokenizer'
const tokenizerStore = useTokenizerStore()
import { useAudioStore } from '../stores/audio'
const audioStore = useAudioStore()
import { useDebounceFn } from '@vueuse/core'
const text = ref('')
const debouncedTokenize = useDebounceFn((input) => {
  tokenizerStore.textInput = input
}, 100)

watch(
  () => audioStore.transcript,
  (newValue) => {
    if (newValue) {
      text.value = newValue.transcript
      tokenizerStore.textInput = text.value
      audioStore.transcript = ''
    }
  }
)
</script>

<template>
  <textarea
    @input="debouncedTokenize(text)"
    placeholder="Type some text..."
    v-model="text"
    class=""
  >
  </textarea>
</template>
