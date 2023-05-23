import { access, mkdir } from 'node:fs/promises'
import { parse, resolve } from 'node:path'
import sharp from 'sharp'
import { runAsWorker } from 'synckit'

async function handler(id, src) {
  if (!src)
    return null

  try {
    const quality = +(src.match(/.*\?q=(100|\d\d|[1-9])$/)?.[1] ?? 0)
    if (quality)
      src = src.slice(0, src.lastIndexOf('?'))

    const from = resolve(id, '..', src)
    const to = resolve('node_modules', '.sharp-images', `${src}.${quality}.webp`)
    const ctx = sharp(from)
    const { width, height } = await ctx.metadata()

    if (width === undefined || height === undefined)
      return null

    try {
      await access(to)
    } catch {
      await mkdir(parse(to).dir, { recursive: true })
      await ctx.resize(height > 1080 ? 1080 : height).webp({ quality }).toFile(to)
    }
    return { width, height, from, to }
  } catch (e) {
    console.error(e)
    return null
  }
}

runAsWorker(handler)
