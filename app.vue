<script lang="ts" setup>
import '~/assets/fonts/DMMono.css'

useHead({
  bodyAttrs: {
    class: [
      'm-0', 'text-secondary', 'bg-primary',

      'font-sans', '[&_code]:font-mono', 'tracking-wide',

      '[&_a]:text-inherit', '[&_a:hover]:text-accent', '[&_a]:transition', '[&_a]:duration-500',
      '[&_a]:border-b', '[&_a]:border-primary', '[&_a:hover]:border-[currentColor]', '[&_a]:decoration-none',

      '[&_details_summary]:list-none', '[&_details_summary::-webkit-details-marker]:display-none',
    ],
  },
})
</script>

<template>
  <NuxtPage />
</template>
