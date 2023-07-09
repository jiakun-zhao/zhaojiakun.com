<script lang="ts" setup>
import type { ReactiveHead } from '@vueuse/head'
import { usePreferredDark } from '@vueuse/core'
import { useHead } from '@vueuse/head'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isDark = usePreferredDark()
const isPost = computed(() => route.path.startsWith('/post/'))

const subtitle = computed(() => (
  route.meta.subtitle
    ? route.meta.subtitle
    : route.meta.date
      ? route.meta.date.match(/(\d{4}-\d{2}-\d{2}).+(\d{2}:\d{2}):\d{2}/)?.slice(1, 3).join(' ')
      : null
))

useHead(() => {
  const title = route.meta.title
  const description = route.meta.description ?? 'Jiakun Zhao \'s Portfolio.'
  const ogImage = `${location.origin}/og/${route.meta.ogImage ?? 'icon.png'}`
  const author = route.meta.author ?? 'Jiakun Zhao'
  const giscus: ReactiveHead['script'] = isPost.value
    ? [{ 'src': 'https://giscus.app/client.js', 'data-theme': `${location.origin}/assets/giscus-4.0.css`, 'data-repo': 'jiakun-zhao/zhaojiakun.com', 'data-repo-id': 'R_kgDOJWuyVg', 'data-category': 'BLOG', 'data-category-id': 'DIC_kwDOJWuyVs4CVzNG', 'data-mapping': 'title', 'data-strict': '1', 'data-reactions-enabled': '0', 'data-emit-metadata': '0', 'data-input-position': 'top', 'data-lang': 'en', 'crossorigin': 'anonymous', 'defer': true }]
    : []
  return {
    title,
    script: [...giscus],
    meta: [
      { property: 'og:title', content: title },
      // { name: 'twitter:title', content: title },

      { name: 'description', content: description },
      { property: 'og:description', content: description },
      // { name: 'twitter:description', content: description },

      { property: 'og:image', content: ogImage },
      // { name: 'twitter:image', content: ogImage },

      { name: 'theme-color', content: isDark.value ? '#121212' : '#ffffff' },
      { name: 'author', content: author },
    ],
  }
})
</script>

<template>
  <div max-w-3xl mx-auto px-6 pb-32 mt-12>
    <div v-if="!route.meta.hideHeader">
      <h2>{{ route.meta.title }}</h2>
      <span v-if="subtitle" text-thirdly text-sm>{{ subtitle }}</span>
    </div>
    <slot />
    <div v-if="isPost" class="giscus" mt-32 />
    <div text-sm mt-24 text-thirdly>
      <A href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" mr-2 text-inherit>CC BY-NC-SA 4.0</A>
      <span>{{ new Date().getFullYear() }} © Jiakun Zhao</span>
    </div>
  </div>
</template>
