import type { VercelRequest, VercelResponse } from '@vercel/node'
import { a } from './_utils.js'

export default async function (req: VercelRequest, res: VercelResponse) {
  res.json({
    a,
  })
}
