<script lang="ts" setup>
import { useRouter } from 'vue-router'
import Navigation from './components/Navigation.vue'
import { isMenuShow } from '~/composables'

const router = useRouter()
router.beforeEach((to, from, next) => {
  isMenuShow.value = false
  next()
})
</script>

<template>
  <RouterView />
  <Transition name="fade">
    <article
      v-if="isMenuShow"
      fixed top-0 right-0 bottom-0 left-0 z-2147483646
      backdrop="filter blur-24px"
      bg-white:50 dark:bg-black:50
      @click="isMenuShow = false"
    >
      <div container py-16 max-h-full of-y-auto>
        <Navigation />
      </div>
    </article>
  </Transition>
</template>
