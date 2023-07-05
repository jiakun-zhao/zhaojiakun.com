<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  src: string
  alt: string
  title?: string
}>()

const size = computed(() => {
  const res = props.src.match(/\?w=(\d+)&h=(\d+)/)
  const [,width, height] = res ?? []
  return res ? { width, height } : {}
})
</script>

<template>
  <figure v-if="props.title" m-0>
    <img :src="props.src" :alt="props.alt" v-bind="size">
    <figcaption py-4 text-thirdly text-xs>[ {{ props.title }} ]</figcaption>
  </figure>
  <img v-else :src="props.src" :alt="props.alt" v-bind="size">
</template>
