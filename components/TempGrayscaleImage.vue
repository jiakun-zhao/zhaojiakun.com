<script lang="ts" setup>
const props = defineProps<{
  thumb: string
  regular: string
  width: number
  height: number
  alt: string
  title?: string
}>()
</script>

<template>
  <figure
    class="group relative m-0 w-full of-hidden rd-lg" b="1 solid shadcn"
    :style="{ 'aspect-ratio': `${props.width} / ${props.height}` }"
  >
    <img
      class="absolute-full block transition-all duration-1000"
      group-not-hover="blur-sm scale-105 dark:op-50"
      :src="props.thumb"
      :alt="props.alt"
    >
    <img
      class="absolute-full block transition-all duration-1000"
      group-not-hover="blur-sm scale-105 op-0"
      :src="props.regular"
      :alt="props.alt"
    >
    <figcaption v-if="props.title">{{ props.title }}</figcaption>
  </figure>
</template>
