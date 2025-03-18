<script lang="ts" setup>
const props = defineProps<{ href?: string }>()
const target = computed(() => props.href?.startsWith('http') ? '_blank' : null)
</script>

<template>
  <NuxtLink :to="props.href ?? '/'" :target>
    <slot />
  </NuxtLink>
</template>
