<script lang="ts" setup>
useHead({
  bodyAttrs: {
    class: 'of-hidden',
  },
})
</script>

<template>
  <div size-screen flex>
    <div min-w-56 bg-shadcn-muted:36 px4 py6 text-14px b="0 r-1 solid shadcn">
      <div py2 font-450>Storage</div>
      <UiSidebar title="Cloudflare KV" :children="[{ name: 'Binding A' }, { name: 'Binding B' }, { name: 'Binding C' }]" />
      <UiSidebar title="Cloudflare R2" :children="[{ name: 'Binding A' }, { name: 'Binding B' }, { name: 'Binding C' }]" />
      <UiSidebar title="Cloudflare D1" :children="[{ name: 'Binding A' }, { name: 'Binding B' }, { name: 'Binding C' }]" />
      <div mt5 py2 font-450>Usage</div>
      <UiSidebar title="Photos" />
    </div>
    <div flex-1>
      <NuxtPage />
    </div>
  </div>
</template>
