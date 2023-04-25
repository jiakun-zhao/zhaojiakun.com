import { join } from 'node:path'
import { readFile } from 'node:fs/promises'
import type { APIRoute } from 'astro'
import glob from 'fast-glob'
import sharp from 'sharp'
import { IMAGE_SAVE_PATH } from '~/config'

export async function getStaticPaths() {
    const images = await glob('**/*', { cwd: IMAGE_SAVE_PATH })
    return images.map((name) => {
        const isStartsWithAt = name.startsWith('@')
        const compress = [
            { params: { name: `${name}.webp` } },
            { params: { name: `${name}.avif` } },
        ]
        return [{ params: { name } }, ...(isStartsWithAt ? compress : [])]
    }).flat()
}

async function getSharpContext(filePath: string) {
    const ctx = sharp(filePath.slice(0, -5))
    const { width } = await ctx.metadata()
    const customWidth = parseInt(filePath.match(/[!|,](\d)w+/)?.[1] ?? '1080')
    const customQuality = parseInt(filePath.match(/[!|,](\d)q+/)?.[1] ?? '75')
    return {
        quality: customQuality,
        ctx: ctx.resize(width && (width < customWidth ? width : customWidth)),
    }
}

export const get: APIRoute = async ({ params }) => {
    const filePath = join(IMAGE_SAVE_PATH, params.name!)
    console.log(filePath)
    let buffer: Buffer
    if (filePath.endsWith('.webp')) {
        const { ctx, quality } = await getSharpContext(filePath)
        buffer = await ctx.webp({ quality }).toBuffer()
    } else if (filePath.endsWith('.avif')) {
        const { ctx, quality } = await getSharpContext(filePath)
        buffer = await ctx.avif({ quality: quality - 25 }).toBuffer()
    } else {
        buffer = await readFile(filePath)
    }
    return new Response(buffer)
}
