import { fileURLToPath } from 'node:url'
import { relative, resolve } from 'node:path'
import { readFileSync, readdirSync } from 'node:fs'
import { createRequire } from 'node:module'
import { defineConfig } from 'vite'
import { createSyncFn } from 'synckit'

import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import Pages from 'vite-plugin-pages'
import Markdown from 'vite-plugin-vue-markdown'

import { BUNDLED_LANGUAGES } from 'shiki'
import matter from 'gray-matter'

type SharpFn = (id: string, src: string | null) => { height: number; width: number; from: string; to: string } | null
const sharpFnPath = createRequire(import.meta.url).resolve('./sharp')
const sharpFn: SharpFn = createSyncFn(sharpFnPath)
const shikiLangs = BUNDLED_LANGUAGES.map(({ id, aliases }) => [id, ...(aliases ?? [])]).flat()
const douyinEmojis = readdirSync('src/public/assets/douyin-emoji')

export default defineConfig(viteEnv => ({
  plugins: [
    Vue({ include: [/\.vue$/, /\.md$/] }),
    UnoCSS(),
    Markdown({
      wrapperClasses: null,
      transforms: { after: code => code.slice(5, -6) },
      markdownItOptions: {
        highlight(str, lang) {
          const attr = shikiLangs.includes(lang) ? ` v-shiki data-language="${lang}"` : ''
          return `<pre${attr}><code>${str}</code></pre>`
        },
      },
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
          if (token.attrGet('title'))
            token.attrSet('v-image-figure', '')

          token.attrSet('alt', token.content)
          token.attrSet('loading', 'lazy')
          return self.renderToken(tokens, idx, options)
        }
        // External Link
        md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
          if (tokens[idx].attrGet('href')?.startsWith('http'))
            tokens[idx].attrSet('target', '_blank')
          return self.renderToken(tokens, idx, options)
        }
        // Douyin Emoji
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
      ],
      extendRoute(route) {
        const component: string = route.component.slice(1)
        if (component.startsWith('contents/posts/') && component.endsWith('.md')) {
          const md = readFileSync(resolve(__dirname, component), 'utf-8')
          const { data } = matter(md)
          route.meta = Object.assign(route.meta || {}, { frontmatter: data, isPost: true })
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
