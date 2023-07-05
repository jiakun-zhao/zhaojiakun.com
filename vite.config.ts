import { URL, fileURLToPath } from 'node:url'
import { readFileSync } from 'node:fs'
import { defineConfig } from 'vite'

import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import Pages from 'vite-plugin-pages'
import Markdown from 'vite-plugin-vue-markdown'
import Components from 'unplugin-vue-components/vite'

import MarkdownItShiki from 'markdown-it-shiki'
import matter from 'gray-matter'
import { presetAttributify, presetIcons, presetUno } from 'unocss'

export default defineConfig({
  server: { host: true },
  resolve: {
    alias: { '~': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  plugins: [
    Vue({
      include: [/(\.vue)$/, /\.md$/],
    }),

    Components({
      extensions: ['vue', 'md'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: 'src/components.d.ts',
    }),

    Pages({
      extensions: ['vue', 'md'],
      importMode: path => path.endsWith('pages/index.md') ? 'sync' : 'async',
      extendRoute(route) {
        if (route.component.endsWith('.md')) {
          const path = (route.component as string).slice(1)
          const fileContent = readFileSync(path, 'utf-8')
          route.meta = matter(fileContent).data
        }
        return route
      },
    }),

    Markdown({
      frontmatter: false,
      transforms: { before: code => matter(code).content },
      wrapperClasses: 'markdown-body tracking-wider mt-12 leading-7 text-#555 dark:text-#bbb',
      wrapperComponent: 'MarkdownWrapper',
      markdownItUses: [
        [MarkdownItShiki, {
          theme: {
            light: 'vitesse-light',
            dark: 'vitesse-dark',
          },
        }],
      ],
      markdownItSetup(md) {
        md.renderer.rules.link_open = (tokens, idx, options, _, self) => {
          tokens[idx].tag = 'A'
          return self.renderToken(tokens, idx, options)
        }
        md.renderer.rules.link_close = (tokens, idx, options, _, self) => {
          tokens[idx].tag = 'A'
          return self.renderToken(tokens, idx, options)
        }
        md.renderer.rules.image = (tokens, idx, options, _, self) => {
          const token = tokens[idx]
          if (token.content)
            token.attrSet('alt', token.content)
          return `<Image ${self.renderAttrs(token)} />`
        }
      },
    }),

    UnoCSS({
      presets: [
        presetUno({ dark: 'media' }),
        presetAttributify(),
        presetIcons({
          scale: 1.2,
          extraProperties: {
            'display': 'inline-block',
            'vertical-align': 'bottom',
          },
          autoInstall: true,
        }),
      ],
      theme: {
        colors: {
          accent: '#6054ba',
        },
      },
      shortcuts: [{
        'text-primary': 'text-[var(--text-primary)]',
        'text-secondary': 'text-[var(--text-secondary)]',
        'text-thirdly': 'text-[var(--text-thirdly)]',
        'bg-primary': 'bg-[var(--bg-primary)]',
        'bg-secondary': 'bg-[var(--bg-secondary)]',
        'bg-inline-code': 'bg-[var(--bg-inline-code)]',
        'border-primary': 'border-[var(--border-primary)]',
        'border-secondary': 'border-[var(--border-secondary)]',
      }, {
        'b-safe': 'pb-[constant(safe-area-inset-bottom)] pb-[env(safe-area-inset-bottom)]',
      }],
    }),
  ],
})
