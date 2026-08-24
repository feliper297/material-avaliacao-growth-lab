import { supabase } from '../lib/supabase'
import type {
  Evaluation,
  FinalEvaluationInput,
  Profile,
  WeekEvaluationInput,
} from '../../shared/types/evaluation'
import { parseEvaluationAttachments } from './evaluationAttachmentApi'

function mapEvaluation(row: {
  id: string
  learner_id: string
  evaluator_id: string
  scope: 'week' | 'final'
  week: number | null
  scores: Record<string, number>
  notes: string
  attachments?: unknown
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
    attachments: parseEvaluationAttachments(row.attachments),
    updatedAt: row.updated_at,
  }
}

const evaluationSelect =
  'id, learner_id, evaluator_id, scope, week, scores, notes, attachments, updated_at'

export const evaluationApi = {
  async ensureProfile(email: string): Promise<Profile> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Usuário não autenticado.')

    const role = email === 'admin@gmail.com' ? 'admin' : 'learner'

    const { data, error } = await supabase
      .from('profiles')
      .upsert({ user_id: user.id, email, role }, { onConflict: 'user_id' })
      .select('user_id, email, role, active')
      .single()

    if (error) throw new Error(error.message)

    return {
      userId: data.user_id,
      email: data.email,
      role: data.role as Profile['role'],
      active: data.active ?? true,
    }
  },

  async getProfile(): Promise<Profile | null> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const { data, error } = await supabase
      .from('profiles')
      .select('user_id, email, role, active')
      .eq('user_id', user.id)
      .maybeSingle()

    if (error) throw new Error(error.message)
    if (!data) return null

    return {
      userId: data.user_id,
      email: data.email,
      role: data.role as Profile['role'],
      active: data.active ?? true,
    }
  },

  async listLearners(): Promise<Profile[]> {
    const { data, error } = await supabase
      .from('profiles')
      .select('user_id, email, role, active')
      .eq('role', 'learner')
      .order('email')

    if (error) throw new Error(error.message)

    return (data ?? []).map((row) => ({
      userId: row.user_id,
      email: row.email,
      role: row.role as Profile['role'],
      active: row.active ?? true,
    }))
  },

  async getEvaluations(learnerId: string): Promise<Evaluation[]> {
    const { data, error } = await supabase
      .from('evaluations')
      .select(evaluationSelect)
      .eq('learner_id', learnerId)
      .order('week', { ascending: true, nullsFirst: false })

    if (error) throw new Error(error.message)

    return (data ?? []).map(mapEvaluation)
  },

  async saveWeekEvaluation(input: WeekEvaluationInput): Promise<Evaluation> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Usuário não autenticado.')

    const { data: existing, error: findError } = await supabase
      .from('evaluations')
      .select('id')
      .eq('learner_id', input.learnerId)
      .eq('scope', 'week')
      .eq('week', input.week)
      .maybeSingle()

    if (findError) throw new Error(findError.message)

    const row = {
      scores: { overall: input.overall },
      notes: input.notes,
      attachments: input.attachments,
      evaluator_id: user.id,
      updated_at: new Date().toISOString(),
    }

    if (existing?.id) {
      const { data, error } = await supabase
        .from('evaluations')
        .update(row)
        .eq('id', existing.id)
        .select(evaluationSelect)
        .single()

      if (error) throw new Error(error.message)
      return mapEvaluation(data)
    }

    const { data, error } = await supabase
      .from('evaluations')
      .insert({
        learner_id: input.learnerId,
        evaluator_id: user.id,
        scope: 'week',
        week: input.week,
        scores: row.scores,
        notes: row.notes,
        attachments: row.attachments,
        updated_at: row.updated_at,
      })
      .select(evaluationSelect)
      .single()

    if (error) throw new Error(error.message)
    return mapEvaluation(data)
  },

  async saveFinalEvaluation(input: FinalEvaluationInput): Promise<Evaluation> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Usuário não autenticado.')

    const { data: existing, error: findError } = await supabase
      .from('evaluations')
      .select('id')
      .eq('learner_id', input.learnerId)
      .eq('scope', 'final')
      .maybeSingle()

    if (findError) throw new Error(findError.message)

    const row = {
      scores: input.scores,
      notes: input.notes,
      attachments: input.attachments,
      evaluator_id: user.id,
      updated_at: new Date().toISOString(),
    }

    if (existing?.id) {
      const { data, error } = await supabase
        .from('evaluations')
        .update(row)
        .eq('id', existing.id)
        .select(evaluationSelect)
        .single()

      if (error) throw new Error(error.message)
      return mapEvaluation(data)
    }

    const { data, error } = await supabase
      .from('evaluations')
      .insert({
        learner_id: input.learnerId,
        evaluator_id: user.id,
        scope: 'final',
        week: null,
        scores: row.scores,
        notes: row.notes,
        attachments: row.attachments,
        updated_at: row.updated_at,
      })
      .select(evaluationSelect)
      .single()

    if (error) throw new Error(error.message)
    return mapEvaluation(data)
  },
}
