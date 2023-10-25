import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import useDeepgramKey from '../../composables/useDeepgramKey'
import { createClient } from '@deepgram/sdk'

export const useAudioStore = defineStore('audio', () => {
  const file = ref({})
  const fileName = ref('')
  const transcript = ref('')
  const isTranscribing = ref(false)
  const clearFile = ref('')
  const key = ref('')
  const timeoutError = ref(false)

  // async function transcribeFile() {
  //   if (!file.value) {
  //     alert('Please attach a file')
  //   } else {
  //     fileName.value = file.value.value.name
  //     useDeepgramKey().then((res) => {
  //       key.value = res.key.value
  //       isTranscribing.value = true
  //       timeoutError.value = ''
  //       const controller = new AbortController()
  //       const signal = controller.signal
  //       const timeoutId = setTimeout(() => {
  //         controller.abort()
  //         console.log('Request aborted due to timeout')
  //         isTranscribing.value = false
  //       }, 40000)

  //       const deepgram = createClient(key.value)
  //       console.log(deepgram)
  //       const { result, error } = await deepgram.listen.prerecorded.transcribeFile(file.value.value, {
  //         punctuate: true,
  //         model: 'nova'
  //       })
  //       if (error) throw error
  //       console.dir(result)
  //     })
  //   }
  // }

  async function transcribeFile() {
    if (!file.value) {
      alert('Please attach a file')
    } else {
      fileName.value = file.value.value.name
      try {
        const res = await useDeepgramKey()
        key.value = res.key.value
        isTranscribing.value = true
        timeoutError.value = ''

        // DEEPGRAM API CALL HERE:
        const deepgram = createClient(key.value)
        console.log(deepgram)
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
