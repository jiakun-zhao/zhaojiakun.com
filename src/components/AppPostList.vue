<script lang="ts" setup>
import type { RouteMeta } from 'vue-router'
import { formatDate } from '~/logic'

const routes = useRouter().getRoutes()
const route = useRoute()

const is0xPost = (meta: RouteMeta) => meta.title.startsWith('0x')

const list = computed(() => {
  return routes.filter((i) => {
    if (!i.path.startsWith('/post/') || i.meta.draft === true)
      return false
    const _ = is0xPost(i.meta)
    return route.query.from === '0x3ba' ? _ : !_
  }).sort((a, b) => new Date(b.meta.date!).getTime() - new Date(a.meta.date!).getTime())
})
</script>

<template>
  <p v-for="item of list" :key="item.name" flex>
    <span leading-inherit text-xs text-thirdly mr-4>{{ formatDate(item.meta.date!) }}</span>
    <RouterLink :to="item.path" class="b-none!" flex-1>
      {{ is0xPost(item.meta) ? item.meta.description! : item.meta.title }}
    </RouterLink>
  </p>
</template>
