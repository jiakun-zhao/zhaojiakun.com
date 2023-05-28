<script lang="ts" setup>
import { formatDate, isDark } from '~/logic'

const router = useRouter()
const routes = router.getRoutes()
const route = useRoute()
const backRoute = computed(() => routes.find(i => i.name === route.meta.backTo))

const isLoadIconShow = ref(true)
router.beforeEach((to, from, next) => {
  isLoadIconShow.value = true
  next()
})
router.afterEach(() => {
  isLoadIconShow.value = false
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
  <div v-show="isLoadIconShow" animate-fade-in fixed top-4 right-4 z-2147483647 i-svg-spinners:90-ring-with-bg></div>
  <header slide-enter base-item-style pt-8>
    <h3 v-if="!backRoute">{{ route.meta.title }}</h3>
    <AppHeader
      v-else
      :title="route.meta.title"
      :back-path="backRoute.path"
      :back-info="backRoute.name === 'index' ? '首页' : backRoute.meta.title"
      :description="backRoute.name === 'posts' ? formatDate(route.meta.date!, false) : route.meta.description"
    />
  </header>
  <main slide-enter base-item-style text-sm leading-8 text-secondary>
    <RouterView />
    <AppPostFooter v-if="route.path.startsWith('/post/')" />
  </main>
</template>
