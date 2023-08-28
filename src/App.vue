<script setup>
import LeftColumn from './components/LeftColumn.vue'
import RightColumn from './components/RightColumn.vue'
import Logo from '../src/assets/images/Logo.png'
</script>

<template>
  <main class="mx-auto flex min-h-screen max-w-[1200px] flex-col gap-4 p-8">
    <div class="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
      <h1
        class="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600 flex text-4xl font-bold font-favorit"
      >
        <img class="h-10 pr-2" :src="Logo" />Tokenizer
      </h1>
    </div>
    <div class="grid gap-4 md:grid-cols-2">
      <left-column />
      <right-column />
    </div>
  </main>
</template>
