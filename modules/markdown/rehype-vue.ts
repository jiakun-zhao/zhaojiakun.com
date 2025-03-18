import type { Root } from 'hast'
import type { VFile } from 'vfile'
import { h } from 'hastscript'
import { genObjectFromRaw } from 'knitwork'
import { kebabCase } from 'scule'

declare module 'vfile' {
  interface DataMap {
    title: string
    description: string

    layout: string
    styles: string[]
    scripts: string[]
    components: Record<string, string>
    meta: (typeof useSeoMeta extends (options: infer T) => void ? T : never) & { title?: string }
  }
}

export default function rehypeVue() {
  return function (tree: Root, vfile: VFile) {
    const { layout, scripts = [], styles = [], components, ...frontmatter } = vfile.data ?? {}

    tree.children = [
      h('template', layout
        ? h(kebabCase(layout), { ':frontmatter': true }, tree.children)
        : tree.children),
    ]

    const meta = frontmatter.meta ?? {}
    meta.title ??= 'frontmatter.title'
    meta.description ??= 'frontmatter.description'
    scripts.unshift(`useSeoMetaProxy(${genObjectFromRaw(meta)})`)
    scripts.unshift(`const frontmatter=${JSON.stringify(frontmatter)}`)

    styles.length && tree.children.push(h('style', styles.join('\n')))
    scripts.length && tree.children.unshift(h('script', { setup: true }, scripts.join('\n')))
    return tree
  }
}
