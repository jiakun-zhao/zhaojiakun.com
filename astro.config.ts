import { defineConfig } from 'astro/config'

import markdownLinkTarget from './plugins/markdown-link-target'
import markdownDefaultLayout from './plugins/markdown-default-layout'
import markdownHasCode from './plugins/markdown-has-code'
import htmlMinifier from './plugins/html-minifier'

export default defineConfig({
    integrations: [htmlMinifier()],
    markdown: {
        syntaxHighlight: false,
        remarkPlugins: [
            markdownLinkTarget(),
            markdownDefaultLayout(),
            markdownHasCode(),
        ],
    },
    build: {
        assets: 'assets',
    },
    server: {
        host: true,
    },
    vite: {
        build: {
            assetsInlineLimit: 0,
        },
    },
})
