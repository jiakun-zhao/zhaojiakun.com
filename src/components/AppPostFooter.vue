<script lang="ts" setup>
useHead({
  script: [{ 'src': 'https://giscus.app/client.js', 'data-theme': `${location.origin}/assets/giscus-3.0.css`, 'data-repo': 'jiakun-zhao/zhaojiakun.com', 'data-repo-id': 'R_kgDOJWuyVg', 'data-category': 'BLOG', 'data-category-id': 'DIC_kwDOJWuyVs4CVzNG', 'data-mapping': 'title', 'data-strict': '1', 'data-reactions-enabled': '0', 'data-emit-metadata': '0', 'data-input-position': 'top', 'data-lang': 'zh-CN', 'crossorigin': 'anonymous', 'defer': true }],
})
</script>

<template>
  <p mb-12 mt-24 text-xs ml-1 leading-inherit>
    <a target="_blank" href="https://creativecommons.org/licenses/by-nc-sa/4.0/">
      遵循 CC BY-NC-SA 4. 协议
    </a>
    <span>，转载的内容请参阅原地址协议。</span>
  </p>
  <div class="giscus" pb-24vh />
</template>
