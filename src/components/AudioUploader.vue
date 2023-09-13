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
  <div class="rounded-md py-4 h-24">
    <div class="flex flex-col">
      <div class="flex">
        <button type="button" name="file" @click="open()" class="button button-primary w-36 mr-2">
          Select Audio
        </button>

        <div class="" v-if="files && !audioStore.isTranscribing">
          <li
            class="list-none flex items-center h-full ml-8 text-[#949498]"
            v-for="file of files"
            :key="file.name"
          >
            {{ file.name }}
          </li>
        </div>
        <div class="ml-10">
          <spin-loader :loadingState="audioStore.isTranscribing" loadingMessage="Transcribing..." />
        </div>
      </div>
    </div>
  </div>
</template>
