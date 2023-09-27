<script setup>
import { onMounted, nextTick } from 'vue'
import LeftColumn from './components/LeftColumn.vue'
import RightColumn from './components/RightColumn.vue'
import Logo from '../src/assets/images/logo.png'

onMounted(() => {
  nextTick(() => {
    let script = document.createElement('script')
    script.text = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src= 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f); })(window,document,'script','dataLayer','GTM-M5WQMGR');`
    script.id = 'google-tag-manager'
    script.setAttribute('async', '')
    script.type = 'text/javascript'
    document.body.appendChild(script)
  })
})
</script>

<template>
  <main class="mx-auto flex min-h-screen max-w-[1200px] flex-col gap-4 p-6 sm:p-8">
    <div class="flex flex-col gap-2 sm:flex-row sm:items-center">
      <a href="https://deepgram.com/"><img class="w-32 sm:w-52" :src="Logo" /></a>
      <h1
        class="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600 flex text-2xl sm:text-4xl font-bold font-favorit"
      >
        Tokenizer
      </h1>
    </div>
    <p class="text-sm sm:text-base my-6 text-[#ededf2] max-w-5xl">
      Analyze the tokenization process of the Deepgram API and determine the total number of tokens
      in a given piece of audio or text. Supports
      <a
        href="https://developers.deepgram.com/docs/summarization"
        class="text-[#13EF93] hover:underline"
        >Summarization DSLM</a
      >
      models only.
    </p>
    <div class="grid gap-4 md:grid-cols-2">
      <left-column />
      <right-column />
    </div>
  </main>
</template>
