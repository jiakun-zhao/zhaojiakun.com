import { mkdir } from 'node:fs/promises'
import { parse } from 'node:path'
import sharp from 'sharp'
import { runAsWorker } from 'synckit'

async function handler(from, to, quality = 80) {
  try {
    const ctx = sharp(from)
    await mkdir(parse(to).dir, { recursive: true })
    await ctx.resize(1080).webp({ quality }).toFile(to)
    const { width, height } = await ctx.metadata()
    return (width !== undefined && height !== undefined) ? { width, height } : null
  } catch (e) {
    console.error(e)
    return null
  }
}

runAsWorker(handler)
