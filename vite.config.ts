import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import Markdown from './scripts/markdown'

export default defineConfig({
  plugins: [
    Vue({ include: [/(\.vue)$/, /\.md$/] }),
    UnoCSS(),
    Markdown(),
  ],
  server: { host: true },
  resolve: { alias: { '~': fileURLToPath(new URL('./src', import.meta.url)) } },
})
