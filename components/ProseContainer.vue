<script lang="ts" setup>
import type { Data } from 'vfile'

const props = defineProps<{ frontmatter?: Data }>()
</script>

<template>
  <article
    max-w-2xl text-shadcn-muted lh-loose tracking-wider
    class=":uno: [&_:not(h1,h2,h3,h4,h5,h6)_a]:font-500"
    m="x-auto t7xl" p="6 b32"
  >
    <slot />
    <p
      pt6 text-sm tracking-0 font-mono uppercase
      class="slide-enter"
      :style="{ '--slide-enter-step': props.frontmatter?.slideEnterCount ?? 0 }"
    >
      <ProseA text-inherit decoration="none!" href="https://creativecommons.org/licenses/by-nc-sa/4.0">CC BY-NC-SA 4.0</ProseA>
      <span> © </span>
      <ProseA text-inherit decoration="none!" href="https://zhaojiakun.com">Jiakun Zhao</ProseA>
    </p>
  </article>
</template>
