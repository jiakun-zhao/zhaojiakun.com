---
title: Hi~
description: Hi there 👋
routes:
  - name: 记录
    path: /posts
  - name: 制作
    path: /projects
  - name: 关于
    path: /post/hello-world
---

<p max-w-lg>
  <span>我正在思索如何设计与构建一个足够让我满意的个人网站，那么在此之前让这些以最简单的方式呈现： </span>
  <template v-for="({name, path}) of frontmatter.routes" :key="name">
    <RouterLink :to="path">{{ name }}</RouterLink>
    <span class="last-of-type:hidden">, </span>
  </template>
</p>
