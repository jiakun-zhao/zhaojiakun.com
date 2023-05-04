import type { RemarkPlugin } from '@astrojs/markdown-remark'
import { visit } from 'unist-util-visit'

export default function (): RemarkPlugin {
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
