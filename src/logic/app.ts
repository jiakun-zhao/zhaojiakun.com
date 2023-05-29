export const useApp = createGlobalState(() => {
  const route = useRoute()
  const isMenuShow = ref(false)
  const isPost = computed(() => route.path.startsWith('/post/'))
  const isIndex = computed(() => route.path === '/')

  const musicFromPage = ref<any>(null)
  const musicFromPlay = ref<any>(null)
  const musicElement = ref<HTMLMediaElement>()
  const musicControls = useMediaControls(musicElement, { src: () => musicFromPlay.value?.url })

  return {
    isPost,
    isIndex,
    isMenuShow,

    musicFromPage,
    musicFromPlay,
    musicElement,
    musicControls,
  }
})
