import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { AutoTokenizer } from '@xenova/transformers';

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
    subwordTokens.value = subtokens
    return subtokens
  }

  function postprocessSubtokens() {
    let processedSubtokens = subwordTokens.value.map((subtoken, index) => {
      if (index === 0) {
        return subtoken
      }
      if (/^[.,!?…。，、।۔،]+$/.test(subtoken)) {
        return subtoken
      } else {
        return ' ' + subtoken
      }
    })
    subwordTokens.value = processedSubtokens
    return processedSubtokens
  }

  const replacements = {'\\\\': '\\', '\\n': '\n', '\\"': '"'};

  function slashUnescape(contents) {
      return contents.replace(/\\(\\|n|")/g, function(replace) {
          return replacements[replace];
      });
  }

  async function tokenizeText() {
    pretokenize()
    postprocessSubtokens()
    const escaped = slashUnescape(textInput.value)
    console.log(escaped)
    let tokenizer = await AutoTokenizer.from_pretrained("Xenova/bloomz-560m")
    const encoded =  tokenizer.encode(escaped)
    tokenIds.value = encoded
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
