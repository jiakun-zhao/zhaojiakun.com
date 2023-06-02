import { join, parse } from 'node:path'
import { readFile } from 'node:fs/promises'
import type { Plugin } from 'vite'
import matter from 'gray-matter'
import glob from 'fast-glob'

const moduleName = 'virtual:posts'
const moduleId = `\0${moduleName}`

export default function (path = 'src/pages/posts'): Plugin {
  let root: string

  return {
    name: 'vite-plugin-posts',
    enforce: 'pre',
    configResolved(config) {
      root = config.root
    },
    resolveId: source => source === moduleName ? moduleId : null,
    async load(id) {
      if (id !== moduleId || !root)
        return

      const routes: string[] = []
      const files = await glob(join(root, path, '**/*.md'))

      for (const filePath of files) {
        const { name } = parse(filePath)

        // eslint-disable-next-line unused-imports/no-unused-vars
        const { data: { setup, ...meta } } = matter(
          await readFile(filePath, 'utf-8'),
        )

        const items = [
          `path: '/post/${name}'`,
          `name: 'post-${name}'`,
          `meta: ${JSON.stringify(meta)}`,
          `component: ()=>import('${filePath}')`,
        ]

        routes.push(`{${items}}`)
      }
      return `export default [${routes}]`
    },
  }
}
