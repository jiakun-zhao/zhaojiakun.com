import type { Plugin } from 'vite'

import MarkdownIt from 'markdown-it'
import Shiki from 'markdown-it-shiki'
import matter from 'gray-matter'

const md = new MarkdownIt({ html: true }).use(Shiki, {
  theme: {
    light: 'vitesse-light',
    dark: 'vitesse-dark',
  },
  highlightLines: true,
})

md.renderer.rules.image = (tokens, idx, options, env, self) => {
  const token = tokens[idx]
  token.attrSet('alt', token.content)
  return `<MarkdownImage ${self.renderAttrs(token)} />`
}

md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
  const [open, text, close] = tokens.slice(idx, idx + 3)
  const href = open.attrGet('href')
  if (href && open.type === 'link_open' && text.type === 'text' && close.type === 'link_close')
    close.tag = open.tag = 'MarkdownLink'
  return self.renderToken(tokens, idx, options)
}

export default function (): Plugin {
  return {
    name: 'vite-plugin-markdown',
    enforce: 'pre',
    transform(code, id) {
      if (!id.endsWith('.md'))
        return
      const { data, content } = matter(code)
      return `
        <script lang="ts" setup>
        ${data.setup ?? ''}
        </script>
        <template>
          <PostWrapper>
            ${md.render(content)}
          </PostWrapper>
        </template>
      `
    },
  }
}
