import { TokenizerModel } from '@xenova/transformers'

export default class CustomTokenizer extends TokenizerModel {
  constructor(config, json) {
    super(config, json)
    this.tokens_to_ids = new Map(Object.entries(json.model.vocab))
    this.unk_token_id = this.tokens_to_ids.get(config.unk_token)
    this.unk_token = config.unk_token

    this.vocab = new Array(this.tokens_to_ids.size)
    for (const [key, value] of this.tokens_to_ids) {
      this.vocab[value] = key
    }
  }

  tokenize(text) {
    const maxVocabSize = 250680
    const subwordTokens = []
    let index = 0
    let spacePrefix = ''

    while (index < text.length) {
      let longestSubword = null

      if (text[index] === ' ') {
        spacePrefix = ' '
        index++
        continue
      }

      for (
        let endIndex = Math.min(index + maxVocabSize, text.length);
        endIndex > index;
        endIndex--
      ) {
        const subword = text.slice(index, endIndex)
        if (this.tokens_to_ids.has(subword)) {
          longestSubword = subword
          break
        }
      }

      if (longestSubword) {
        subwordTokens.push(spacePrefix + longestSubword)
        spacePrefix = ''
        index += longestSubword.length
      } else {
        subwordTokens.push(spacePrefix + text[index])
        spacePrefix = ''
        index++
      }
    }

    console.log(subwordTokens)
    return subwordTokens
  }
}
