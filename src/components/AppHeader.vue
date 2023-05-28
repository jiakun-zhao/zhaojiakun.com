<script lang="ts" setup>
const props = defineProps<{
  title: string
  description?: string
  backPath: string
  backInfo: string
}>()
</script>

<template>
  <RouterLink :to="props.backPath" text-primary decoration-none hover:text-accent>
    <h3>{{ props.title }}</h3>
  </RouterLink>
  <p text-xs pb-10>
    <span text-secondary mr-2>{{ props.description ?? props.title }}</span>
    <span text-thirdly op-0 animate-flash-header-tip animate-duration-4000 animate-forwards>
      点击标题转至{{ props.backInfo }}
    </span>
  </p>
</template>
