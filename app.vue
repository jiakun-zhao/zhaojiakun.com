<script lang="ts" setup>
import { withoutTrailingSlash } from 'ufo'

const appConfig = useAppConfig()
const router = useRouter()
const route = useRoute()

useDark()
useUmami()

useHead({
  link: [
    { href: '/favicon.svg', rel: 'icon', type: 'image/svg+xml' },
    { href: '/apple-touch-icon.png', rel: 'apple-touch-icon', sizes: '180x180', type: 'image/png' },
  ],
  meta: [
    { property: 'og:url', content: withoutTrailingSlash(new URL(route.fullPath, appConfig.origin).href) },
    { property: 'og:image', content: `${appConfig.origin}/_images/og-default.png` },
    { name: 'twitter:image', content: `${appConfig.origin}/_images/og-default.png` },
  ],
  htmlAttrs: {
    lang: 'en',
  },
  bodyAttrs: {
    class: 'font-sans m0 text-shadcn bg-shadcn [&_code]:font-mono',
  },
  script: [{
    tagPriority: -1,
    innerHTML: '(()=>{const m=window.matchMedia;document.documentElement.classList.add(m?(m("(prefers-color-scheme:dark)").matches?"dark":"light"):"auto")})()',
  }],
})

onMounted(() => {
  document.addEventListener('gesturestart', e => e.preventDefault())

  import('nprogress').then((nprogress) => {
    nprogress.configure({ showSpinner: false, speed: 350 })
    router.afterEach(() => nprogress.done())
    router.beforeEach((to, from, next) => {
      nprogress.start()
      next()
    })
  })
})
</script>

<template>
  <NuxtPage />
</template>
