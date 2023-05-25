<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{ msg: string }>()
const msg = computed(() => props.msg)
</script>

<template>
  <span
    animate-fade-out animate-delay-1000 animate-duration-2000 animate-fill-forwards
    font-normal text-xs ml-2 t3
  >
    {{ msg }}
  </span>
</template>
