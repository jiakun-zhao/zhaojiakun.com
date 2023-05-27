<script lang="ts" setup>
const props = defineProps<{ title: string; to?: string }>()
</script>

<template>
  <div
    slide-enter index-
    text-justify break-words break-all
    tracking-wider w-full max-w-3xl p-8 mx-auto
  >
    <RouterLink v-if="props.to" :to="props.to" class="text-primary">
      <h3 slide-enter-1>{{ props.title }}</h3>
    </RouterLink>
    <h3 v-else>{{ props.title }}</h3>
    <slot />
  </div>
</template>
