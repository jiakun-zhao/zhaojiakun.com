import { fileURLToPath } from 'node:url'
import { readFile, writeFile } from 'node:fs/promises'
import type { AstroIntegration } from 'astro'
import glob from 'fast-glob'
import { minify } from 'html-minifier'

export default function (): AstroIntegration {
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
