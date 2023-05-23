<script lang="ts" setup>
import type { RouteRecordNormalized } from 'vue-router'
import { useRouter } from 'vue-router'
import type { PostFrontMatter } from '~/types'
import { useDefaultHead } from '~/utils'
import IndexWrapper from '~/components/IndexWrapper.vue'
import IndexRouteTip from '~/components/IndexRouteTip.vue'

interface Route extends RouteRecordNormalized {
  meta: {
    isPost: boolean
    frontmatter: PostFrontMatter
  }
}

const routes = useRouter()
  .getRoutes()
  .filter(i => i.meta.isPost && i.meta.frontmatter.draft !== true)
  .sort((a, b) => new Date(b.meta.frontmatter.date).getTime() - new Date(a.meta.frontmatter.date).getTime()) as Route[]

useDefaultHead({ title: '博客', description: '浏览我的所知所想。' })
</script>

<template>
  <IndexWrapper title="博客" to="/">
    <p>
      <span>浏览我的所知所想</span>
      <IndexRouteTip msg="点击标题去到首页" />
    </p>
    <div mt16>
      <p v-for="route of routes" :key="route.name">
        <span text-xs t3 mr2>{{ route.meta.frontmatter.date.substring(5, 10) }}</span>
        <RouterLink :to="route.path">{{ route.meta.frontmatter.title }}</RouterLink>
      </p>
    </div>
  </IndexWrapper>
</template>
