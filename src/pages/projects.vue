<script lang="ts" setup>
import IndexWrapper from '~/components/IndexWrapper.vue'
import IndexRouteTip from '~/components/IndexRouteTip.vue'

import { useDefaultHead } from '~/utils'

useDefaultHead({ title: '制作', description: '正在`制作`制作...' })
</script>

<template>
  <IndexWrapper title="制作" to="/">
    <p>正在`制作`制作... <IndexRouteTip msg="点击标题去到首页" /></p>
    <p>
      <RouterLink class="hover:text-accent! t2!" to="/">去首页把您</RouterLink>
    </p>
  </IndexWrapper>
</template>
