import type { Root } from 'mdast'
import { visit } from 'unist-util-visit'

export default function remarkCode() {
  return async function (tree: Root) {
    visit(tree, ['code', 'inlineCode'], (node) => {
      node.data ??= {}
      node.data.hProperties ??= {}
      node.data.hProperties.type = node.type
    })
  }
}
