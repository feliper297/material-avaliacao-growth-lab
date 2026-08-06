import cors from 'cors'
import express from 'express'
import { createEvidence, validateEvidence } from '../shared/domain/evidence.js'
import { DEFAULT_STORE, type AppStore, type Evidence } from '../shared/types/store.js'
import { readStore, writeStore } from './store.js'

const app = express()
const PORT = Number(process.env.PORT ?? 3001)

app.use(cors())
app.use(express.json({ limit: '1mb' }))

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, persistence: 'json-file' })
})

app.get('/api/state', async (_req, res, next) => {
  try {
    const store = await readStore()
    res.json(store)
  } catch (error) {
    next(error)
  }
})

app.put('/api/state', async (req, res, next) => {
  try {
    const store = req.body as AppStore
    if (!store || typeof store !== 'object') {
      res.status(400).json({ error: 'Payload inválido.' })
      return
    }
    await writeStore({
      completed: Array.isArray(store.completed) ? store.completed : [],
      evidences: Array.isArray(store.evidences) ? store.evidences : [],
      scores: store.scores ?? {},
      quizzes: store.quizzes ?? {},
      theme: store.theme === 'dark' ? 'dark' : 'light',
    })
    res.json({ ok: true })
  } catch (error) {
    next(error)
  }
})

app.post('/api/evidences', async (req, res, next) => {
  try {
    const errors = validateEvidence(req.body ?? {})
    if (errors.length) {
      res.status(400).json({ error: errors.join(' ') })
      return
    }
    const store = await readStore()
    const evidence = createEvidence(req.body, crypto.randomUUID())
    store.evidences.unshift(evidence)
    await writeStore(store)
    res.status(201).json(evidence)
  } catch (error) {
    next(error)
  }
})

app.delete('/api/evidences/:id', async (req, res, next) => {
  try {
    const store = await readStore()
    const before = store.evidences.length
    store.evidences = store.evidences.filter((e: Evidence) => e.id !== req.params.id)
    if (store.evidences.length === before) {
      res.status(404).json({ error: 'Evidência não encontrada.' })
      return
    }
    await writeStore(store)
    res.json({ ok: true })
  } catch (error) {
    next(error)
  }
})

app.use((_req, res) => {
  res.status(404).json({ error: 'Rota não encontrada.' })
})

app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err)
  res.status(500).json({ error: 'Erro interno ao persistir dados.' })
})

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`BFF listening on http://127.0.0.1:${PORT}`)
    console.log('Persistência: server/data/store.json (mock Fase 1 — ADR-007)')
  })
}

export default app
