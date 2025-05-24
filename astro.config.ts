import cloudflare from '@astrojs/cloudflare'
import vue from '@astrojs/vue'
import { defineConfig } from 'astro/config'
import unocss from 'unocss/astro'
import { name } from './package.json'

export default defineConfig({
  adapter: cloudflare({
    imageService: 'passthrough',
    platformProxy: {
      enabled: true,
      environment: 'production',
    },
  }),
  build: {
    inlineStylesheets: 'never',
  },
  devToolbar: {
    enabled: false,
  },
  integrations: [
    unocss(),
    vue(),
  ],
  site: `https://${name}`,
  vite: {
    build: {
      cssMinify: 'lightningcss',
    },
    css: {
      transformer: 'lightningcss',
    },
  },
})
