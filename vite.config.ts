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

import type MarkdownIt from 'markdown-it'
import matter from 'gray-matter'

type SharpFn = (id: string, src: string | null) => { height: number; width: number; from: string; to: string } | null
const sharpFn: SharpFn = createSyncFn(createRequire(import.meta.url).resolve('./sharp'))
const douyinEmojis = readdirSync('src/public/assets/douyin-emoji')

export default defineConfig(viteEnv => ({
  plugins: [
    Vue({ include: [/\.vue$/, /\.md$/] }),
    UnoCSS(),
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
        MarkdownItHighlight,
        MarkdownItLinkTarget,
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
          return title ? `<figure>${imageStr}<figcaption>[ ${title} ]</figcaption></figure>` : imageStr
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
      dirs: 'contents',
      extendRoute(route) {
        const path = route.component.slice(1)
        const { data } = matter(readFileSync(path, 'utf-8'))
        route.meta = Object.assign(route.meta || {}, data)
        return route
      },
    }),
  ],
  publicDir: 'src/public',
  resolve: { alias: { '~': fileURLToPath(new URL('./src', import.meta.url)) } },
  server: { host: true },
}))

function MarkdownItLinkTarget(md: MarkdownIt) {
  md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    const href = token.attrGet('href')
    if (href && /^https?:\/\//.test(href))
      token.attrSet('target', '_blank')
    return self.renderToken(tokens, idx, options)
  }
}

function MarkdownItHighlight(md: MarkdownIt) {
  md.options.highlight = (code, lang) => {
    return `<pre><MarkdownShiki lang="${lang}">${code}</MarkdownShiki></pre>`
  }
}
