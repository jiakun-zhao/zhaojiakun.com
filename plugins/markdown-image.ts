import type { RemarkPlugin } from '@astrojs/markdown-remark'
import { visit } from 'unist-util-visit'

// 备份一份至 sm.ms，用于在 jsDelivr 无法访问时使用
// eslint-disable-next-line unused-imports/no-unused-vars
const map: Record<string, string> = {
    '/images/index-cover.jpg': 'https://s2.loli.net/2023/04/15/RlrGDhwZJ4t5zcW.jpg',
    '/images/hello-world-cover.jpg': 'https://s2.loli.net/2023/04/15/cYWtoE4LQ7MZAwT.jpg',
    '/images/naoelrie-wechat-mp.jpg': 'https://s2.loli.net/2023/04/15/ieGpTmfbMIcEq6h.jpg',
}

const jsDelivrBaseUrl = 'https://cdn.jsdelivr.net/npm/@jiakun-zhao/static/dist/personal-website'

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

                // if (Object.hasOwn(map, node.url)) {
                //     props['data-src'] = node.url
                //     props.onerror = 'src!=dataset.src&&(src=dataset.src)'
                //     node.url = map[node.url]
                // } else {
                //     props.loading = 'lazy'
                // }
            })
        }
    }
}
