import { defineConfig } from 'astro/config'

import markdownLinkTarget from './plugins/markdown-link-target'

export default defineConfig({
    build: {
        assets: 'assets',
    },
    vite: {
        build: {
            assetsInlineLimit: 0,
        },
    },
    markdown: {
        remarkPlugins: [
            markdownLinkTarget(),
        ],
    },
})
