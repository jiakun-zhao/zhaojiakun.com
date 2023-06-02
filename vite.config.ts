import { URL, fileURLToPath } from 'node:url'
import { readFileSync } from 'node:fs'
import type { Plugin } from 'vite'
import { defineConfig } from 'vite'
import matter from 'gray-matter'

import UnoCSS from 'unocss/vite'
import Solid from 'vite-plugin-solid'
import MDX from '@mdx-js/rollup'
import Pages from 'vite-plugin-pages'

export default defineConfig({
  plugins: [
    Markdown(),
    MDX({
      jsxImportSource: 'solid-js/h',
    }),
    Solid(),
    UnoCSS(),
    Pages({
      extensions: ['vue', 'md'],
      dirs: [
        { dir: 'src/assets/posts', baseRoute: '/post' },
      ],
      extendRoute(route) {
        if (route.component?.endsWith('.md')) {
          const path = route.component.slice(1)
          const { data } = matter(readFileSync(path, 'utf-8'))
          route.meta = Object.assign(route.meta || {}, data)
        }
        return route
      },
    }),
  ],
  server: { host: true },
  resolve: { alias: { '~': fileURLToPath(new URL('./src', import.meta.url)) } },
})

function Markdown(): Plugin {
  return {
    name: 'vite-plugin-markdown',
    enforce: 'pre',
    transform(code, id) {
      if (id.endsWith('.md'))
        return matter(code).content
    },
  }
}
