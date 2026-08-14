import type { UserRole } from './evaluation'

export interface BackOfficeUserRow {
  userId: string
  email: string
  role: UserRole
  active: boolean
  completedCount: number
  evidenceCount: number
  quizCount: number
  progressPercent: number
  weekEvaluations: number
  hasFinalEvaluation: boolean
  lastActivity: string | null
}

export interface BackOfficeStats {
  totalUsers: number
  learnerCount: number
  adminCount: number
  totalEvidences: number
  totalEvaluations: number
  totalQuizzesCompleted: number
  users: BackOfficeUserRow[]
}

export interface UpdateBackOfficeUserInput {
  userId: string
  email: string
  role: UserRole
  active: boolean
}
