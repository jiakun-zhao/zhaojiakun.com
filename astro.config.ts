import { fileURLToPath } from 'node:url'
import { readFile, writeFile } from 'node:fs/promises'
import type { AstroConfig, AstroIntegration } from 'astro'
import type { RemarkPlugin } from '@astrojs/markdown-remark'
import { defineConfig } from 'astro/config'
import { rollup } from 'rollup'
import { visit } from 'unist-util-visit'
import { minify } from 'html-minifier'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'
import glob from 'fast-glob'
import cssnano from 'cssnano'
import autoprefixer from 'autoprefixer'
import { CLIENT_SCRIPTS_NAME } from './src/config'

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
        remarkPlugins: [remarkLinkTarget()],
    },
    vite: {
        optimizeDeps: { exclude: ['fsevents'] },
        build: { assetsInlineLimit: 0 },
        css: { postcss: { plugins: [autoprefixer(), cssnano()] } },
        plugins: [injectClientScript()],
    },
})

function injectClientScript(): AstroConfig['vite']['plugins'] {
    return [{
        name: 'inject-client-scripts',
        resolveId(source) {
            return source === CLIENT_SCRIPTS_NAME ? `\0${CLIENT_SCRIPTS_NAME}` : undefined
        },
        async load(id) {
            if (id === `\0${CLIENT_SCRIPTS_NAME}`) {
                const bundle = await rollup({
                    input: 'scripts/client-scripts.ts',
                    plugins: [terser(), typescript()],
                })
                const { output } = await bundle.generate({ format: 'iife' })
                return output[0].code
            }
        },
    }]
}

function remarkLinkTarget(): RemarkPlugin {
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

function htmlMinify(): AstroIntegration {
    return {
        name: 'astro-html-minifier',
        hooks: {
            'astro:build:done': async ({ dir }) => {
                const path = fileURLToPath(dir)
                for (const filePath of await glob(`${path}/**/*.html`)) {
                    const html = await readFile(filePath, 'utf-8')
                    const minified = minify(html, {
                        removeComments: true,
                        removeAttributeQuotes: true,
                        collapseWhitespace: true,
                        minifyJS: true,
                        minifyCSS: true,
                    })
                    await writeFile(filePath, minified)
                }
            },
        },
    }
}
