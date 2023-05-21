<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{ title: string; to?: string }>()
const title = computed(() => props.title)
const to = computed(() => props.to)
</script>

<template>
  <div slide-enter index-wrapper>
    <RouterLink v-if="to" :to="to">
      <h3 slide-enter-1>{{ title }}</h3>
    </RouterLink>
    <h3 v-else>{{ title }}</h3>
    <slot />
  </div>
</template>
