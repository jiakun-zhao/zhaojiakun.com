<script lang="ts" setup>
import { useElementSize } from '@vueuse/core'
import { computed, ref } from 'vue'

const imgSrc = '/assets/images/after-the-fire.david.jpg'

const box = ref<HTMLDivElement>()
const { height, width } = useElementSize(box)
const classes = [['w-full h-full top-0 left-0', ''], ['w-1/2 h-1/2 bottom--1/3 right--1/3', 'animate-reverse']]
const imageSize = computed(() => Math.max(width.value, height.value) * Math.sqrt(2))
</script>

<template>
  <div
    ref="box" w-screen h-screen of-hidden
  >
    <div relative w-full h-full filter="blur-120px brightness-75">
      <div
        v-for="cls, idx of classes" :key="idx" :class="cls[0]"
        absolute flex items-center justify-center
      >
        <img
          :src="imgSrc" :class="cls[1]"
          :style="{ width: `${imageSize}px`, height: `${imageSize}px` }"
          block object-cover animate-rotate animate-duration-100s
        >
      </div>
    </div>
  </div>
</template>
