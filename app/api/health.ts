import type { VercelRequest, VercelResponse } from '@vercel/node'

export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.status(200).json({
    ok: true,
    persistence: 'serverless-memory',
    note: 'Dados em memória na Vercel — podem resetar em cold start. Dev local usa JSON.',
  })
}
