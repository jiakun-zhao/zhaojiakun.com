import { access, mkdir, readFile } from 'node:fs/promises'
import { parse, resolve } from 'node:path'
import sharp from 'sharp'
import { runAsWorker } from 'synckit'

async function handler(id, src) {
  if (!src)
    return null

  try {
    const from = resolve(id, '..', src)
    const infoStr = await readFile(`${id}.json`, 'utf-8')
    const quality = JSON.parse(infoStr).images?.[src] ?? 80
    const to = resolve('node_modules', '.sharp-images', `${src}.${quality}.webp`)
    const ctx = sharp(from)
    const { width, height } = await ctx.metadata()
    try {
      await access(to)
    } catch {
      await mkdir(parse(to).dir, { recursive: true })
      await ctx.resize(height ?? 0 > 1080 ? 1080 : height).webp({ quality }).toFile(to)
    }

    return (width !== undefined && height !== undefined) ? { width, height, from, to } : null
  } catch (e) {
    console.error(e)
    return null
  }
}

runAsWorker(handler)
