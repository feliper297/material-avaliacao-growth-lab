import type { VercelRequest, VercelResponse } from '@vercel/node'
import { getStore, setStore } from '../_lib/store'

export default function handler(req: VercelRequest, res: VercelResponse) {
  const id = req.query.id as string | undefined

  if (req.method === 'DELETE' && id) {
    const store = getStore()
    const before = store.evidences.length
    store.evidences = store.evidences.filter((e) => e.id !== id)
    if (store.evidences.length === before) {
      res.status(404).json({ error: 'Evidência não encontrada.' })
      return
    }
    setStore(store)
    res.status(200).json({ ok: true })
    return
  }

  res.setHeader('Allow', 'DELETE')
  res.status(405).json({ error: 'Método não permitido.' })
}
