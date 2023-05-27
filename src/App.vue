<script lang="ts" setup>
useHead(() => ({
  meta: [{ name: 'theme-color', content: isDark.value ? '#111111' : '#ffffff' }],
}))

const isLoadIconShow = ref(true)
const router = useRouter()
router.beforeEach((to, from, next) => {
  isLoadIconShow.value = true
  next()
})
router.afterEach(() => {
  isLoadIconShow.value = false
})
</script>

<template>
  <div
    v-show="isLoadIconShow"
    animate-fade-in i-svg-spinners:90-ring-with-bg
    fixed top-4 right-4 z-2147483647
  ></div>
  <RouterView />
</template>
