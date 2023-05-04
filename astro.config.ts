import { createRequire } from 'node:module'
import { join } from 'node:path'
import type { RemarkPlugin } from '@astrojs/markdown-remark'
import { defineConfig } from 'astro/config'
import { visit } from 'unist-util-visit'
import cssnano from 'cssnano'
import autoprefixer from 'autoprefixer'
import { createSyncFn } from 'synckit'
import { IMAGE_ROUTE_PATH, IMAGE_SAVE_PATH } from './src/config'

import iife from './utils/vite-plugin-iife'
import htmlMinify from './utils/astro-html-minify'
import remarkLinkTarget from './utils/remark-link-target'
import remarkTab from './utils/remark-tab'

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
