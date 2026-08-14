export type UserRole = 'admin' | 'learner'

export interface Profile {
  userId: string
  email: string
  role: UserRole
}

export type EvaluationScope = 'week' | 'final'

export interface Evaluation {
  id: string
  learnerId: string
  evaluatorId: string
  scope: EvaluationScope
  week: number | null
  scores: Record<string, number>
  notes: string
  updatedAt: string
}

export interface WeekEvaluationInput {
  learnerId: string
  week: number
  overall: number
  notes: string
}

export interface FinalEvaluationInput {
  learnerId: string
  scores: Record<string, number>
  notes: string
}

export const ADMIN_EMAIL = 'admin@gmail.com'
