<script lang="ts" setup>
import type { RouteRecordNormalized } from 'vue-router'
import { useRouter } from 'vue-router'

function checkPostMeta(record: RouteRecordNormalized) {
  return [
    record.path.startsWith('/post/'),
    record.meta.title,
    record.meta.date,
    record.meta.draft !== true,
  ].every(Boolean)
}

function getDateNumber(record: RouteRecordNormalized) {
  return new Date(record.meta.date!).getTime()
}

const routes = useRouter().getRoutes()
  .filter(checkPostMeta)
  .sort((a, b) => getDateNumber(b) - getDateNumber(a))
</script>

<template>
  <div flex="~ col" gap-4 mt-12>
    <A
      v-for="(item, idx) of routes" :key="idx" :href="item.path"
      text-secondary hover:text-accent select-none b-b-none
    >
      <span text-thirdly text-xs mr-2>{{ item.meta.date!.slice(5, 10) }}</span>
      <span>{{ item.meta.title }}</span>
    </A>
  </div>
</template>
