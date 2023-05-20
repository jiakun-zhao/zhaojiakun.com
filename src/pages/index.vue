<script lang="ts" setup>
import { useStyleTag } from '@vueuse/core'
import '~/assets/@index.scss'

useStyleTag(
  Array.from(
    { length: 24 },
    (_, i) => `[slide-enter]>*:nth-child(${i}){--enter-stage:${i}}`,
  ).join(''),
)
</script>

<template>
  <div
    slide-enter
    class="[&_a]:b1 [&_a]:border-b [&_a]:duration-500 [&_a]:transition"
    tracking-wider text-justify w-full p8 font-300
  >
    <RouterView />
  </div>
</template>
