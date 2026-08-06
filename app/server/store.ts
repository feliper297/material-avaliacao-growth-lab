import { mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { DEFAULT_STORE, type AppStore } from '../shared/types/store.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_DIR = path.join(__dirname, 'data')
const STORE_PATH = path.join(DATA_DIR, 'store.json')
const TEMP_PATH = path.join(DATA_DIR, 'store.json.tmp')

function sanitizeStore(raw: unknown): AppStore {
  if (!raw || typeof raw !== 'object') return { ...DEFAULT_STORE }
  const data = raw as Partial<AppStore>
  return {
    completed: Array.isArray(data.completed) ? data.completed.filter((x) => typeof x === 'string') : [],
    evidences: Array.isArray(data.evidences) ? data.evidences : [],
    scores: data.scores && typeof data.scores === 'object' ? data.scores : {},
    quizzes: data.quizzes && typeof data.quizzes === 'object' ? data.quizzes : {},
    theme: data.theme === 'dark' ? 'dark' : 'light',
  }
}

export async function readStore(): Promise<AppStore> {
  await mkdir(DATA_DIR, { recursive: true })
  try {
    const content = await readFile(STORE_PATH, 'utf-8')
    return sanitizeStore(JSON.parse(content))
  } catch {
    const initial = { ...DEFAULT_STORE }
    await writeStore(initial)
    return initial
  }
}

export async function writeStore(store: AppStore): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true })
  const payload = JSON.stringify(store, null, 2)
  await writeFile(TEMP_PATH, payload, 'utf-8')
  await rename(TEMP_PATH, STORE_PATH)
}
