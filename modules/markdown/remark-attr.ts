import type { Root } from 'mdast'
import { visit } from 'unist-util-visit'

// @unocss-include

export default function remarkAttr() {
  return function (tree: Root) {
    visit(tree, (node) => {
      node.data ??= {}
      node.data.hProperties ??= {}
      // @ts-expect-error missing type
      Object.assign(node.data.hProperties, node.attributes ?? {})

      if (node.type === 'heading') {
        node.data.hProperties['text-shadcn'] = true
      }
    })
  }
}
