import { defineConfig } from 'astro/config'
import type { PluginOption } from 'vite'
import cssnano from 'cssnano'
import autoprefixer from 'autoprefixer'
import { rollup } from 'rollup'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'

const CLIENT_SCRIPTS_NAME = '~/client-scripts'

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
    vite: {
        optimizeDeps: { exclude: ['fsevents'] },
        build: { assetsInlineLimit: 0 },
        css: {
            postcss: {
                plugins: [autoprefixer(), cssnano()],
            },
        },
        plugins: [
            injectClientScript(),
        ],
    },
})

function injectClientScript(): PluginOption {
    return {
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
    }
}
