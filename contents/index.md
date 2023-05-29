---
title: Hi~
description: Hi there 👋
routes:
  - name: 记录
    path: /posts
    icon: i-ph:notepad-duotone
  - name: 制作
    path: /projects
    icon: i-ph:bounding-box-duotone
  - name: 关于
    path: /post/hello-world
    icon: i-u:favicon
---

<p max-w-lg slide-enter-4>
  <span>我正在思索如何设计与构建一个足够让我满意的个人网站，那么在此之前让这些以最简单的方式呈现： </span>
  <template v-for="({ name, path, icon }) of frontmatter.routes" :key="name">
    <span :class="icon" text-base align-mid></span>
    <RouterLink ml-0.5 :to="path">{{ name }}</RouterLink>
    <span class="last-of-type:hidden" mr-1>, </span>
  </template>
</p>