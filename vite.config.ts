import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import { readFileSync } from 'node:fs'
import { defineConfig } from 'vite'

import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import Pages from 'vite-plugin-pages'
import Markdown from 'vite-plugin-vue-markdown'

export default defineConfig({
  plugins: [
    Vue({ include: [/\.vue$/, /\.md$/] }),
    UnoCSS(),
    Markdown({
      wrapperClasses: null,
      transforms: { after: code => code.slice(5, -6) },
    }),
    Pages({
      extensions: ['vue', 'md'],
      dirs: [
        { dir: 'src/pages', baseRoute: '' },
        { dir: 'contents/posts', baseRoute: '/post' },
      ],
      extendRoute(route) {
        const component = route.component.slice(1)
        if (/^contents\/posts\/(.+)\.md$/.test(component)) {
          const path = resolve(__dirname, route.component.slice(1))
          const frontmatter = JSON.parse(readFileSync(`${path}.json`, 'utf-8'))
          route.meta = Object.assign(route.meta || {}, { frontmatter, isPost: true })
        }
        return route
      },
    }),
  ],
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url)),
      '@': fileURLToPath(new URL('./contents', import.meta.url)),
    },
  },
  publicDir: 'src/public',
  server: { host: true },
})
