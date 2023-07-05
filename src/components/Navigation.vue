<script lang="ts" setup>
const links: { title: string; icon: string; href: string }[] = [
  { title: 'home', icon: 'i-ph:house-line', href: '/' },
  { title: 'blog', icon: 'i-ph:article', href: '/posts' },
  { title: 'lightbulb', icon: 'i-ph:lightbulb', href: '/lightbulb' },
  { title: 'Twitter', icon: 'i-ph:twitter-logo', href: 'https://twitter.com/JiakunZhao' },
  { title: 'Mail', icon: 'i-ph:envelope', href: 'mailto:hi@zhaojiakun.com' },
]
</script>

<template>
  <nav
    sticky top-0 left-0 p-6
    flex gap-4 items-center justify-end
    mix-blend-exclusion
  >
    <A
      v-for="({ icon, ...props }, idx) of links"
      :key="idx" :class="{ 'mr-auto': idx === 0 }"
      v-bind="props" text-white hover:text-secondary b-b-none
    >
      <span :class="icon" />
    </A>
  </nav>
</template>
