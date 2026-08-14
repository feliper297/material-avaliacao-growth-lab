import { supabase } from '../lib/supabase'
import type { AppStore, Evidence } from '../../shared/types/store'
import type { EvidenceInput } from '../../shared/domain/evidence'
import { DEFAULT_STORE } from '../../shared/types/store'

export const supabaseApi = {
  async getState(userId?: string): Promise<AppStore> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Usuário não autenticado.')

    const targetUserId = userId ?? user.id

    const { data, error } = await supabase
      .from('user_state')
      .select('completed, scores, quizzes, theme')
      .eq('user_id', targetUserId)
      .maybeSingle()

    if (error) throw new Error(error.message)

    const { data: evData, error: evError } = await supabase
      .from('evidences')
      .select('id, week, type, title, url, description, created_at')
      .eq('user_id', targetUserId)
      .order('created_at', { ascending: false })

    if (evError) throw new Error(evError.message)

    const evidences: Evidence[] = (evData ?? []).map((e) => ({
      id: e.id,
      week: e.week,
      type: e.type,
      title: e.title,
      url: e.url ?? undefined,
      description: e.description,
      createdAt: e.created_at,
    }))

    if (!data) {
      return { ...DEFAULT_STORE, evidences }
    }

    return {
      completed: data.completed ?? [],
      scores: data.scores ?? {},
      quizzes: data.quizzes ?? {},
      theme: data.theme ?? 'light',
      evidences,
    }
  },

  async saveState(store: AppStore): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Usuário não autenticado.')

    const { error } = await supabase
      .from('user_state')
      .upsert(
        {
          user_id: user.id,
          completed: store.completed,
          scores: store.scores,
          quizzes: store.quizzes,
          theme: store.theme,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id' },
      )

    if (error) throw new Error(error.message)
  },

  async addEvidence(input: EvidenceInput): Promise<Evidence> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Usuário não autenticado.')

    const { data, error } = await supabase
      .from('evidences')
      .insert({
        user_id: user.id,
        week: input.week,
        type: input.type ?? 'aplicacao',
        title: input.title,
        url: input.url ?? null,
        description: input.description,
      })
      .select('id, week, type, title, url, description, created_at')
      .single()

    if (error) throw new Error(error.message)

    return {
      id: data.id,
      week: data.week,
      type: data.type,
      title: data.title,
      url: data.url ?? undefined,
      description: data.description,
      createdAt: data.created_at,
    }
  },

  async deleteEvidence(id: string): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Usuário não autenticado.')

    const { error } = await supabase
      .from('evidences')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)

    if (error) throw new Error(error.message)
  },

  async updateEvidence(id: string, input: EvidenceInput): Promise<Evidence> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Usuário não autenticado.')

    const { data, error } = await supabase
      .from('evidences')
      .update({
        week: input.week,
        type: input.type ?? 'aplicacao',
        title: input.title,
        url: input.url ?? null,
        description: input.description,
      })
      .eq('id', id)
      .eq('user_id', user.id)
      .select('id, week, type, title, url, description, created_at')
      .maybeSingle()

    if (error) throw new Error(error.message)
    if (!data) throw new Error('Evidência não encontrada ou sem permissão para editar.')

    return {
      id: data.id,
      week: data.week,
      type: data.type,
      title: data.title,
      url: data.url ?? undefined,
      description: data.description,
      createdAt: data.created_at,
    }
  },
}
