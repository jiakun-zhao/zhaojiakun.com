import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function (req: VercelRequest, res: VercelResponse) {
    res.json({
        params: req.query,
        msg: 'holy shit!',
    })
}
