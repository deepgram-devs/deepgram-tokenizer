import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import tokenizerJson from '../assets/models/bloomz-560m/tokenizer.json'
import tokenizerConfig from '../assets/models/bloomz-560m/tokenizer_config.json'

import CustomTokenizer from '../classes/CustomTokenizer'

export const useTokenizerStore = defineStore('tokenizer', () => {
  const textInput = ref('')
  const subwordTokens = ref([])
  const tokenIds = ref([])
  const filteredTokenIds = ref([])
  const indexHover = ref(null)

  watch(
    () => textInput.value,
    (newValue) => {
      if (newValue) {
        tokenizeText()
      }
    }
  )

  async function tokenizeText() {
    const tokenizer = new CustomTokenizer(tokenizerConfig, tokenizerJson)

    subwordTokens.value = tokenizer.tokenize(textInput.value)

    tokenIds.value = subwordTokens.value.map((subword) => {
      const originalSubword = subword.trim()
      return tokenizer.tokens_to_ids.get(originalSubword)
    })
    filteredTokenIds.value = tokenIds.value.filter((value) => value !== undefined)
  }

  function setIndexHover(index) {
    indexHover.value = index
  }

  return {
    textInput,
    tokenizeText,
    subwordTokens,
    tokenIds,
    filteredTokenIds,
    indexHover,
    setIndexHover
  }
})
