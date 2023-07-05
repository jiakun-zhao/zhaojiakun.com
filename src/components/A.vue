<script lang="ts" setup>
const props = defineProps<{ href: string }>()
</script>

<template>
  <RouterLink v-if="props.href.startsWith('/')" :to="props.href">
    <slot />
  </RouterLink>
  <a v-else :href="props.href" target="_blank">
    <slot />
  </a>
</template>
