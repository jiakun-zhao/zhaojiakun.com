<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'
import DefaultLayout from '~/layouts/DefaultLayout.vue'

const route = useRoute()

const date = computed(() => {
  return route.meta.date
    ? route.meta.date.match(/^(\d{4}-\d{2}-\d{2}).?(\d{2}:\d{2})/)?.slice(1, 3).join(' ')
    : route.meta.description
})

useHead({
  script: [{ 'src': 'https://giscus.app/client.js', 'data-theme': `${location.origin}/assets/giscus-4.0.css`, 'data-repo': 'jiakun-zhao/zhaojiakun.com', 'data-repo-id': 'R_kgDOJWuyVg', 'data-category': 'BLOG', 'data-category-id': 'DIC_kwDOJWuyVs4CVzNG', 'data-mapping': 'title', 'data-strict': '1', 'data-reactions-enabled': '0', 'data-emit-metadata': '0', 'data-input-position': 'top', 'data-lang': 'zh-CN', 'crossorigin': 'anonymous', 'defer': true }],
})
</script>

<template>
  <DefaultLayout :head="route.meta">
    <template #subtitle>
      <p v-if="date" container-subtitle>{{ date }}</p>
    </template>
    <template #article>
      <!-- <NeteaseMusicCard v-if="route.meta.music" :id="route.meta.music" /> -->
      <slot />
      <p m="b-12 t-24 x-1" text-xs lh-inherit>
        <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank">
          遵循 CC BY-NC-SA 4. 协议
        </a>
        <span>，转载的内容请参阅原地址协议。</span>
      </p>
      <div class="giscus" pb-12vh />
    </template>
  </DefaultLayout>
</template>
