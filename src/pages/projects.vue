<script lang="ts" setup>
import IndexWrapper from '~/components/IndexWrapper.vue'

import { useDefaultHead } from '~/utils'

useDefaultHead({ title: '制作', description: '正在`制作`制作...' })
</script>

<template>
  <IndexWrapper title="制作" to="/">
    <p index-sub-title>
      <span>正在制作`制作`... </span>
      <span index-route-tip>点击标题去到首页" </span>
    </p>
  </IndexWrapper>
</template>
