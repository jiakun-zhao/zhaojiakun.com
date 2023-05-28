<script lang="ts" setup>
import { formatDate } from '~/logic'

const router = useRouter()
const list = computed(() => {
  return router.getRoutes()
    .filter((i) => {
      if (!i.meta.post || i.meta.post.draft === true)
        return false
      return router.currentRoute.value.name === '0x00'
        ? i.meta.post.is0x00 === true
        : i.meta.post.is0x00 !== true
    })
    .sort((a, b) => new Date(b.meta.post!.date).getTime() - new Date(a.meta.post!.date).getTime())
})
</script>

<template>
  <p v-for="item of list" :key="item.name" flex>
    <span leading-inherit text-xs text-thirdly mr-4>{{ formatDate(item.meta.post!.date) }}</span>
    <RouterLink :to="item.path" flex-1 border-none>
      {{ item.meta.post?.is0x00 === true ? item.meta.description ?? item.meta.title : item.meta.title }}
    </RouterLink>
  </p>
</template>
