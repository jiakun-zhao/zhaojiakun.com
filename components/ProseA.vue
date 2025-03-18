<script lang="ts" setup>
const props = defineProps<{ href?: string }>()
</script>

<template>
  <Anchor
    :href="props.href"
    text-shadcn hover:text-accent
    decoration="underline offset-2 [hsl(var(--shadcn-border))]"
    hover:decoration="accent/20 dark:accent/38"
    transition="all duration-300"
  >
    <slot />
  </Anchor>
</template>
