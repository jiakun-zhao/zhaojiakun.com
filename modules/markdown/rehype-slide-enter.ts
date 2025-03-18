import type { ElementContent, Root, RootContent } from 'hast'
import type { VFile } from 'vfile'
import { isNumber, isString, toArray } from '@jiakun-zhao/utils'

declare module 'vfile' {
  interface DataMap {
    slideEnterCount: number
  }
}

function slideEnter(nodes: (Root | RootContent | ElementContent)[], step: number = 1) {
  for (const node of nodes) {
    if (node.type !== 'element' && node.type !== 'root')
      continue
    if (node.type === 'root' || node.tagName === 'ul') {
      step = slideEnter(node.children, step)
      continue
    }
    const count = node.properties['slide-enter-count']
    if (isNumber(count) || (isString(count) && /^\d+$/.test(count))) {
      delete node.properties['slide-enter-count']
      node.properties['slide-enter-step'] = step
      step += (+count)
      continue
    }
    node.properties['slide-enter'] = true
    node.properties.style = toArray(node.properties.style).filter(isString).join(';')
    node.properties.style = `--slide-enter-step:${step};${node.properties.style}`
    step++
  }
  return step
}

export default function rehypeSlideEnter() {
  return function (tree: Root, vfile: VFile) {
    vfile.data ??= {}
    vfile.data.slideEnterCount = slideEnter(tree.children) + 1
  }
}
