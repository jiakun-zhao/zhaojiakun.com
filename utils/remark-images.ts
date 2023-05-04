import { join } from 'node:path'
import { createRequire } from 'node:module'
import type { RemarkPlugin } from '@astrojs/markdown-remark'
import { visit } from 'unist-util-visit'
import { createSyncFn } from 'synckit'
import { isFileExist } from './fs'

export default function (): RemarkPlugin {
    return function () {
        return function (tree) {
            visit(tree, 'image', (node: any) => {
                const imgPath = join(process.cwd(), 'public', node.url)

                if (!isFileExist(imgPath))
                    return

                const require = createRequire(import.meta.url)
                const workerPath = require.resolve('./sharp-sync-metadata')
                const fn = createSyncFn(workerPath)
                const { width, height } = fn(imgPath)

                node.type = 'html'
                node.children = undefined
                node.value = `
                    <picture>
                        <source srcset="${node.url}.avif" type="image/avif">
                        <source srcset="${node.url}.webp" type="image/webp">
                        <img src="${node.url}" alt="${node.alt}" 
                            style="aspect-ratio: ${width}/${height}"
                            ${node.title ? `title="${node.title}"` : ''}
                        >
                    </picture>
                `
            })
        }
    }
}
