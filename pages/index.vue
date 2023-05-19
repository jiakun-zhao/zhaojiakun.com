<script lang="ts" setup>
import { wallpaper } from '~/constants'

const { height } = useWindowSize()
const wrapper = ref<HTMLDivElement>()

watchEffect(() => wrapper.value && (wrapper.value.style.height = `${height.value}px`))
</script>

<template>
  <div
    ref="wrapper" relative cursor-default h-screen
    :class="wallpaper.isDark ? 'bg-black text-white' : 'bg-white text-black'"
  >
    <img
      :src="wallpaper.src" :alt="wallpaper.page" absolute
      w-full h-full object-cover pointer-events-none
    >
    <div absolute right-8 top-8 bottom-8 flex="~ col" text="sm right">
      <p>Hi~</p>
      <p>欢迎 & 祝福</p>
      <p flex="~ col" gap-3 items-end text-secondary>
        <NuxtLink w-min ws-nowrap to="/moments">瞬间</NuxtLink>
        <NuxtLink w-min ws-nowrap to="/posts">博客</NuxtLink>
        <NuxtLink w-min ws-nowrap to="/projects">制作</NuxtLink>
        <NuxtLink w-min ws-nowrap to="/about">关于</NuxtLink>
      </p>

      <p mt-auto text-xs>
        <a :href="wallpaper.page" target="_blank">照片</a>
        <span mx-2 text-secondary>来自</span>
        <a :href="wallpaper.userUrl" target="_blank">{{ wallpaper.userName }}</a>
      </p>

      <p text-secondary>2023 © Jiakun Zhao</p>
    </div>
  </div>
</template>
