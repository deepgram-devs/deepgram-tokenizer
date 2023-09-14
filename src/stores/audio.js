import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import useDeepgramKey from '../../composables/useDeepgramKey'

export const useAudioStore = defineStore('audio', () => {
  const file = ref({})
  const fileName = ref('')
  const transcript = ref('')
  const isTranscribing = ref(false)
  const clearFile = ref('')
  const key = ref('')
  const timeoutError = ref(false)

  async function transcribeFile() {
    if (!file.value) {
      alert('Please attach a file')
    } else {
      fileName.value = file.value.value.name
      useDeepgramKey().then((res) => {
        key.value = res.key.value
        isTranscribing.value = true
        timeoutError.value = ''
        const controller = new AbortController()
        const signal = controller.signal
        const timeoutId = setTimeout(() => {
          controller.abort()
          console.log('Request aborted due to timeout')
          isTranscribing.value = false
        }, 40000)

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
              return response.json()
            })
            .then((data) => {
              clearTimeout(timeoutId)
              transcript.value = data.results.channels[0].alternatives[0]
              file.value = {}
              isTranscribing.value = false
              setTimeout(() => {
                fileName.value = ''
              }, 1500)
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

  const maxLength = 10
  const shortenedFilename = computed(() => {
    const fileParts = fileName.value.split('.')
    if (fileParts.length <= 1) {
      return fileName.value
    }

    const extension = fileParts.pop()
    let truncatedName = fileParts.join('.')

    if (truncatedName.length > maxLength) {
      truncatedName = truncatedName.slice(0, maxLength)
    }

    return truncatedName + '***' + '.' + extension
  })

  function clearAudio() {
    console.log('hit')
    file.value = {}
    transcript.value = ''
    isTranscribing.value = false
    clearFile.value = true
    fileName.value = ''
  }

  return {
    file,
    transcribeFile,
    transcript,
    isTranscribing,
    clearAudio,
    clearFile,
    timeoutError,
    fileName,
    shortenedFilename
  }
})
