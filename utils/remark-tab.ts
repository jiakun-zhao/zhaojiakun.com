import type { RemarkPlugin } from '@astrojs/markdown-remark'
import { visit } from 'unist-util-visit'

export default function (): RemarkPlugin {
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
