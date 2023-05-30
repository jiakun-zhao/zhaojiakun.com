import { readdirSync } from 'node:fs'
import type MarkdownIt from 'markdown-it'

const douyinEmojis = readdirSync('src/public/assets/douyin-emoji')

export function MarkdownItEmoji(md: MarkdownIt) {
  const defaultRenderCodeInline = md.renderer.rules.code_inline!
  md.renderer.rules.code_inline = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    if (douyinEmojis.includes(token.content))
      return `<img src="/assets/douyin-emoji/${token.content}" style="display:inline-block;width:1rem;vertical-align:sub;"/>`
    return defaultRenderCodeInline(tokens, idx, options, env, self)
  }
}
