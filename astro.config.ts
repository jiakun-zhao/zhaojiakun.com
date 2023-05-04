import { fileURLToPath } from 'node:url'
import { readFile, writeFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { join } from 'node:path'
import type { AstroIntegration } from 'astro'
import type { RemarkPlugin } from '@astrojs/markdown-remark'
import { defineConfig } from 'astro/config'
import { visit } from 'unist-util-visit'
import { minify } from 'html-minifier'
import glob from 'fast-glob'
import cssnano from 'cssnano'
import autoprefixer from 'autoprefixer'
import { createSyncFn } from 'synckit'
import { IMAGE_ROUTE_PATH, IMAGE_SAVE_PATH } from './src/config'
import iife from './utils/vite-plugin-iife'

export default defineConfig({
    site: 'https://zhaojiakun.com',
    build: {
        assets: 'assets',
    },
    server: {
        host: true,
    },
    integrations: [htmlMinify()],
    markdown: {
        syntaxHighlight: false,
        remarkPlugins: [remarkLinkTarget(), remarkImage(), remarkTab()],
    },
    vite: {
        optimizeDeps: { exclude: ['fsevents'] },
        build: { assetsInlineLimit: 0 },
        css: { postcss: { plugins: [autoprefixer(), cssnano()] } },
        plugins: [iife()],
    },
})

function htmlMinify(): AstroIntegration {
    return {
        name: 'astro-html-minifier',
        hooks: {
            'astro:build:done': async ({ dir }) => {
                const path = fileURLToPath(dir)
                for (const filePath of await glob(`${path}/**/*.html`)) {
                    const html = await readFile(filePath, 'utf-8')
                    const minified = minify(html, {
                        removeComments: true,
                        removeAttributeQuotes: true,
                        collapseWhitespace: true,
                        minifyJS: true,
                        minifyCSS: true,
                    })
                    await writeFile(filePath, minified)
                }
            },
        },
    }
}

function remarkLinkTarget(): RemarkPlugin {
    return function () {
        return function (tree) {
            visit(tree, 'link', (node) => {
                if (node.url.startsWith('http')) {
                    const data = node.data || (node.data = {})
                    const props: any = data.hProperties || (data.hProperties = {})
                    props.target = '_blank'
                }
            })
        }
    }
}

function remarkImage(): RemarkPlugin {
    return function () {
        return function (tree) {
            visit(tree, 'image', (node: any) => {
                if (!node.url.startsWith(`${IMAGE_ROUTE_PATH}/@`))
                    return

                const require = createRequire(import.meta.url)
                const workerPath = require.resolve('./utils/sharp-sync-metadata')
                const fn = createSyncFn(workerPath)

                const imgPath = join(process.cwd(), IMAGE_SAVE_PATH, node.url.replace(`${IMAGE_ROUTE_PATH}/`, ''))
                const { width, height } = fn(imgPath)

                node.type = 'html'
                node.children = undefined
                node.value = `
                    <picture>
                        <source srcset="${node.url}.avif" type="image/avif">
                        <source srcset="${node.url}.webp" type="image/webp">
                        <img 
                            src="${node.url}" 
                            alt="${node.alt}" 
                            style="aspect-ratio: ${width}/${height}"
                            ${node.title ? `title="${node.title}"` : ''}
                        >
                    </picture>
                `
            })
        }
    }
}

function remarkTab(): RemarkPlugin {
    return function () {
        return function (tree) {
            visit(tree, 'paragraph', (node) => {
                if (node.children[0]?.type === 'text' && node.children[0]?.value.startsWith('\\t ')) {
                    const data = node.data || (node.data = {})
                    const props: any = data.hProperties || (data.hProperties = {})
                    props.style = 'text-indent: 2em;'
                    node.children[0].value = node.children[0].value.replace('\\t ', '')
                }
            })
        }
    }
}
