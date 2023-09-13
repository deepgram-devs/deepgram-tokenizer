import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useTokenizerStore } from './tokenizer'
import useDeepgramKey from '../../composables/useDeepgramKey'

export const useAudioStore = defineStore('audio', () => {
  const file = ref({})
  const transcript = ref('')
  const isTranscribing = ref(false)
  const clearFile = ref('')
  const key = ref('')
  const timeoutError = ref('')
  
  

  const tokenizerStore = useTokenizerStore()

  async function transcribeFile() {
    if (!file.value) { 
      alert('Please attach a file')
    } else {
      useDeepgramKey().then((res) => {
        key.value = res.key.value
        isTranscribing.value = true
        timeoutError.value = ''
        const controller = new AbortController()
        const signal = controller.signal
        const timeoutId = setTimeout(() => {
          controller.abort()
          console.log("Request aborted due to timeout")
          isTranscribing.value = false
        }, 30000)
        
        const options = {
          method: 'POST',
          signal: signal,
          headers: {
            Authorization: `Token ${key.value}`
          },
          body: file.value.value
        }
        try {
          fetch('https://api.deepgram.com/v1/listen?smart_format=true', options)
            .then((response) => {
              if (!response.ok) {
                throw new Error('Network response was not ok')
              }
              return response.json() // Added return statement
            })
            .then((data) => {
              clearTimeout(timeoutId)
              transcript.value = data.results.channels[0].alternatives[0]
              file.value = {}
              tokenizerStore.textInput = transcript.value
              isTranscribing.value = false
            })
            .catch((error) => {
              if (error.name === 'AbortError') {
                console.log('Request was aborted')
                timeoutError.value = 'Your request failed to process. Please try again.'
              } else {
                console.error('Error:', error)
              }
            })
        } catch (e) {
          console.log('error', e)
        }
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
    clearFile,
    timeoutError
  }
})
