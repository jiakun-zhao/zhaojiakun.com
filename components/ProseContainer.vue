<script lang="ts" setup>
import type { Data } from 'vfile'

const props = defineProps<{ frontmatter?: Data }>()
</script>

<template>
  <article
    class=":uno: [&_code]:text-nowrap [&_code]:text-sm [&_:not(h1,h2,h3,h4,h5,h6)_a]:font-500 [&_code]:tracking-0"
    mx-auto mt7xl max-w-2xl p6 pb32 text-shadcn-muted lh-loose tracking-wider
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
