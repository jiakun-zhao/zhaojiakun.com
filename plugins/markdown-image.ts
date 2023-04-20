import type { RemarkPlugin } from '@astrojs/markdown-remark'
import { visit } from 'unist-util-visit'

const jsDelivrBaseUrl = 'https://static.zhaojiakun.com/personal-website'

export default function (): RemarkPlugin {
    return function () {
        return function (tree) {
            visit(tree, 'image', (node) => {
                const data = node.data || (node.data = {})
                const props: any = data.hProperties || (data.hProperties = {})

                if (import.meta.env.DEV)
                    return

                props['data-src'] = node.url
                props.onerror = 'src!=dataset.src&&(src=dataset.src)'
                props.loading = 'lazy'
                node.url = jsDelivrBaseUrl + node.url
            })
        }
    }
}
