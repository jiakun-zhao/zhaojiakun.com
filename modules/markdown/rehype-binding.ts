import type { Root } from 'hast'
import { isUndefined } from '@jiakun-zhao/utils'
import { visit } from 'unist-util-visit'

export default function rehypeBinding() {
  return function (tree: Root) {
    visit(tree, 'element', (node, index, parent) => {
      if (isUndefined(index) || node.tagName !== 'binding')
        return
      parent?.children.splice(index, 1, { type: 'raw', value: `{{${node.properties.value}}}` })
    })
  }
}
