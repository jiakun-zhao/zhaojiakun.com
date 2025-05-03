import cloudflare from '@astrojs/cloudflare'
import { defineConfig } from 'astro/config'
import unocss from 'unocss/astro'
import { name } from './package.json'

export default defineConfig({
  adapter: cloudflare({
    imageService: 'passthrough',
  }),
  build: {
    inlineStylesheets: 'never',
  },
  devToolbar: {
    enabled: false,
  },
  integrations: [
    unocss(),
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
