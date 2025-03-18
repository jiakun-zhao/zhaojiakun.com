export const useDark = createGlobalState(() => {
  const themes = ['auto', 'dark', 'light'] as const
  const theme = ref<typeof themes[number]>('auto')
  const isPreferredDark = usePreferredDark()
  const isDark = computed(() => theme.value === 'auto' ? isPreferredDark.value : (theme.value === 'dark'))
  const toggle = () => theme.value = themes[themes.indexOf(theme.value) + 1] ?? themes[0]

  useHead(
    () => ({ meta: [{ name: 'theme-color', content: isDark.value ? '#050505' : '#ffffff' }] }),
    { mode: 'client' },
  )

  onMounted(() => {
    const html = document.documentElement
    watch(isDark, (value) => {
      html.classList.remove(...themes)
      html.classList.add(value ? 'dark' : 'light')
    })
  })

  return {
    isDark,
    isPreferredDark,
    toggle,
  }
})
