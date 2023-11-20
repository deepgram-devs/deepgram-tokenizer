import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { createClient } from '@deepgram/sdk'

export const useAudioStore = defineStore('audio', () => {
  const file = ref({})
  const fileName = ref('')
  const transcript = ref('')
  const isTranscribing = ref(false)
  const clearFile = ref('')
  const timeoutError = ref(false)

  async function transcribeFile() {
    if (!file.value) {
      alert('Please attach a file')
    } else {
      fileName.value = file.value.value.name
      try {
        isTranscribing.value = true
        timeoutError.value = ''

        const deepgram = createClient('proxy', {
          restProxy: { url: 'http://localhost:8080' }
        })

        const { result, error } = await deepgram.listen.prerecorded.transcribeFile(
          file.value.value,
          {
            punctuate: true,
            model: 'nova'
          }
        )
        if (error) throw error
        console.dir(result)
      } catch (error) {
        console.error('An error occurred:', error)
      }
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
