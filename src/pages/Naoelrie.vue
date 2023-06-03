<script lang="ts" setup>
import DefaultLayout from '~/layouts/DefaultLayout.vue'
</script>

<template>
  <DefaultLayout :head="{ title: 'Naoelrie', description: 'My best friend.', ogImage: 'naoelrie.jpg' }">
    <template #subtitle>
      <p container-subtitle>My best friend.</p>
    </template>
    <template #article>
      <p>我最好的朋友，Naoelrie 是他许多社交平台的昵称，如果现实中你认识我想必也应该认识他。</p>
      <p>
        <span>这里有一份转载自他的推文：</span>
        <RouterLink to="/post/Naoelrie-TxYC3Dc5zUtMhJA-pHuSA">
          平淡日子里的刺
        </RouterLink>
      </p>

      <img
        src="/assets/images/naoelrie.jpg"
        alt="QrCode"
        mt-8 ml-1
      >
      <p>你可以在他的订阅号了解他。</p>
    </template>
  </DefaultLayout>
</template>
