import { join } from 'node:path'
import type { APIRoute } from 'astro'
import sass from 'sass'
import PostCSS from 'postcss'
import config from 'astro.config'
import scss from '~/styles/giscus.scss?url'
import { GISCUS_STYLE_VERSION } from '~/config'

export async function getStaticPaths() {
    return [{ params: { version: GISCUS_STYLE_VERSION } }]
}

export const get: APIRoute = async () => {
    const filePath = join(process.cwd(), scss)
    const { css } = await sass.compileAsync(filePath)
    const plugins = (config.vite?.css?.postcss as any)?.plugins ?? []
    const res = await PostCSS(plugins).process(css, { from: undefined })
    return new Response(res.css, { headers: { 'Content-Type': 'text/css' } })
}
