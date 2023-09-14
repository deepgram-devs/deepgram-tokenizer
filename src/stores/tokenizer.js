import { ref } from 'vue'
import { defineStore } from 'pinia'
import { AutoTokenizer } from '@xenova/transformers'

export const useTokenizerStore = defineStore('tokenizer', () => {
  const textInput = ref('')
  const subwordTokens = ref([])
  const tokenIds = ref([])
  const indexHover = ref(null)
  const textSizeWarning = ref(false)
  const text = ref('')

  const replacements = { '\\\\': '\\', '\\n': '\n', '\\"': '"' }

  function slashUnescape(contents) {
    return contents.replace(/\\(\\|n|")/g, function (replace) {
      return replacements[replace]
    })
  }

  async function tokenizeText() {
    console.log('tokenize', textInput.value)
    const escaped = slashUnescape(textInput.value)
    let tokenizer = await AutoTokenizer.from_pretrained('Xenova/bloomz-560m')
    tokenIds.value = tokenizer.encode(escaped)
    let decoded = tokenIds.value.map((x) => tokenizer.decode([x]))
    subwordTokens.value = decoded
  }
  function setIndexHover(index) {
    indexHover.value = index
  }

  function clearTokens() {
    textInput.value = ''
    subwordTokens.value = []
    tokenIds.value = []
    indexHover.value = null
    textSizeWarning.value = false
    text.value = ''
  }

  return {
    textInput,
    tokenizeText,
    subwordTokens,
    tokenIds,
    indexHover,
    setIndexHover,
    textSizeWarning,
    clearTokens,
    text
  }
})
