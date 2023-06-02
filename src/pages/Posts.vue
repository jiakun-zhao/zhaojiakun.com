<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const routes = router.getRoutes()

console.log(routes)
</script>

<template>
  <h3>Posts</h3>
</template>
