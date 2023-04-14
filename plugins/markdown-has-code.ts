import type { RemarkPlugin } from '@astrojs/markdown-remark'
import { visit } from 'unist-util-visit'

export default function (): RemarkPlugin {
    return function () {
        return function (tree: any, vFile: any) {
            visit(tree, 'code', () => {
                const astro: any = vFile.data.astro || (vFile.data.astro = {})
                const frontmatter: any = astro.frontmatter || (astro.frontmatter = {})
                frontmatter.hasCode = true
            })
        }
    }
}
