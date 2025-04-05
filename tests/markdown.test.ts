import { format } from 'prettier'
import { expect, it } from 'vitest'
import { transform } from '~/modules/markdown'

const markdown = `---
title: Test title
description: Test description
---
<!-- 

# 123

- [中文 Letter Spacing](/content/letter-spacing)

# [{{frontmatter.title}}](/)
# [heading]{.text-red data-light="Hello"}
[link](https://example.com){data-light="Hello"}
:p{class="tracking-0" slide-enter-count=2 v-text="frontmatter.description" style=";a=b ;;;;   ;;; ;;;;; "}

- item
- item
- item
- item

[Hello]{style="color:red;background:blue;"}

\`const a = HelloWorld\`
-->

\`\`\`typescript
const a = "HelloWorld"
    const a = "HelloWorld"
const a = "HelloWorld"
const a = "HelloWorld"
const a = "HelloWorld"
\`\`\`

`

const components = {
  a: 'ProseA',
  code: 'ProseCode',
  pre: 'ProsePre',
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
      slideEnterCount: 3,
    };
    useSeoMetaProxy({
      title: frontmatter.title,
      description: frontmatter.description,
    });
    </script>
    <template>
      <prose-pre
        class="shiki shiki-themes hi-theme"
        style="
          --slide-enter-step: 1;
          background-color: inherit;
          color: hsl(var(--shadcn-foreground));
        "
        tabindex="0"
        slide-enter
      >
        <pre><ProseCode><span class="line"><span style="color:hsl(var(--shadcn-foreground) / .46 )">const</span><span style="color:hsl(var(--shadcn-foreground))"> a </span><span style="color:hsl(var(--shadcn-foreground) / .46 )">=</span><span style="color:hsl(var(--shadcn-foreground) / .46 )"> "</span><span style="color:hsl(var(--shadcn-foreground))">HelloWorld</span><span style="color:hsl(var(--shadcn-foreground) / .46 )">"</span></span>
    <span class="line"><span style="color:hsl(var(--shadcn-foreground) / .46 )">    const</span><span style="color:hsl(var(--shadcn-foreground))"> a </span><span style="color:hsl(var(--shadcn-foreground) / .46 )">=</span><span style="color:hsl(var(--shadcn-foreground) / .46 )"> "</span><span style="color:hsl(var(--shadcn-foreground))">HelloWorld</span><span style="color:hsl(var(--shadcn-foreground) / .46 )">"</span></span>
    <span class="line"><span style="color:hsl(var(--shadcn-foreground) / .46 )">const</span><span style="color:hsl(var(--shadcn-foreground))"> a </span><span style="color:hsl(var(--shadcn-foreground) / .46 )">=</span><span style="color:hsl(var(--shadcn-foreground) / .46 )"> "</span><span style="color:hsl(var(--shadcn-foreground))">HelloWorld</span><span style="color:hsl(var(--shadcn-foreground) / .46 )">"</span></span>
    <span class="line"><span style="color:hsl(var(--shadcn-foreground) / .46 )">const</span><span style="color:hsl(var(--shadcn-foreground))"> a </span><span style="color:hsl(var(--shadcn-foreground) / .46 )">=</span><span style="color:hsl(var(--shadcn-foreground) / .46 )"> "</span><span style="color:hsl(var(--shadcn-foreground))">HelloWorld</span><span style="color:hsl(var(--shadcn-foreground) / .46 )">"</span></span>
    <span class="line"><span style="color:hsl(var(--shadcn-foreground) / .46 )">const</span><span style="color:hsl(var(--shadcn-foreground))"> a </span><span style="color:hsl(var(--shadcn-foreground) / .46 )">=</span><span style="color:hsl(var(--shadcn-foreground) / .46 )"> "</span><span style="color:hsl(var(--shadcn-foreground))">HelloWorld</span><span style="color:hsl(var(--shadcn-foreground) / .46 )">"</span></span></ProseCode></pre>
      </prose-pre>
    </template>
    "
  `)
})
