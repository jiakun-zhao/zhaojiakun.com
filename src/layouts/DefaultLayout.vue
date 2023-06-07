<script lang="ts" setup>
import { ref } from 'vue'
import { useIntersectionObserver, usePreferredDark } from '@vueuse/core'
import { useCustomHead } from '~/composables/head'
import type { Head } from '~/types'
import { isMenuShow } from '~/composables'

const props = defineProps<{ head: Head }>()

const isDark = usePreferredDark()
const isWeChat = /MicroMessenger/i.test(window.navigator.userAgent)

const titleEl = ref<HTMLHeadingElement>()
const isTitleElVisible = ref(true)
useIntersectionObserver(
  titleEl,
  ([{ isIntersecting }]) => isTitleElVisible.value = isIntersecting,
)
useCustomHead(() => ({
  ...props.head,
  title: (isWeChat && isTitleElVisible.value) ? '' : props.head.title,
}))
</script>

<template>
  <div
    v-if="isWeChat && !isDark"
    fixed top-0 left-0 right-0 z--1
    h-10vh style="background-image: linear-gradient(#ececec, white);"
  ></div>
  <main container>
    <header slide-enter="0">
      <h3
        ref="titleEl"
        container-header hover:text-accent
        @click="isMenuShow = true"
      >
        {{ props.head.title }}
      </h3>
      <slot name="subtitle" />
    </header>
    <article slide-enter="2">
      <slot name="article" />
    </article>
  </main>
</template>
