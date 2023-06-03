<script lang="ts" setup>
import { useCustomHead } from '~/composables/head'
import type { Head } from '~/types'
import { isMenuShow } from '~/composables'

const props = defineProps<{ head: Head }>()

useCustomHead(() => props.head)
</script>

<template>
  <main container>
    <header slide-enter="0">
      <h3
        container-header hover:text-accent
        @click="isMenuShow = true"
      >
        {{ props.head.title }}
      </h3>
      <slot name="subtitle" />
    </header>
    <article slide-enter="2">
      <slot name="article" />
    </article>
  </main>
</template>
