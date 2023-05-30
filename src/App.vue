<script lang="ts" setup>
import { formatDate, useApp } from '~/logic'

const { isPost, isIndex, isMenuShow } = useApp()
const router = useRouter()
const route = useRoute()
const isDark = usePreferredDark()
const isJumping = ref(true)

router.afterEach(() => isJumping.value = false)
router.beforeEach((to, from, next) => {
  isJumping.value = true
  next()
})

useHead(() => {
  const { title, description = 'Hi there 👋', og_image = 'og/icon.jpg' } = route.meta
  return {
    title,
    bodyAttrs: { class: { 'of-hidden': isMenuShow.value } },
    meta: [
      { name: 'description', content: description },
      { name: 'og:title', content: title },
      { name: 'og:description', content: description },
      { name: 'og:image', content: `${location.origin}/${og_image}` },
      { name: 'theme-color', content: isDark.value ? '#111111' : '#ffffff' },
    ],
  }
})
</script>

<template>
  <div v-show="isJumping" animate-fade-in fixed top-4 right-4 z-2147483647 i-svg-spinners:90-ring-with-bg></div>

  <AppMenu />

  <div class="-" slide-enter container>
    <h3
      :key="route.path"
      :class="!isIndex ? 'cursor-pointer hover:t-accent' : 'cursor-default'"
      pt-16 m-0 lh-8 t-4.5 select-none transition="color 600"
      @click="!isIndex && (isMenuShow = !isMenuShow)"
    >
      {{ route.meta.title }}
    </h3>

    <p v-show="!isIndex" :key="route.path" t="xs secondary" pb-10>
      <span>{{ isPost ? formatDate(route.meta.date!, false) : (route.meta.description ?? route.meta.title) }}</span>
      <span ml-2 tip-text>点击标题显示菜单</span>
    </p>

    <NeteaseMusicCard v-if="route.meta.music" :id="route.meta.music" />
    <RouterView />
    <AppPostFooter v-if="isPost" />
  </div>
</template>
