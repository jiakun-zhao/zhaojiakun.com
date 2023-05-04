import sharp from 'sharp'
import { runAsWorker } from 'synckit'

async function handler(path) {
    return await sharp(path).metadata()
}

runAsWorker(handler)
