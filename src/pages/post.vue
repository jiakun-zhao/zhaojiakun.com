<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import IndexWrapper from '~/components/IndexWrapper.vue'
import type { PostFrontMatter } from '~/types'
import { BASE_URL, useDefaultHead } from '~/utils'
import IndexRouteTip from '~/components/IndexRouteTip.vue'

const route = useRoute()
const frontmatter = computed<PostFrontMatter>(() => route.meta.frontmatter)

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
  <IndexWrapper :title="frontmatter.title" to="/posts">
    <p class="text-xs!" pb-12>
      <span>{{ frontmatter.date.substring(0, 10) }} {{ frontmatter.date.substring(11, 16) }}</span>
      <IndexRouteTip msg="点击标题去到博客列表" />
    </p>
    <RouterView />
    <hr w-16 b2 my-16 border-1>
    <p pl-2 class="leading-6! text-xs!">
      <a class="hover:text-accent! t2!" target="_blank" href="https://creativecommons.org/licenses/by-nc-sa/4.0/">遵循 CC BY-NC-SA 4. 协议</a>
      <span>，转载的内容请参阅原地址协议。</span>
    </p>
    <div class="giscus" />
  </IndexWrapper>
</template>
