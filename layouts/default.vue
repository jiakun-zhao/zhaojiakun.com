<script lang="ts" setup>
import Navigation from '~/components/Navigation.vue'
</script>

<template>
  <Navigation />
  <div
    fixed top-4 left-8 z--9999 font-900 text-mid:10 text-8em
    un-before="content-[var(--hi)]"
  ></div>
  <slot />
</template>
