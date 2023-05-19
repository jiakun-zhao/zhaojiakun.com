<script lang="ts" setup>
interface SocialMedia {
  name: string
  icon: string
  url: string
}

const socialMedia: SocialMedia[] = [
  {
    name: 'GitHub',
    icon: 'i-tabler:brand-github',
    url: 'https://github.com/jiakun-zhao',
  },
  {
    name: 'Twitter',
    icon: 'i-tabler:brand-twitter',
    url: 'https://twitter.com/JiakunZhao',
  },
  {
    name: 'Bilibili',
    icon: 'i-tabler:brand-bilibili',
    url: 'https://space.bilibili.com/35245056',
  },
  {
    name: 'Mastodon',
    icon: 'i-tabler:brand-mastodon',
    url: 'https://mas.to/@zhaojiakun',
  }, {
    name: 'Mail',
    icon: 'i-tabler:mail',
    url: 'mailto:hi@zhaojiakun.com',
  },
]
</script>

<template>
  <nav flex gap="4" px-8 py-4 items-center>
    <NuxtLink to="/" block w-8 h-8 mr-auto>
      <img block h-full w-full src="/favicon.svg" alt="favicon">
    </NuxtLink>

    <NuxtLink to="/moments">Moments</NuxtLink>
    <NuxtLink to="/posts">Blog</NuxtLink>
    <NuxtLink to="/projects">Projects</NuxtLink>
    <NuxtLink to="/about">About</NuxtLink>

    <details relative select-none open>
      <summary text-2xl cursor-pointer>@</summary>
      <div
        absolute top-10 right--2 flex gap-3
        rounded-1 border-secondary border-solid shadow-inner
        py-2 px-4
      >
        <a
          v-for="i of socialMedia" :key="i.name"
          :href="i.url" :title="i.name" target="_blank"
          block
        >
          <div text-4.5 :class="i.icon"></div>
        </a>
      </div>
    </details>
  </nav>
</template>
