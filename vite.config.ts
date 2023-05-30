import { URL, fileURLToPath } from 'node:url'
import { readFileSync } from 'node:fs'
import { defineConfig } from 'vite'

import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import Pages from 'vite-plugin-pages'
import Markdown from 'vite-plugin-vue-markdown'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

import matter from 'gray-matter'
import { MarkdownItEmoji, MarkdownItHighlight, MarkdownItImage, MarkdownItLink } from './scripts/mdit'

export default defineConfig({
  publicDir: 'src/public',
  server: { host: true },
  resolve: { alias: { '~': fileURLToPath(new URL('./src', import.meta.url)) } },
  plugins: [
    Vue({ include: [/\.vue$/, /\.md$/] }),
    UnoCSS({
      configFile: './scripts/uno.config.ts',
    }),
    AutoImport({
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/, /\.ts$/],
      imports: ['vue', 'vue-router', '@vueuse/core', '@vueuse/head'],
      dts: './src/auto-imports.d.ts',
    }),
    Components({
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: './src/components.d.ts',
    }),
    Markdown({
      wrapperClasses: null,
      transforms: { after: code => code.slice(5, -6) },
      markdownItUses: [
        MarkdownItImage,
        MarkdownItHighlight,
        MarkdownItLink,
        MarkdownItEmoji,
      ],
    }),
    Pages({
      extensions: ['vue', 'md'],
      dirs: 'contents',
      extendRoute(route) {
        if (route.component.endsWith('.md')) {
          const path = route.component.slice(1)
          const { data } = matter(readFileSync(path, 'utf-8'))
          route.meta = Object.assign(route.meta || {}, checkRouteMeta(route, data))
        }
        return route
      },
    }),
  ],
})

function checkRouteMeta(route: any, data: any) {
  if (route.path.startsWith('/post/')) {
    if (!data.date)
      throw new Error(`Missing date in ${route.path}`)
    if (data.title.startsWith('0x') && !data.description)
      throw new Error(`Missing description in ${route.path}`)
  }
  return data
}
