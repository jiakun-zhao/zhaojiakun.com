<script lang="ts" setup>
const props = defineProps<{ isIndex?: boolean }>()

const links = [
  ['首页', '/'],
  ['博客', '/posts'],
  // ['制作', '/projects'],
  ['关于', '/post/hello-world'],
]
</script>

<template>
  <template v-for="[name, path] of links.slice(Number(~~props.isIndex))" :key="path">
    <RouterLink ml-0.5 :to="path">{{ name }}</RouterLink>
    <span last-of-type:hidden mr-1>,</span>
  </template>
</template>
