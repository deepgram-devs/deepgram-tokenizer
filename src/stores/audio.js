import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useTokenizerStore } from './tokenizer'
import useDeepgramKey from '../../composables/useDeepgramKey'

export const useAudioStore = defineStore('audio', () => {
  const file = ref({})
  const transcript = ref('')
  const isTranscribing = ref(false)
  const clearFile = ref(false)
  const key = ref('')
  useDeepgramKey().then((res) => {
    key.value = res.key.value
  })

  const tokenizerStore = useTokenizerStore()

  async function transcribeFile() {
    if (file.value === 0) {
      alert('Please attach a file')
    } else {
      tokenizerStore.subwordTokens.value = []
      isTranscribing.value = true
      const options = {
        method: 'POST',
        headers: {
          Authorization: `Token ${key.value}`
        },
        body: file.value.value
      }
      try {
        fetch('https://api.deepgram.com/v1/listen?smart_format=true', options)
          .then((response) => response.json())
          .then((data) => {
            transcript.value = data.results.channels[0].alternatives[0]
            file.value = {}
            tokenizerStore.textInput = transcript.value
            isTranscribing.value = false
          })
          .catch((err) => console.error(err))
      } catch (e) {
        console.log('error', e)
      }
    }
  }

  function clearAudio() {
    file.value = {}
    transcript.value = ''
    isTranscribing.value = false
    clearFile.value = true
  }

  return {
    file,
    transcribeFile,
    transcript,
    isTranscribing,
    clearAudio,
    clearFile
  }
})
