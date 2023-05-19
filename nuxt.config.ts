export default defineNuxtConfig({
  modules: [
    '@nuxt/devtools',
    '@unocss/nuxt',
    '@vueuse/nuxt',
  ],
  app: {
    buildAssetsDir: 'assets',
    head: {
      title: 'Jiakun Zhao',
      htmlAttrs: { lang: 'en' },
      meta: [{ 'http-equiv': 'x-ua-compatible', 'content': 'IE=edge' }],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },
})
