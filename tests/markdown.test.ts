import { format } from 'prettier'
import { expect, it } from 'vitest'
import { transform } from '~/modules/markdown'

const markdown = `---
title: Test title
description: Test description
---

# 123

- [中文 Letter Spacing](/content/letter-spacing)

<!-- # [{{frontmatter.title}}](/)
# [heading]{.text-red data-light="Hello"}
[link](https://example.com){data-light="Hello"}
:p{class="tracking-0" slide-enter-count=2 v-text="frontmatter.description" style=";a=b ;;;;   ;;; ;;;;; "}

- item
- item
- item
- item

[Hello]{style="color:red;background:blue;"}

\`const a = HelloWorld\`

\`\`\`typescript
const a = "HelloWorld"
    const a = "HelloWorld"
const a = "HelloWorld"
const a = "HelloWorld"
const a = "HelloWorld"
\`\`\`

-->
`

const components = {
  a: 'ProseA',
  code: 'ProseCode',
}

it('markdown', async () => {
  const { code } = await transform({
    code: markdown,
    path: 'markdown.md',
    components,
  })

  const value = true ? await format(code, { parser: 'vue' }) : code

  expect(value).toMatchInlineSnapshot(`
    "<script setup>
    const frontmatter = {
      title: "Test title",
      description: "Test description",
      slideEnterCount: 4,
    };
    useSeoMetaProxy({
      title: frontmatter.title,
      description: frontmatter.description,
    });
    </script>
    <template>
      <h1 text-shadcn tracking-0 slide-enter style="--slide-enter-step: 1">123</h1>
      <ul>
        <li slide-enter style="--slide-enter-step: 2">
          <ProseA href="/content/letter-spacing"
            >中文<span tracking-0> Letter Spacing</span></ProseA
          >
        </li>
      </ul>
    </template>
    "
  `)
})
