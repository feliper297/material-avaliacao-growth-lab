import { createContext, useContext, type ReactNode } from 'react'
import type { QuizItem, TrailWeek } from '../../shared/data/weeks'
import type { TrailCatalog } from '../../shared/types/trail-catalog'

export interface TrailCatalogContextValue {
  weeks: TrailWeek[]
  quizzes: Record<string, QuizItem[]>
  allResourceIds: string[]
  loading: boolean
  saving: boolean
  error: string | null
  reload: () => Promise<void>
  saveCatalog: (catalog: TrailCatalog) => Promise<void>
  getResourceQuiz: (resourceId: string) => QuizItem[]
}

export const TrailCatalogContext = createContext<TrailCatalogContextValue | null>(null)

export function useTrailCatalogContext(): TrailCatalogContextValue {
  const value = useContext(TrailCatalogContext)
  if (!value) {
    throw new Error('useTrailCatalogContext must be used within TrailCatalogProvider')
  }
  return value
}

export function TrailCatalogProvider({
  value,
  children,
}: {
  value: TrailCatalogContextValue
  children: ReactNode
}) {
  return <TrailCatalogContext.Provider value={value}>{children}</TrailCatalogContext.Provider>
}
