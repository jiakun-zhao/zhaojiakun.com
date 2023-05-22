<script lang="ts" setup>
import { useDefaultHead } from '~/utils'
import naoelrie from '~/assets/naoelrie.jpg'
import IndexWrapper from '~/components/IndexWrapper.vue'

useDefaultHead({ title: 'Naoelrie', description: 'Naoelrie info.' })
</script>

<template>
  <IndexWrapper title="Naoelrie" to="/">
    <p>
      我最好的朋友，<strong>Naoelrie</strong> 是他许多社交平台的昵称，如果现实中你认识我想必也应该认识他。
    </p>
    <p>
      出于隐私，你可以在他的订阅号了解他。
    </p>
    <img mt-12 :src="naoelrie" alt="QrCode">
  </IndexWrapper>
</template>
