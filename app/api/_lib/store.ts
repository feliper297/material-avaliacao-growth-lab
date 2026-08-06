import { DEFAULT_STORE, type AppStore } from '../../shared/types/store'

declare global {
  // eslint-disable-next-line no-var
  var __growthLabStore: AppStore | undefined
}

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

export function getStore(): AppStore {
  if (!globalThis.__growthLabStore) {
    globalThis.__growthLabStore = { ...DEFAULT_STORE }
  }
  return globalThis.__growthLabStore
}

export function setStore(store: AppStore): void {
  globalThis.__growthLabStore = sanitizeStore(store)
}

export function sanitizeIncoming(store: AppStore): AppStore {
  return sanitizeStore(store)
}
