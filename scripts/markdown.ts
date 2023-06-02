import type { Plugin } from 'vite'

import MarkdownIt from 'markdown-it'
import matter from 'gray-matter'

const md = new MarkdownIt({ html: true })

export default function (): Plugin {
  return {
    name: 'vite-plugin-markdown',
    enforce: 'pre',
    transform(code, id) {
      if (!id.endsWith('.md'))
        return
      const { data, content } = matter(code)
      const lines = [
        `<script lang="ts" setup>${data.setup ?? ''}</script>`,
        `<template>${md.render(content)}</template>`,
      ]
      return lines.join('\n')
    },
  }
}
