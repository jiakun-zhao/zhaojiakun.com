<script lang="ts" setup>
import { useRouter } from 'vue-router'
import IndexWrapper from '~/components/IndexWrapper.vue'
import { useDefaultHead } from '~/utils'

const routes = useRouter().getRoutes().filter(i => i.meta.isPost)
useDefaultHead({ title: '博客', description: '浏览我的所知所想。' })
</script>

<template>
  <IndexWrapper>
    <h3>博客</h3>
    <p>
      <span>浏览我的所知所想，或</span>
      <RouterLink mx1 to="../">../</RouterLink>
    </p>
    <div>
      <p v-for="route of routes" :key="route.name">
        <RouterLink :to="route.path">{{ route.meta.frontmatter.title }}</RouterLink>
      </p>
    </div>
  </IndexWrapper>
</template>
