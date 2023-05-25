<script lang="ts" setup>
import IndexWrapper from '~/components/IndexWrapper.vue'
import { useDefaultHead } from '~/utils'

useDefaultHead({ title: '404', description: '没找到网页呢' })
</script>

<template>
  <IndexWrapper title="404" to="/">
    <p index-sub-title>
      <span>没找到网页呢</span>
      <span index-route-tip>点击标题去到首页</span>
    </p>
  </IndexWrapper>
</template>
