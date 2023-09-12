import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import tokenizerJson from '../assets/models/bloomz-560m/tokenizer.json'

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

  function pretokenize() {
    const pattern = /[^\s.,!?…。，、।۔،]+|[.,!?…。，、।۔،]+/g
    const subtokens = textInput.value.match(pattern) || []
    return subtokens
  }

  function postprocessSubtokens(subtokens) {
    let processedSubtokens = subtokens.map((subtoken, index) => {
      if (index === 0) {
        return subtoken
      }
      if (/^[.,!?…。，、।۔،]+$/.test(subtoken)) {
        return subtoken
      } else {
        return 'Ġ' + subtoken
      }
    })
    return processedSubtokens
  }

  function replaceSymbolWithSpace(obj) {
    for (const key in obj) {
      if (
        Object.prototype.hasOwnProperty.call(obj, key) &&
        typeof obj[key] === 'string' &&
        obj[key].startsWith('Ġ')
      ) {
        obj[key] = obj[key].replace('Ġ', ' ')
      }
    }
    return obj
  }

  function tokenizeText() {
    const vocab = tokenizerJson.model.vocab
    const subtokens = pretokenize()
    const processedSubtokens = postprocessSubtokens(subtokens)

    const concatenatedText = processedSubtokens.join('')
    const finalFormat = []
    let startIndex = 0
    let pushedItem = false

    while (startIndex < concatenatedText.length) {
      let endIndex = concatenatedText.length
      let longestSubtoken = concatenatedText.slice(startIndex, endIndex)

      while (endIndex >= startIndex) {
        if (vocab[longestSubtoken] !== undefined && !longestSubtoken.endsWith('Ġ')) {
          if (!pushedItem) {
            finalFormat.push({ [vocab[longestSubtoken]]: longestSubtoken })
            pushedItem = true // Set the flag
          }
          startIndex = endIndex
          break
        }
        endIndex--
        longestSubtoken = concatenatedText.slice(startIndex, endIndex)
      }

      if (pushedItem) {
        pushedItem = false
      }
    }

    const processedArray = finalFormat.map((obj) => replaceSymbolWithSpace(obj))

    const valuesArray = []
    const keysArray = []

    processedArray.forEach((obj) => {
      const values = Object.values(obj)
      valuesArray.push(values.pop())
      const keys = Object.keys(obj)
      keysArray.push(keys.pop())
    })
    subwordTokens.value = valuesArray
    tokenIds.value = keysArray
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
