import { fileURLToPath } from 'node:url'
import { readFileSync, readdirSync } from 'node:fs'
import { createRequire } from 'node:module'
import { relative } from 'node:path'
import { defineConfig } from 'vite'
import { createSyncFn } from 'synckit'

import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import Pages from 'vite-plugin-pages'
import Markdown from 'vite-plugin-vue-markdown'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import MarkdownItLinkAttributes from 'markdown-it-link-attributes'

import matter from 'gray-matter'

type SharpFn = (id: string, src: string | null) => { height: number; width: number; from: string; to: string } | null
const sharpFnPath = createRequire(import.meta.url).resolve('./sharp')
const sharpFn: SharpFn = createSyncFn(sharpFnPath)
const douyinEmojis = readdirSync('src/public/assets/douyin-emoji')

export default defineConfig(viteEnv => ({
  plugins: [
    Vue({ include: [/\.vue$/, /\.md$/] }),
    UnoCSS(),
    AutoImport({
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/, /\.ts$/],
      imports: ['vue', 'vue-router', '@vueuse/core', '@vueuse/head'],
      dirs: ['./src/logic'],
      dts: true,
    }),
    Components({ dts: true, include: [/\.vue$/, /\.vue\?vue/, /\.md$/] }),
    Markdown({
      wrapperClasses: null,
      transforms: { after: code => code.slice(5, -6) },
      markdownItOptions: {
        highlight: (code, lang) => `<pre><MarkdownShiki lang="${lang}">${code}</MarkdownShiki></pre>`,
      },
      markdownItUses: [
        [
          MarkdownItLinkAttributes,
          {
            matcher: (link: string) => /^https?:\/\//.test(link),
            attrs: { target: '_blank' },
          },
        ],
      ],
      markdownItSetup(md) {
        // Image Auto Compression
        md.renderer.rules.image = (tokens, idx, options, env, self) => {
          const token = tokens[idx]
          const metadata = sharpFn(env.id, token.attrGet('src'))
          if (metadata) {
            const { width, height, from, to } = metadata
            token.attrSet('style', `aspect-ratio:${width}/${height}`)
            token.attrSet('src', viteEnv.mode === 'production' ? to : relative(from, to))
          }
          token.attrSet('alt', token.content)
          token.attrSet('loading', 'lazy')
          const imageStr = self.renderToken(tokens, idx, options)
          const title = token.attrGet('title')
          return title
            ? `<figure>${imageStr}<figcaption>[ ${title} ]</figcaption></figure>`
            : imageStr
        }
        // TODO: Douyin Emoji
        const defaultRenderCodeInline = md.renderer.rules.code_inline!
        md.renderer.rules.code_inline = (tokens, idx, options, env, self) => {
          const token = tokens[idx]
          if (douyinEmojis.includes(token.content))
            return `<img src="/assets/douyin-emoji/${token.content}" style="display:inline-block;width:1rem;vertical-align:sub;"/>`
          return defaultRenderCodeInline(tokens, idx, options, env, self)
        }
      },
    }),
    Pages({
      extensions: ['vue', 'md'],
      dirs: [
        { dir: 'src/pages', baseRoute: '' },
        { dir: 'contents/posts', baseRoute: '/post' },
        { dir: 'contents/notes', baseRoute: '/note' },
      ],
      extendRoute(route) {
        const match = route.component.match(/^\/(contents\/(.+)\/.+\.md)$/)
        if (match) {
          const { data } = matter(readFileSync(match[1], 'utf-8'))
          route.meta = Object.assign(route.meta || {}, { ...data, type: match[2] })
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
}))
