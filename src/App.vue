<script lang="ts" setup>
import { formatDate, isDark } from '~/logic'

const router = useRouter()
const route = computed(() => router.currentRoute.value)
const isPost = computed(() => route.value.meta.post !== undefined)
const headerInfo = computed(() => ({
  subtitle: isPost.value
    ? formatDate(route.value.meta.post!.date, false)
    : route.value.meta.description,
  backPath: isPost.value
    ? route.value.meta.post!.is0x00 ? '/0x00' : '/posts'
    : '/',
  backInfo: `点击标题${isPost.value ? '返回列表' : '返回首页'}`,
}))

const isLoadIconShow = ref(true)
router.beforeEach((to, from, next) => {
  isLoadIconShow.value = true
  next()
})
router.afterEach(() => {
  isLoadIconShow.value = false
})

useHead(() => {
  const {
    title,
    description = 'Hi there 👋',
    og_image = 'og/icon.jpg',
  } = route.value.meta
  return {
    title,
    script: isPost.value
      ? [{ 'src': 'https://giscus.app/client.js', 'data-theme': `${location.origin}/assets/giscus-3.0.css`, 'data-repo': 'jiakun-zhao/zhaojiakun.com', 'data-repo-id': 'R_kgDOJWuyVg', 'data-category': 'BLOG', 'data-category-id': 'DIC_kwDOJWuyVs4CVzNG', 'data-mapping': 'title', 'data-strict': '1', 'data-reactions-enabled': '0', 'data-emit-metadata': '0', 'data-input-position': 'top', 'data-lang': 'zh-CN', 'crossorigin': 'anonymous', 'defer': true }]
      : [],
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
  <header base-item-style pt-8>
    <h3 v-if="route.name === 'index'">{{ route.meta.title }}</h3>
    <template v-else>
      <RouterLink :to="headerInfo.backPath" text-primary decoration-none hover:text-accent>
        <h3>{{ route.meta.title }}</h3>
      </RouterLink>
      <p text-xs pb-10>
        <span v-show="headerInfo.subtitle" text-secondary mr-2>{{ headerInfo.subtitle }}</span>
        <span text-thirdly op-0 animate-flash-header-tip animate-duration-4000 animate-forwards>
          {{ headerInfo.backInfo }}
        </span>
      </p>
    </template>
  </header>
  <main base-item-style text-sm leading-8 text-secondary>
    <RouterView />
    <template v-if="isPost">
      <p my-8 text-xs ml-1>
        <a target="_blank" href="https://creativecommons.org/licenses/by-nc-sa/4.0/">
          遵循 CC BY-NC-SA 4. 协议
        </a>
        <span>，转载的内容请参阅原地址协议。</span>
      </p>
      <div class="giscus" pb-24vh />
    </template>
  </main>
</template>
