import { createRequire } from 'node:module'
import { relative } from 'node:path'
import type MarkdownIt from 'markdown-it'
import { createSyncFn } from 'synckit'

const sharpFn: (id: string, src: string | null) => { height: number; width: number; from: string; to: string } | null
 = createSyncFn(createRequire(import.meta.url).resolve('../sharp'))

export function MarkdownItImage(md: MarkdownIt) {
  md.renderer.rules.image = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    const metadata = sharpFn(env.id, token.attrGet('src'))
    if (metadata) {
      const { width, height, from, to } = metadata
      token.attrSet('style', `aspect-ratio:${width}/${height}`)
      token.attrSet('src', process.env.NODE_ENV !== 'development' ? to : relative(from, to))
    }
    token.attrSet('alt', token.content)
    token.attrSet('loading', 'lazy')
    const imageStr = self.renderToken(tokens, idx, options)
    const title = token.attrGet('title')
    return title ? `<figure>${imageStr}<figcaption>[ ${title} ]</figcaption></figure>` : imageStr
  }
}
