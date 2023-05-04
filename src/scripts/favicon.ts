import { $new, random } from './utils'

const base = 'https://api.iconify.design'

fetch(`${base}/search?query=face&prefix=fluent-emoji`)
    .then(res => res.json())
    .then((res) => {
        const icons = res.icons as string[]
        const icon = icons[random(icons.length)].replace(':', '/')
        const link = $new('link')
        link.rel = 'icon'
        link.type = 'image/svg+xml'
        link.href = `${base}/${icon}.svg`
        document.head.appendChild(link)
    })
