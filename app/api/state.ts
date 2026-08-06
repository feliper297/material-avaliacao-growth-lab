import type { VercelRequest, VercelResponse } from '@vercel/node'
import type { AppStore } from '../../shared/types/store.js'
import { getStore, sanitizeIncoming, setStore } from './_lib/store.js'

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    res.status(200).json(getStore())
    return
  }

  if (req.method === 'PUT') {
    const store = sanitizeIncoming(req.body as AppStore)
    setStore(store)
    res.status(200).json({ ok: true })
    return
  }

  res.setHeader('Allow', 'GET, PUT')
  res.status(405).json({ error: 'Método não permitido.' })
}
