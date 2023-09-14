<script setup>
import { useFileDialog } from '@vueuse/core'
import { useAudioStore } from '../stores/audio'
import SpinLoader from './SpinLoader.vue'
const audioStore = useAudioStore()
const { files, open, onChange } = useFileDialog()

onChange((file) => {
  audioStore.file.value = file[0]
  audioStore.clearFile = false
  audioStore.transcribeFile()
})
</script>

<template>
  <div class="rounded-[4px] py-4 h-24">
    <div class="flex flex-col">
      <div class="flex">
        <button type="button" name="file" @click="open()" class="button button-primary w-36 mr-2">
          Select Audio
        </button>

        <div class="" v-if="files && !audioStore.isTranscribing && !audioStore.timeoutError">
          <li class="list-none flex items-center h-full ml-4 text-[#949498]">
            {{ audioStore.shortenedFilename }}
          </li>
        </div>
        <div class="ml-10">
          <spin-loader
            :loadingState="audioStore.isTranscribing && !audioStore.timeoutError"
            loadingMessage="Transcribing..."
          />
        </div>
        <div
          class="w-[195px] text-md text-[#F0463A] font-bold"
          v-if="audioStore.timeoutError && !audioStore.isTranscribing"
        >
          {{ audioStore.timeoutError }}
        </div>
      </div>
    </div>
  </div>
</template>
