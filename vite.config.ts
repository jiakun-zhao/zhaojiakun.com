import { fileURLToPath } from 'node:url'
import { relative, resolve } from 'node:path'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { defineConfig } from 'vite'
import { createSyncFn } from 'synckit'

import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import Pages from 'vite-plugin-pages'
import Markdown from 'vite-plugin-vue-markdown'

type SharpFn = (id: string, src: string | null) => { height: number; width: number; from: string; to: string } | null
const sharpFnPath = createRequire(import.meta.url).resolve('./sharp')
const sharpFn: SharpFn = createSyncFn(sharpFnPath)

export default defineConfig(viteEnv => ({
  plugins: [
    Vue({ include: [/\.vue$/, /\.md$/] }),
    UnoCSS(),
    Markdown({
      wrapperClasses: null,
      transforms: { after: code => code.slice(5, -6) },
      markdownItSetup(md) {
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
          return self.renderToken(tokens, idx, options)
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
}))
