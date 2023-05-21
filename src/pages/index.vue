<script lang="ts" setup>
import { useDefaultHead } from '~/utils'
import IndexWrapper from '~/components/IndexWrapper.vue'

useDefaultHead({ title: 'Hi~', description: 'Hi~' })

const links = {
  '/posts': '博客',
  '/projects': '制作',
  '/post/hello-world': '关于',
}
</script>

<template>
  <IndexWrapper title="Hi~">
    <p max-w-lg class="[&>span:last-of-type]:hidden">
      <span>我正在思索如何设计与构建一个足够让我满意的个人网站，那么在此之前让这些以最简单的方式呈现： </span>
      <template v-for="link of Object.entries(links)" :key="link[1]">
        <RouterLink :to="link[0]">{{ link[1] }}</RouterLink>
        <span>, </span>
      </template>
    </p>
    <!--
      <p flex="~ gap-2">
        <a href="https://space.bilibili.com/35245056" target="_blank">哔哩哔哩</a>
        <a href="https://github.com/jiakun-zhao" target="_blank">GitHub</a>
        <a href="https://twitter.com/JiakunZhao" target="_blank">Twitter</a>
        <a href="https://mas.to/@zhaojiakun" target="_blank">Mastodon</a>
      </p>
      <p>
        <a href="mailto:hi@zhaojiakun.com">hi@zhaojiakun.com</a>
      </p>
    -->
  </IndexWrapper>
</template>
