<script lang="ts" setup>
const route = useRoute()
const routes: { name: string; path: string }[] = [
  {
    name: '博客',
    path: '/posts',
  },
  {
    name: '制作',
    path: '/projects',
  },
  {
    name: '关于',
    path: '/post/hello-world',
  },
]
</script>

<template>
  <template v-for="({ name, path }) of routes" :key="name">
    <template v-if="route.path !== path">
      <!-- <span :class="icon" text-base align-mid></span> -->
      <RouterLink ml-0.5 :to="path">{{ name }}</RouterLink>
      <span last-of-type:hidden mr-1>, </span>
    </template>
  </template>
</template>
