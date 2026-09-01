import type { QuizItem, TrailWeek } from '../data/weeks'

export const TRAIL_CATALOG_ID = 'default'

export interface TrailCatalog {
  weeks: TrailWeek[]
  quizzes: Record<string, QuizItem[]>
}

export interface TrailCatalogRow {
  id: string
  weeks: TrailWeek[]
  quizzes: Record<string, QuizItem[]>
  updated_at: string
  updated_by: string | null
}
