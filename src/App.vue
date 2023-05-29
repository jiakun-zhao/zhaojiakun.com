<script lang="ts" setup>
import { formatDate, isDark } from '~/logic'

const router = useRouter()
const route = useRoute()
const isPost = computed(() => route.path.startsWith('/post/'))
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
  <div class="-" slide-enter>
    <h3 :key="route.path" mt-16 leading-8 text-4.5> {{ route.meta.title }}</h3>
    <p v-show="route.name !== 'index'" :key="route.path" text-xs text-secondary pb-10>
      {{ isPost ? formatDate(route.meta.date!, false) : (route.meta.description ?? route.meta.title) }}
    </p>
    <RouterView />
    <AppPostFooter v-if="isPost" />
  </div>
</template>
