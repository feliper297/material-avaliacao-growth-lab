import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createEvidence, validateEvidence } from '../../shared/domain/evidence'
import { getStore, setStore } from './_lib/store'

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    const errors = validateEvidence(req.body ?? {})
    if (errors.length) {
      res.status(400).json({ error: errors.join(' ') })
      return
    }
    const store = getStore()
    const evidence = createEvidence(req.body, crypto.randomUUID())
    store.evidences.unshift(evidence)
    setStore(store)
    res.status(201).json(evidence)
    return
  }

  res.setHeader('Allow', 'POST')
  res.status(405).json({ error: 'Método não permitido.' })
}
