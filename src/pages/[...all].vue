<script lang="ts" setup>
import IndexWrapper from '~/components/IndexWrapper.vue'
import { useDefaultHead } from '~/utils'

useDefaultHead({ title: '404', description: '没找到网页呢~' })
</script>

<template>
  <IndexWrapper>
    <h3>404</h3>
    <p>
      <span>没找到网页呢，请试试</span>
      <RouterLink mx1 to="../">../</RouterLink>
    </p>
  </IndexWrapper>
</template>
