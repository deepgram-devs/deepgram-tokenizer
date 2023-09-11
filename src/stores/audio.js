import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useTokenizerStore } from './tokenizer'

export const useAudioStore = defineStore('audio', () => {
  const file = ref({})
  const transcript = ref('')
  const isTranscribing = ref(false)
  const clearFile = ref(false)

  const tokenizerStore = useTokenizerStore()

  function transcribeFile() {
    if (file.value === 0) {
      alert('Please attach a file')
    } else {
      const formData = new FormData()
      formData.append('file', file.value.value)
      isTranscribing.value = true

      fetch('https://dg-server.fly.dev/dg-transcription', {
        // fetch('https://deepgram-prerecorded.sandrar.repl.co/dg-transcription', {
        method: 'POST',
        body: formData
      })
        .then((response) => response.json())
        .then((data) => {
          transcript.value = data.apiCall.results.channels[0].alternatives[0]
          file.value = {}
          tokenizerStore.textInput = transcript.value

          isTranscribing.value = false
        })
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
