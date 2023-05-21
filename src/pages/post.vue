<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import IndexWrapper from '~/components/IndexWrapper.vue'
import type { DefaultFrontMatter } from '~/types'
import { BASE_URL, useDefaultHead } from '~/utils'

interface FrontMatter extends DefaultFrontMatter {
  date: string
  images?: { [key: string]: number }
}

const route = useRoute()
const frontmatter = computed<FrontMatter>(() => route.meta.frontmatter)
useDefaultHead(frontmatter.value, {
  script: [{
    'src': 'https://giscus.app/client.js',
    'data-theme': `${BASE_URL}/assets/giscus-3.0.css`,
    'data-repo': 'jiakun-zhao/zhaojiakun.com',
    'data-repo-id': 'R_kgDOJWuyVg',
    'data-category': 'BLOG',
    'data-category-id': 'DIC_kwDOJWuyVs4CVzNG',
    'data-mapping': 'title',
    'data-strict': '1',
    'data-reactions-enabled': '0',
    'data-emit-metadata': '0',
    'data-input-position': 'top',
    'data-lang': 'zh-CN',
    'crossorigin': 'anonymous',
    'defer': true,
  }],
})
</script>

<template>
  <IndexWrapper>
    <h3>{{ frontmatter.title }}</h3>
    <p class="text-xs!" pb-6>{{ frontmatter.date.slice(0, -3) }}</p>
    <RouterView />
    <p py16 class="text-xs!">
      <a class="hover:text-accent! t2!" target="_blank" href="https://creativecommons.org/licenses/by-nc-sa/4.0/">遵循 CC BY-NC-SA 4. 协议</a>
      <span>，转载内容请参阅原地址协议。</span>
    </p>
    <div class="giscus" />
  </IndexWrapper>
</template>
