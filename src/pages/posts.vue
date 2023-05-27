<script lang="ts" setup>
const routes = useRouter()
  .getRoutes()
  .filter(i => i.meta.type === 'posts' && i.meta.draft !== true)
  .sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime())

useMeta({ title: '博客', description: '浏览我的所知所想。' })
</script>

<template>
  <IndexWrapper title="博客" to="/">
    <p index-sub-title>
      <span>浏览我的所知所想</span>
      <span index-route-tip>点击标题去到首页</span>
    </p>
    <p v-for="route of routes" :key="route.name">
      <span text-xs text-secondary mr-2>{{ route.meta.date.substring(5, 10) }}</span>
      <RouterLink :to="route.path">{{ route.meta.title }}</RouterLink>
    </p>
  </IndexWrapper>
</template>
