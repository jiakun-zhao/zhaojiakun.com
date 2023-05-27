<script lang="ts" setup>
const route = useRoute()
const meta = computed(() => route.meta)

useMeta(meta.value)
useHead({ script: [{ 'src': 'https://giscus.app/client.js', 'data-theme': `${location.origin}/assets/giscus-3.0.css`, 'data-repo': 'jiakun-zhao/zhaojiakun.com', 'data-repo-id': 'R_kgDOJWuyVg', 'data-category': 'BLOG', 'data-category-id': 'DIC_kwDOJWuyVs4CVzNG', 'data-mapping': 'title', 'data-strict': '1', 'data-reactions-enabled': '0', 'data-emit-metadata': '0', 'data-input-position': 'top', 'data-lang': 'zh-CN', 'crossorigin': 'anonymous', 'defer': true }] })

function toTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <IndexWrapper :title="meta.title" to="/posts">
    <p index-sub-title>
      <span>{{ meta.date.substring(0, 10) }} {{ meta.date.substring(11, 16) }}</span>
      <span index-route-tip>点击标题去到博客列表</span>
    </p>
    <RouterView />
    <hr w-16 border="secondary 1" my-16>
    <div pl-2 class="[&_p]:leading-8! [&_p]:text-xs!">
      <p>
        <RouterLink to="/">首页</RouterLink>,
        <RouterLink to="/posts">博客列表</RouterLink>,
        <a href="javascript:void(0);" @click="toTop">去到顶部</a>。
      </p>
      <p my-8>
        <a hover:text-accent text-secondary target="_blank" href="https://creativecommons.org/licenses/by-nc-sa/4.0/">遵循
          CC BY-NC-SA 4. 协议</a>
        <span>，转载的内容请参阅原地址协议。</span>
      </p>
    </div>
    <div class="giscus" />
  </IndexWrapper>
</template>
