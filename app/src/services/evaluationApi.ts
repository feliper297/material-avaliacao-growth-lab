import { supabase } from '../lib/supabase'
import type {
  Evaluation,
  FinalEvaluationInput,
  Profile,
  WeekEvaluationInput,
} from '../../shared/types/evaluation'

function mapEvaluation(row: {
  id: string
  learner_id: string
  evaluator_id: string
  scope: 'week' | 'final'
  week: number | null
  scores: Record<string, number>
  notes: string
  updated_at: string
}): Evaluation {
  return {
    id: row.id,
    learnerId: row.learner_id,
    evaluatorId: row.evaluator_id,
    scope: row.scope,
    week: row.week,
    scores: row.scores ?? {},
    notes: row.notes ?? '',
    updatedAt: row.updated_at,
  }
}

export const evaluationApi = {
  async ensureProfile(email: string): Promise<Profile> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Usuário não autenticado.')

    const role = email === 'admin@gmail.com' ? 'admin' : 'learner'

    const { data, error } = await supabase
      .from('profiles')
      .upsert({ user_id: user.id, email, role }, { onConflict: 'user_id' })
      .select('user_id, email, role')
      .single()

    if (error) throw new Error(error.message)

    return { userId: data.user_id, email: data.email, role: data.role as Profile['role'] }
  },

  async getProfile(): Promise<Profile | null> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const { data, error } = await supabase
      .from('profiles')
      .select('user_id, email, role')
      .eq('user_id', user.id)
      .maybeSingle()

    if (error) throw new Error(error.message)
    if (!data) return null

    return { userId: data.user_id, email: data.email, role: data.role as Profile['role'] }
  },

  async listLearners(): Promise<Profile[]> {
    const { data, error } = await supabase
      .from('profiles')
      .select('user_id, email, role')
      .eq('role', 'learner')
      .order('email')

    if (error) throw new Error(error.message)

    return (data ?? []).map((row) => ({
      userId: row.user_id,
      email: row.email,
      role: row.role as Profile['role'],
    }))
  },

  async getEvaluations(learnerId: string): Promise<Evaluation[]> {
    const { data, error } = await supabase
      .from('evaluations')
      .select('id, learner_id, evaluator_id, scope, week, scores, notes, updated_at')
      .eq('learner_id', learnerId)
      .order('scope')
      .order('week')

    if (error) throw new Error(error.message)

    return (data ?? []).map(mapEvaluation)
  },

  async saveWeekEvaluation(input: WeekEvaluationInput): Promise<Evaluation> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Usuário não autenticado.')

    const payload = {
      learner_id: input.learnerId,
      evaluator_id: user.id,
      scope: 'week' as const,
      week: input.week,
      scores: { overall: input.overall },
      notes: input.notes,
      updated_at: new Date().toISOString(),
    }

    const { data, error } = await supabase
      .from('evaluations')
      .upsert(payload, { onConflict: 'learner_id,week', ignoreDuplicates: false })
      .select('id, learner_id, evaluator_id, scope, week, scores, notes, updated_at')
      .single()

    if (error) {
      const { data: existing } = await supabase
        .from('evaluations')
        .select('id')
        .eq('learner_id', input.learnerId)
        .eq('scope', 'week')
        .eq('week', input.week)
        .maybeSingle()

      if (existing) {
        const { data: updated, error: updateError } = await supabase
          .from('evaluations')
          .update({
            scores: payload.scores,
            notes: payload.notes,
            evaluator_id: user.id,
            updated_at: payload.updated_at,
          })
          .eq('id', existing.id)
          .select('id, learner_id, evaluator_id, scope, week, scores, notes, updated_at')
          .single()

        if (updateError) throw new Error(updateError.message)
        return mapEvaluation(updated)
      }

      throw new Error(error.message)
    }

    return mapEvaluation(data)
  },

  async saveFinalEvaluation(input: FinalEvaluationInput): Promise<Evaluation> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Usuário não autenticado.')

    const payload = {
      learner_id: input.learnerId,
      evaluator_id: user.id,
      scope: 'final' as const,
      week: null,
      scores: input.scores,
      notes: input.notes,
      updated_at: new Date().toISOString(),
    }

    const { data: existing } = await supabase
      .from('evaluations')
      .select('id')
      .eq('learner_id', input.learnerId)
      .eq('scope', 'final')
      .maybeSingle()

    if (existing) {
      const { data: updated, error } = await supabase
        .from('evaluations')
        .update({
          scores: payload.scores,
          notes: payload.notes,
          evaluator_id: user.id,
          updated_at: payload.updated_at,
        })
        .eq('id', existing.id)
        .select('id, learner_id, evaluator_id, scope, week, scores, notes, updated_at')
        .single()

      if (error) throw new Error(error.message)
      return mapEvaluation(updated)
    }

    const { data, error } = await supabase
      .from('evaluations')
      .insert(payload)
      .select('id, learner_id, evaluator_id, scope, week, scores, notes, updated_at')
      .single()

    if (error) throw new Error(error.message)
    return mapEvaluation(data)
  },
}
