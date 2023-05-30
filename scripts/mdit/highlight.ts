import type MarkdownIt from 'markdown-it'

export function MarkdownItHighlight(md: MarkdownIt) {
  md.options.highlight = (code, lang) => {
    return `<pre><MarkdownShiki lang="${lang}">${code}</MarkdownShiki></pre>`
  }
}
