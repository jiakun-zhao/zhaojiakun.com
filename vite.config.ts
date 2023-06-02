import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import Markdown from './scripts/markdown'
import Posts from './scripts/posts'

export default defineConfig({
  plugins: [
    Vue({ include: [/(\.vue)$/, /\.md$/] }),
    UnoCSS(),
    Markdown(),
    Posts(),
  ],
  server: { host: true },
  resolve: { alias: { '~': fileURLToPath(new URL('./src', import.meta.url)) } },
})
