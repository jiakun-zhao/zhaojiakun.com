import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function (_: VercelRequest, res: VercelResponse) {
  res.redirect('/')
}
