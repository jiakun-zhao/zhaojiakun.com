import { defineConfig } from 'astro/config'

import UnoCSS from 'unocss/astro'

import cssnano from 'cssnano'
import autoprefixer from 'autoprefixer'

export default defineConfig({
    markdown: {
        syntaxHighlight: false,
        remarkPlugins: [],
    },
    site: 'https://zhaojiakun.com',
    build: {
        assets: 'assets',
    },
    server: {
        host: true,
    },
    integrations: [
        UnoCSS(),
    ],
    vite: {
        build: {
            assetsInlineLimit: 0,
        },
        css: {
            postcss: {
                plugins: [autoprefixer(), cssnano()],
            },
        },
    },
})
