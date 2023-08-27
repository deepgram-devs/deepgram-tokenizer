<script setup></script>

<template>
  <div class="flex items-center space-x-2">
    <button
      type="button"
      role="checkbox"
      aria-checked="false"
      data-state="unchecked"
      value="on"
      class="peer h-4 w-4 shrink-0 rounded-sm border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900"
      id="terms"
    ></button
    ><label
      for="terms"
      class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >Show whitespace</label
    >
  </div>
</template>
