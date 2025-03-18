import type { Root } from 'mdast'
import { isString, isUndefined, notUndefined } from '@jiakun-zhao/utils'
import rehypeStringify from 'rehype-stringify'
import remarkMdc, { parseFrontMatter } from 'remark-mdc'
import remarkMdx from 'remark-mdx'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import { visit } from 'unist-util-visit'
import { expect, it } from 'vitest'

const markdown = `---
title: Hello MDX
---

import Hello from '~unknown'

export const red = 1

<Hello> HelloWorld {1+1} </Hello>
<span text={red} bg="Hello" {...rest}>{1+1}</span>
`

it('mdx', async () => {
  const { content } = parseFrontMatter(markdown)
  const result = await unified()
    .use(remarkParse)
    .use(remarkMdc)
    .use(remarkMdx)
    .use(remarkMdxUtils)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(content)
  expect(result.value.toString()).toMatchInlineSnapshot(`
    "import Hello from '~unknown'
    export const red = 1
    <div> HelloWorld {{1+1}} </div>
    <span :text="red" bg="Hello" v-bind="rest">{{1+1}}</span>"
  `)
})

function remarkMdxUtils() {
  return function (tree: Root) {
    visit(tree, 'paragraph', (node, index, parent) => {
      if (node.children.length !== 1 || isUndefined(parent) || isUndefined(index))
        return
      const child = node.children[0]
      if (child.type !== 'mdxJsxTextElement')
        return
      parent.children.splice(index, 1, child)
    })

    visit(tree, 'mdxJsxFlowElement', (node) => {
      node.data ??= {}
      if (node.name) {
        node.data.hName = node.name
      }
      node.data.hProperties ??= {}
      node.attributes.forEach((it) => {
        if (it.type === 'mdxJsxAttribute') {
          if (isString(it.value)) {
            node.data!.hProperties![it.name] = it.value
          } else if (notUndefined(it.value)) {
            node.data!.hProperties![`:${it.name}`] = it.value?.value
          }
        } else if (it.type === 'mdxJsxExpressionAttribute') {
          node.data!.hProperties!['v-bind'] = it.value.slice(3)
        }
      })
    })

    visit(tree, 'mdxFlowExpression', (node, index, parent) => {
      if (isUndefined(index))
        return
      parent?.children.splice(index, 1, { type: 'text', value: `{{${node.value}}}` })
    })

    visit(tree, 'mdxTextExpression', (node, index, parent) => {
      if (isUndefined(index))
        return
      parent?.children.splice(index, 1, { type: 'text', value: `{{${node.value}}}` })
    })
  }
}
