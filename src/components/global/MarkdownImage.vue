<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  src: string
  alt: string
  title?: string
}>()

const size = computed(() => {
  const params = new URL(props.src, location.origin).searchParams.entries()
  return Object.fromEntries(
    Array.from(params).map(([key, value]) => [
      key === 'w' ? 'width' : key === 'h' ? 'height' : key,
      value,
    ]),
  )
})
</script>

<template>
  <figure m-0>
    <img
      v-bind="{ ...props, ...size }"
      max-w-full h-auto
    />
    <figcaption
      v-if="props.title"
      py-4 text-thirdly text-xs
    >
      [ {{ props.title }} ]
    </figcaption>
  </figure>
</template>
