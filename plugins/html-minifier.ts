import { fileURLToPath } from 'node:url'
import { readFile, writeFile } from 'node:fs/promises'
import type { AstroIntegration } from 'astro'
import type { Options } from 'html-minifier'
import { minify } from 'html-minifier'
import glob from 'fast-glob'

export default function (options?: Options): AstroIntegration {
    const _options = options ?? {
        removeComments: true,
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        minifyJS: true,
        minifyCSS: true,
    }

    return {
        name: 'astro-html-minifier',
        hooks: {
            'astro:build:done': async ({ dir }) => {
                const path = fileURLToPath(dir)
                for (const filePath of await glob(`${path}/**/*.html`)) {
                    const html = await readFile(filePath, 'utf-8')
                    const minified = minify(html, _options)
                    await writeFile(filePath, minified)
                }
            },
        },
    }
}
