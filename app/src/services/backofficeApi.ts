import { ALL_RESOURCE_IDS } from '../../shared/data/weeks'
import { getOverallProgress } from '../../shared/domain/progress'
import type { BackOfficeStats, BackOfficeUserRow } from '../../shared/types/backoffice'
import type { Profile } from '../../shared/types/evaluation'
import { supabase } from '../lib/supabase'

export const backofficeApi = {
  async getStats(): Promise<BackOfficeStats> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Usuário não autenticado.')

    const [profilesRes, statesRes, evidencesRes, evaluationsRes] = await Promise.all([
      supabase.from('profiles').select('user_id, email, role').order('email'),
      supabase.from('user_state').select('user_id, completed, quizzes, updated_at'),
      supabase.from('evidences').select('user_id'),
      supabase.from('evaluations').select('learner_id, scope, week'),
    ])

    if (profilesRes.error) throw new Error(profilesRes.error.message)
    if (statesRes.error) throw new Error(statesRes.error.message)
    if (evidencesRes.error) throw new Error(evidencesRes.error.message)
    if (evaluationsRes.error) throw new Error(evaluationsRes.error.message)

    const profiles = (profilesRes.data ?? []).map((row) => ({
      userId: row.user_id,
      email: row.email,
      role: row.role as Profile['role'],
    }))

    const stateByUser = new Map<
      string,
      { completed: string[]; quizzes: Record<string, number>; updatedAt: string | null }
    >()
    for (const row of statesRes.data ?? []) {
      stateByUser.set(row.user_id, {
        completed: row.completed ?? [],
        quizzes: row.quizzes ?? {},
        updatedAt: row.updated_at ?? null,
      })
    }

    const evidenceCountByUser = new Map<string, number>()
    for (const row of evidencesRes.data ?? []) {
      evidenceCountByUser.set(row.user_id, (evidenceCountByUser.get(row.user_id) ?? 0) + 1)
    }

    const weekEvaluationsByUser = new Map<string, number>()
    const finalEvaluationByUser = new Set<string>()
    for (const row of evaluationsRes.data ?? []) {
      if (row.scope === 'week') {
        weekEvaluationsByUser.set(row.learner_id, (weekEvaluationsByUser.get(row.learner_id) ?? 0) + 1)
      }
      if (row.scope === 'final') {
        finalEvaluationByUser.add(row.learner_id)
      }
    }

    const users: BackOfficeUserRow[] = profiles.map((profile) => {
      const state = stateByUser.get(profile.userId)
      const completedCount = state?.completed.length ?? 0
      const evidenceCount = evidenceCountByUser.get(profile.userId) ?? 0
      const quizCount = state ? Object.keys(state.quizzes).length : 0

      return {
        userId: profile.userId,
        email: profile.email,
        role: profile.role,
        completedCount,
        evidenceCount,
        quizCount,
        progressPercent:
          profile.role === 'learner'
            ? getOverallProgress(completedCount, ALL_RESOURCE_IDS.length, evidenceCount)
            : 0,
        weekEvaluations: weekEvaluationsByUser.get(profile.userId) ?? 0,
        hasFinalEvaluation: finalEvaluationByUser.has(profile.userId),
        lastActivity: state?.updatedAt ?? null,
      }
    })

    const learners = users.filter((u) => u.role === 'learner')

    return {
      totalUsers: users.length,
      learnerCount: learners.length,
      adminCount: users.filter((u) => u.role === 'admin').length,
      totalEvidences: evidencesRes.data?.length ?? 0,
      totalEvaluations: evaluationsRes.data?.length ?? 0,
      totalQuizzesCompleted: learners.reduce((sum, u) => sum + u.quizCount, 0),
      users,
    }
  },
}
