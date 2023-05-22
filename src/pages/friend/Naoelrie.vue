<script lang="ts" setup>
import { useDefaultHead } from '~/utils'
import naoelrie from '~/assets/naoelrie.jpg'
import IndexWrapper from '~/components/IndexWrapper.vue'

useDefaultHead({ title: 'Naoelrie', description: 'Naoelrie info.' })
</script>

<template>
  <IndexWrapper title="Naoelrie" to="/">
    <p>我最好的朋友，<strong>Naoelrie</strong> 是他许多社交平台的昵称，如果现实中你认识我想必也应该认识他。</p>
    <p>
      <span>这里有一份转载自他的推文：</span>
      <RouterLink to="/post/naoelrie-txyc3dc5zutmhja-phusa">平淡日子里的刺</RouterLink>
    </p>
    <p>你可以在他的订阅号了解他。</p>
    <img :src="naoelrie" alt="QrCode">
  </IndexWrapper>
</template>
