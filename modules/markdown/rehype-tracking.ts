import type { Element, Parent, Root, Text } from 'hast'
import unicode from '@fontsource-variable/geist/unicode.json'
import { isUndefined, notNullish } from '@jiakun-zhao/utils'
import { toString as stringify } from 'hast-util-to-string'
import { h } from 'hastscript'
import { modifyChildren } from 'unist-util-modify-children'
import { SKIP, visit } from 'unist-util-visit'

declare module 'hast' {
  interface Data {
    __tracking_skip__?: boolean
  }
}

function skip(node: Element | Text, tracking: boolean = true) {
  if (node.type === 'element' && tracking) {
    node.properties['tracking-0'] = true
  }
  node.data ??= {}
  node.data.__tracking_skip__ = true
  return SKIP
}

export default function rehypeTracking() {
  const pattern = Object.values(unicode).join().replaceAll('U+', '\\u').replaceAll('-', '-\\u').split(',').join('|')
  const reGeist = new RegExp(`^[${pattern}]+$`, 'u')
  const reGroup = new RegExp(`(?<geist>[${pattern}]+)|([^${pattern}]+)`, 'g')

  const modify = modifyChildren<Parent>((node, index, parent) => {
    if (node.type !== 'text' || node.data?.__tracking_skip__ || /^\s*$/.test(node.value))
      return
    const elements = Array.from(node.value.matchAll(reGroup))
      .map((it) => {
        const value = it[0]
        const notGeist = isUndefined(it.groups?.geist) || /^\s*$/.test(value)
        const n = notGeist
          ? { type: 'text', value } as Text
          : h('span', { 'tracking-0': true }, value)
        n.data = { __tracking_skip__: true }
        return n
      })
      .filter(notNullish)
    parent.children.splice(index, 1, ...elements)
  })

  return function (tree: Root) {
    visit(tree, 'element', (node) => {
      if (node.data?.__tracking_skip__)
        return SKIP

      if (['pre', 'code'].includes(node.tagName))
        return skip(node, false)

      if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(node.tagName) || reGeist.test(stringify(node)))
        return skip(node)

      modify(node)
    })
  }
}
