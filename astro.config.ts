import { defineConfig } from 'astro/config'
import cssnano from 'cssnano'
import autoprefixer from 'autoprefixer'

import iife from './utils/vite-plugin-iife'
import htmlMinify from './utils/astro-html-minify'
import remarkLinkTarget from './utils/remark-link-target'
import remarkTab from './utils/remark-tab'
import remarkImage from './utils/remark-images'

export default defineConfig({
    site: 'https://zhaojiakun.com',
    build: {
        assets: 'assets',
    },
    server: {
        host: true,
    },
    integrations: [htmlMinify()],
    markdown: {
        syntaxHighlight: false,
        remarkPlugins: [remarkLinkTarget(), remarkImage(), remarkTab()],
    },
    vite: {
        optimizeDeps: { exclude: ['fsevents'] },
        build: { assetsInlineLimit: 0 },
        css: { postcss: { plugins: [autoprefixer(), cssnano()] } },
        plugins: [iife()],
    },
})
