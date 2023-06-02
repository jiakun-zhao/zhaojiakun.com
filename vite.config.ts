import { URL, fileURLToPath } from 'node:url'
import { readFileSync } from 'node:fs'
import { defineConfig } from 'vite'

import UnoCSS from 'unocss/vite'
import Pages from 'vite-plugin-pages'
import Solid from 'vite-plugin-solid'
import MDX from '@mdx-js/rollup'

import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'

import matter from 'gray-matter'

export default defineConfig({
  plugins: [
    MDX({
      jsxImportSource: 'solid-js/h',
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
    }),
    Solid(),
    UnoCSS(),
    Pages({
      extensions: ['md'],
      dirs: 'contents',
      extendRoute(route) {
        if (route.component.endsWith('.md')) {
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
