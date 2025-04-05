import type { Root } from 'hast'
import type { VFile } from 'vfile'
import { notUndefined } from '@jiakun-zhao/utils'
import { h } from 'hastscript'
import { kebabCase } from 'scule'
import { visit } from 'unist-util-visit'

export default function rehypeComponents() {
  return function (tree: Root, vfile: VFile) {
    const components = vfile.data.components

    if (!components)
      return

    visit(tree, 'element', (node, index, parent) => {
      const tagName = node.tagName
      const componentName = components[tagName]

      if (
        tagName === 'pre'
        && notUndefined(componentName)
        && notUndefined(index)
        && notUndefined(parent)
      ) {
        const properties = node.properties
        node.properties = {}
        parent.children.splice(
          index,
          1,
          h(kebabCase(componentName), properties, node),
        )
        return
      }

      node.tagName = componentName ?? tagName
    })
  }
}
