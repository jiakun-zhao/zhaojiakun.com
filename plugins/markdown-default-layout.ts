import type { RemarkPlugin } from '@astrojs/markdown-remark'

export default function (): RemarkPlugin {
    return function () {
        return function (_: any, vFile: any) {
            const astro: any = vFile.data.astro || (vFile.data.astro = {})
            const frontmatter: any = astro.frontmatter || (astro.frontmatter = {})
            frontmatter.layout = frontmatter.layout || '~/layouts/Container.astro'
        }
    }
}
