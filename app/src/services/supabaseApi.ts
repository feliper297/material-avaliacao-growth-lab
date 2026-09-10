import { supabase } from '../lib/supabase'
import type { AppStore, Evidence } from '../../shared/types/store'
import type { EvidenceInput } from '../../shared/domain/evidence'
import { DEFAULT_STORE } from '../../shared/types/store'
import { parseEvidenceAttachments, removeEvidenceFile } from './evidenceAttachmentApi'

const evidenceSelect = 'id, week, resource_id, type, title, url, description, attachments, created_at'

function mapEvidence(row: {
  id: string
  week: number
  resource_id: string | null
  type: string
  title: string
  url: string | null
  description: string
  attachments?: unknown
  created_at: string
}): Evidence {
  return {
    id: row.id,
    week: row.week,
    resourceId: row.resource_id ?? undefined,
    type: row.type,
    title: row.title,
    url: row.url ?? undefined,
    description: row.description,
    attachments: parseEvidenceAttachments(row.attachments),
    createdAt: row.created_at,
  }
}

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
      .select(evidenceSelect)
      .eq('user_id', targetUserId)
      .order('created_at', { ascending: false })

    if (evError) throw new Error(evError.message)

    const evidences: Evidence[] = (evData ?? []).map(mapEvidence)

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
        resource_id: input.resourceId ?? null,
        type: input.type ?? 'aplicacao',
        title: input.title,
        url: input.url ?? null,
        description: input.description,
        attachments: input.attachments ?? [],
      })
      .select(evidenceSelect)
      .single()

    if (error) throw new Error(error.message)

    return mapEvidence(data)
  },

  async deleteEvidence(id: string): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Usuário não autenticado.')

    const { data: existing, error: fetchError } = await supabase
      .from('evidences')
      .select('attachments')
      .eq('id', id)
      .eq('user_id', user.id)
      .maybeSingle()

    if (fetchError) throw new Error(fetchError.message)

    const { error } = await supabase
      .from('evidences')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)

    if (error) throw new Error(error.message)

    const attachments = parseEvidenceAttachments(existing?.attachments)
    await Promise.all(attachments.map((item) => removeEvidenceFile(item.url)))
  },

  async updateEvidence(id: string, input: EvidenceInput): Promise<Evidence> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Usuário não autenticado.')

    const { data, error } = await supabase
      .from('evidences')
      .update({
        week: input.week,
        resource_id: input.resourceId ?? null,
        type: input.type ?? 'aplicacao',
        title: input.title,
        url: input.url ?? null,
        description: input.description,
        attachments: input.attachments ?? [],
      })
      .eq('id', id)
      .eq('user_id', user.id)
      .select(evidenceSelect)
      .maybeSingle()

    if (error) throw new Error(error.message)
    if (!data) throw new Error('Evidência não encontrada ou sem permissão para editar.')

    return mapEvidence(data)
  },
}
