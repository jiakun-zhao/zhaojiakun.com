---
title: 记：Vite + Solid + MDX
description: 在 Vite + Solid 中使用 MDX，主要是环境搭建。
date: 2023-05-30 22:58:12
---

### 依赖

```bash
ni solid-js
ni -D vite vite-plugin-solid
ni -D @mdx-js/rollup @types/mdx
ni -D remark-frontmatter remark-mdx-frontmatter
```

### vite.config.ts

```ts
import { defineConfig } from 'vite'
import Solid from 'vite-plugin-solid'
import MDX from '@mdx-js/rollup'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'

export default defineConfig({
  plugins: [
    MDX({
      jsxImportSource: 'solid-js/h', // 此并不是 tsconfig.json 中的 jsxImportSource
      remarkPlugins: [
        remarkFrontmatter,
        remarkMdxFrontmatter, // 解析 frontmatter, 两都要
      ],
    }),
    Solid(), // MDX 的引入必须在 Solid 之前
  ],
})
```

### tsconfig.json

增加 MDX 的类型，用于 `*.mdx` 引入的支持。

```diff
-  "types": ["vite/client"],
+  "types": ["vite/client", "mdx"],
```

### shims.d.ts

在 `@types/mdx` 中并不会提供 `frontmatter` 的类型，需手动增加。

```ts
declare module '*.mdx' {
  export const frontmatter: any
}
```

### 其他

- [Components | MDX](https://mdxjs.com/table-of-components/)