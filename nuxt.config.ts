/* eslint perfectionist/sort-objects: "error" */

export default defineNuxtConfig({
  app: {
    buildAssetsDir: '_assets',
    rootAttrs: {
      id: 'container',
    },
  },
  appConfig: {
    origin: 'https://zhaojiakun.com',
  },
  compatibilityDate: '2025-03-07',
  css: [
    '@fontsource-variable/geist',
    '@fontsource-variable/geist-mono',
    '~/assets/style.css',
  ],
  devtools: {
    enabled: true,
  },
  markdown: {
    components: {
      a: 'ProseA',
      code: 'ProseCode',
      ul: 'ProseUl',
    },
    defaultLayout: 'ProseContainer',
  },
  modules: [
    '@unocss/nuxt',
    '@vueuse/nuxt',
    'nitro-cloudflare-dev',
  ],
  nitro: {
    cloudflareDev: {
      environment: 'production',
      persistDir: '.wrangler',
    },
    errorHandler: '~/server/utils/error.ts',
    preset: 'cloudflare-pages',
  },
  routeRules: {
    '/_images': {
      headers: {
        'cache-control': 'public, max-age=31536000, immutable',
      },
    },
    '/404': {
      prerender: true,
    },
  },
  vite: {
    build: {
      cssMinify: 'lightningcss',
    },
  },
})
