<script setup>
// import { watch } from 'vue'
import { useFileDialog } from '@vueuse/core'
const { files, open, onChange } = useFileDialog()
import { useAudioStore } from '../stores/audio'
const audioStore = useAudioStore()

onChange((file) => {
  audioStore.file.value = file[0]
  audioStore.clearFile = false
  audioStore.transcribeFile()
})
</script>

<template>
  <div class="rounded-md py-4">
    <div class="flex flex-col">
      <div class="flex">
        <button type="button" name="file" @click="open()" class="button button-primary w-36 mr-2">
          Choose file
        </button>

        <div class="" v-if="files">
          <li
            class="list-none flex items-center h-full ml-8 text-[#949498]"
            v-for="file of files"
            :key="file.name"
          >
            {{ file.name }}
          </li>
        </div>
      </div>
    </div>
  </div>
</template>
