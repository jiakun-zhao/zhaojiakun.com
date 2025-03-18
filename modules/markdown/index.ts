import type { NuxtPage } from 'nuxt/schema'
import type { TransformResult } from 'vite'
import { isArray, isBoolean, toArray } from '@jiakun-zhao/utils'
import rehypeShiki from '@shikijs/rehype'
import { addPrerenderRoutes, addVitePlugin, defineNuxtModule } from 'nuxt/kit'
import rehypeStringify from 'rehype-stringify'
import remarkMdc, { parseFrontMatter } from 'remark-mdc'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { joinURL, withLeadingSlash } from 'ufo'
import { unified } from 'unified'
import { createFilter } from 'vite'
import rehypeBinding from '~/modules/markdown/rehype-binding'
import rehypeComponents from '~/modules/markdown/rehype-components'
import rehypeSlideEnter from '~/modules/markdown/rehype-slide-enter'
import rehypeTracking from '~/modules/markdown/rehype-tracking'
import rehypeVue from '~/modules/markdown/rehype-vue'
import remarkAttr from '~/modules/markdown/remark-attr'
import remarkCode from '~/modules/markdown/remark-code'
import rehypeShikiOptions from '~/modules/markdown/shiki'

interface ModuleOptions {
  autoPrerender: boolean
  components: Record<string, string>
  extensions: string | string[]
  defaultLayout: string
}

interface TransformOptions {
  code: string
  path: string
  components?: ModuleOptions['components']
  layout?: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'markdown',
    configKey: 'markdown',
  },
  defaults: {
    autoPrerender: true,
    extensions: '.md',
    components: {},
  },
  setup(options, nuxt) {
    const extensions = toArray(options.extensions).map(it => it.replace(/^\.*/, ''))
    const filter = createFilter(new RegExp(`\\.(?:${extensions.join('|')})($|\\?)`))
    const rePattern = extensions.concat('vue').join('|')
    const reEnding = new RegExp(`\\.(?:${rePattern})$`)
    const reEndingOrQuery = new RegExp(`\\.(?:${rePattern})($|\\?)`)

    nuxt.options.extensions.push(...extensions.map(it => `.${it}`))
    nuxt.options.imports.transform ??= { include: [] }
    nuxt.options.imports.transform.include ??= []
    nuxt.options.imports.transform.include.push(reEnding)

    nuxt.options.vite ??= {}
    nuxt.options.vite.vue ??= {}
    nuxt.options.vite.vue.include = toArray(nuxt.options.vite.vue.include)
    nuxt.options.vite.vue.include.push(reEndingOrQuery)

    if (nuxt.options.components !== false) {
      if (isBoolean(nuxt.options.components)) {
        nuxt.options.components = { dirs: [] }
      } else if (isArray(nuxt.options.components)) {
        nuxt.options.components = { dirs: nuxt.options.components }
      }
      nuxt.options.components.transform ??= { include: [] }
      nuxt.options.components.transform.include ??= []
      nuxt.options.components.transform.include.push(reEnding)
    }

    if (options.autoPrerender) {
      nuxt.hooks.hook('pages:extend', (pages) => {
        const each = (pages: NuxtPage[], base: string = '') => pages.forEach((page) => {
          const route = withLeadingSlash(joinURL(base, page.path))
          const included = extensions.some(it => page.file?.endsWith(`.${it}`)) && /^[a-z0-9\-/]+$/i.test(route)
          included && addPrerenderRoutes(route)
          page.children?.length && each(page.children, route)
        })
        each(pages)
      })
    }

    addVitePlugin({
      name: 'vite-plugin-markdown',
      enforce: 'pre',
      transform(code, id) {
        if (filter(id)) {
          return transform({
            code,
            path: id,
            components: options.components,
            layout: options.defaultLayout,
          })
        }
      },
      handleHotUpdate(ctx) {
        if (!filter(ctx.file))
          return
        const defaultRead = ctx.read
        ctx.read = async function () {
          const { code } = await transform({
            code: await defaultRead(),
            path: ctx.file,
            components: options.components,
            layout: options.defaultLayout,
          })
          return code
        }
      },
    })
  },
})

export async function transform(options: TransformOptions): Promise<TransformResult> {
  const { code, path, layout, components } = options
  const { data, content: value } = parseFrontMatter(code)

  data.layout ??= layout
  Object.assign(data.components ??= {}, components)

  const result = await unified()
    .use(remarkParse)
    .use(remarkMdc)
    .use(remarkCode)
    .use(remarkAttr)
    .use(remarkRehype)
    .use(rehypeShiki, rehypeShikiOptions)
    .use(rehypeTracking)
    .use(rehypeBinding)
    .use(rehypeSlideEnter)
    .use(rehypeComponents)
    .use(rehypeVue)
    .use(rehypeStringify)
    .process({ value, data, path })

  return {
    code: result.value.toString(),
    map: {
      mappings: '',
    },
  }
}
