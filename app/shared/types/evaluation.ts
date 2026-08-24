export type UserRole = 'admin' | 'learner'

export interface Profile {
  userId: string
  email: string
  role: UserRole
  active: boolean
}

export type EvaluationScope = 'week' | 'final'

export interface EvaluationAttachment {
  id: string
  url: string
  name: string
  createdAt: string
}

export interface Evaluation {
  id: string
  learnerId: string
  evaluatorId: string
  scope: EvaluationScope
  week: number | null
  scores: Record<string, number>
  notes: string
  attachments: EvaluationAttachment[]
  updatedAt: string
}

export interface WeekEvaluationInput {
  learnerId: string
  week: number
  overall: number
  notes: string
  attachments: EvaluationAttachment[]
}

export interface FinalEvaluationInput {
  learnerId: string
  scores: Record<string, number>
  notes: string
  attachments: EvaluationAttachment[]
}

export const ADMIN_EMAIL = 'admin@gmail.com'
