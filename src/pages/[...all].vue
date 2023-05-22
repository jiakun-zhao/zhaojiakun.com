<script lang="ts" setup>
import IndexRouteTip from '~/components/IndexRouteTip.vue'
import IndexWrapper from '~/components/IndexWrapper.vue'
import { useDefaultHead } from '~/utils'

useDefaultHead({ title: '404', description: '没找到网页呢~' })
</script>

<template>
  <IndexWrapper title="404" to="/">
    <p>
      <span>没找到网页呢</span>
      <IndexRouteTip msg="点击标题去到首页" />
    </p>
  </IndexWrapper>
</template>
