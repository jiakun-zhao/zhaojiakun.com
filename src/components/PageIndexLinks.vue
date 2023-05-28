<script lang="ts" setup>
const links = {
  '/posts': '博客',
  '/projects': '制作',
  '/post/hello-world': '关于',
}
</script>

<template>
  <template v-for="([path, name]) of Object.entries(links)" :key="name">
    <RouterLink :to="path">{{ name }}</RouterLink>
    <span class="last-of-type:hidden">, </span>
  </template>
</template>
