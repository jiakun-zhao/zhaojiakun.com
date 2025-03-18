import type { Root } from 'hast'
import type { VFile } from 'vfile'
import { visit } from 'unist-util-visit'

export default function rehypeComponents() {
  return function (tree: Root, vfile: VFile) {
    const components = vfile.data.components

    if (!components)
      return

    visit(tree, 'element', (node) => {
      node.tagName = components[node.tagName] ?? node.tagName
    })
  }
}
