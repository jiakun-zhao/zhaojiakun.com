import type MarkdownIt from 'markdown-it'

export function MarkdownItLink(md: MarkdownIt) {
  md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    const href = token.attrGet('href')
    if (href && /^https?:\/\//.test(href))
      token.attrSet('target', '_blank')
    return self.renderToken(tokens, idx, options)
  }
}
