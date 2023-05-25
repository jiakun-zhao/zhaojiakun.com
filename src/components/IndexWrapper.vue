<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{ title: string; to?: string }>()
const title = computed(() => props.title)
const to = computed(() => props.to)
</script>

<template>
  <div
    slide-enter index-
    text-justify break-words break-all
    tracking-wider w-full max-w-3xl p-8 mx-auto
  >
    <RouterLink v-if="to" :to="to" class="text-primary">
      <h3 slide-enter-1>{{ title }}</h3>
    </RouterLink>
    <h3 v-else>{{ title }}</h3>
    <slot />
  </div>
</template>
