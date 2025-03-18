---
title: 中文 Letter Spacing
description: 单独设置文档里中文的 Letter Spacing。

part1: One's character is set at an early age, son. The choices you make now will affect you for the rest of your life. I hate to see you swim out so far you can't swim back.
part2: 一个人的性格是在童年时代养成的，孩子。你现在作出的选择将会影响你的一生。我不想看到你走得太远，却又无法收场。
part3: 摘自：怦然心动 - 第七章
---

### [{{frontmatter.title}}](/)

仅设置行间距不足以改善大段中文给人的那种密密麻麻一坨的呈现效果，一个理想的方案是将字间距设置到 `0.05em` 左右，不过会导致的另一个问题是英文的显示效果，例如我通常会选择的 [Geist](https://vercel.com/font) 字体。

这是一段 `letter-spacing=0.05em` 的英文：
[{{frontmatter.part1}}]{class="tracking-wider"}

这是一段 `letter-spacing=0` 的中文：
[{{frontmatter.part2}}]{class="tracking-0"}

<!-- 
这个页面使用 [Astro](https://astro.build) 构建，它内置由 [remark](https://remark.js.org/) 提供的 [Markdown](https://docs.astro.build/en/guides/markdown-content/) 的解析和处理工具。大致的处理流程是：[Markdown](https://daringfireball.net/projects/markdown/) -> [mdast](https://github.com/syntax-tree/mdast) -> [hast](https://github.com/syntax-tree/hast) -> [HTML](https://developer.mozilla.org/docs/Web/HTML) -> [Astro](https://docs.astro.build/en/basics/astro-pages/#markdownmdx-pages) 。
-->

单独为中英文设置不同的 `letter-spacing` 属性并手动完成这件事是非常残忍的，当然也没人会在 [Markdown](https://daringfireball.net/projects/markdown/) 中这么做，不过幸好我们还是可以编写插件；这里要做的是在 [hast](https://github.com/syntax-tree/hast) 中添加插件，[遍历](https://github.com/syntax-tree/unist-util-visit)节点，当一个[元素](https://github.com/syntax-tree/hast?tab=readme-ov-file#element)节点中的文本内容完全为英文或字符时为该[节点](https://github.com/syntax-tree/unist?tab=readme-ov-file#node)添加[样式](https://github.com/syntax-tree/hast?tab=readme-ov-file#properties)，否则解析[子节点](https://github.com/syntax-tree/hast?tab=readme-ov-file#parent)并重复以上工作，最终当节点是混合了中英文的[文本](https://github.com/syntax-tree/hast?tab=readme-ov-file#text)节点时，将节点拆成[文本节点](https://github.com/syntax-tree/hast?tab=readme-ov-file#text)+[元素节点](https://github.com/syntax-tree/hast?tab=readme-ov-file#element)的组合，拆分工作可由正则表达式的 Groups 快速达成。

另外，对于如何判断字符是中文还是英文这件事的处理。起初想到的是使用比较通用的正则去匹配，后来注意到我正在使用的 `@fontsource-variable/geist` 提供了 unicode 的范围，让它进入正则就可以获得比较完美的匹配了。

最后设置整体的 `letter-spacing` 属性，子节点将被插件覆盖：

:p{class="tracking-0" v-text="frontmatter.part1"}

:p{v-text="frontmatter.part2"}

:p{class="text-right" v-text="frontmatter.part3"}