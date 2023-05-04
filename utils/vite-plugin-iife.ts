import type { AstroConfig } from 'astro'
import { rollup } from 'rollup'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'

export default function (): AstroConfig['vite']['plugins'] {
    return [{
        name: 'vite-plugin-iife',
        async transform(_, id) {
            if (id.endsWith('.ts?iife')) {
                const bundle = await rollup({
                    input: id.slice(0, -5),
                    plugins: [terser(), typescript()],
                })
                const { output: [{ code, map }] }
                    = await bundle.generate({ format: 'iife' })
                return { code, map }
            }
        },
    }]
}
