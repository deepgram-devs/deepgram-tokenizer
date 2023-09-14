<script setup>
import { watch } from 'vue'
import { useTokenizerStore } from '../stores/tokenizer'
const tokenizerStore = useTokenizerStore()
import { useAudioStore } from '../stores/audio'
const audioStore = useAudioStore()
import { useDebounceFn } from '@vueuse/core'
import { storeToRefs } from 'pinia'
const { textSizeWarning, textInput, text } = storeToRefs(tokenizerStore)
const { transcript, fileName } = storeToRefs(audioStore)

const debouncedTokenize = useDebounceFn((input) => {
  tokenizerStore.textInput = input
}, 100)

function clearAll() {
  audioStore.clearAudio()
  tokenizerStore.clearTokens()
}

watch(
  () => transcript.value,
  (newValue) => {
    if (newValue) {
      text.value = newValue.transcript
      tokenizerStore.textInput = text.value
      textSizeWarning.value = false
      transcript.value = ''
    }
  }
)

watch(textInput, (newValue) => {
  // if text length is over limit and no audio is uploaded, show warning
  if (newValue.length > 125000 && fileName.value.length === 0) {
    textSizeWarning.value = true
  } else {
    console.log('hit')
    // otherwise, tokenize the text/audio
    textSizeWarning.value = false
    tokenizerStore.tokenizeText()
  }
})
</script>

<template>
  <textarea
    @input="debouncedTokenize(tokenizerStore.text)"
    placeholder="Type some text..."
    v-model="tokenizerStore.text"
    class=""
  >
  </textarea>
  <button
    @click="clearAll"
    class="text-sm bg-[#F0463A] text-[white] py-2 px-8 rounded-[4px] font-bold w-fit"
    v-if="textSizeWarning"
  >
    Oops! Try a shorter text.
  </button>
</template>
