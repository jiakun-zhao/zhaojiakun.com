import type { VercelRequest, VercelResponse } from '@vercel/node'

import glob from 'fast-glob'

export default async function (req: VercelRequest, res: VercelResponse) {
    const files = await glob(['**/*', '!node_modules'])
    res.json({
        params: req.query,
        files,
    })
}
