<script lang="ts" setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import DefaultLayout from '~/layouts/DefaultLayout.vue'

const description = '记录我的所知所想'
const dateRE = /^(\d{4})-(\d{2}-\d{2}).?(\d{2}:\d{2})/

const router = useRouter()
const list = computed(() => {
  return router.getRoutes()
    .filter(({ meta }) =>
      meta.isPost
       && !meta.draft
       && meta.date
       && dateRE.test(meta.date),
    )
    .sort((a, b) => {
      const dateA = new Date(a.meta.date as string)
      const dateB = new Date(b.meta.date as string)
      return dateB.getTime() - dateA.getTime()
    })
    .map(({ meta: { title, date, description }, path }) => ({
      path,
      title: title.startsWith('0x') ? description ?? title : title,
      date: (date as string).match(dateRE)![2],
    }))
})
</script>

<template>
  <DefaultLayout :head="{ title: '博客', description }">
    <template #subtitle>
      <p container-subtitle>{{ description }}</p>
    </template>
    <template #article>
      <p v-for="({ title, date, path }) of list" :key="path" flex>
        <span lh-inherit text="xs thirdly" mr-4>{{ date }}</span>
        <RouterLink :to="path" font-normal b="none!" flex-1>{{ title }}</RouterLink>
      </p>
    </template>
  </DefaultLayout>
</template>
