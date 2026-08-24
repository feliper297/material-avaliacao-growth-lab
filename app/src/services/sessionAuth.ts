import type { AuthSubject } from '../../shared/domain/authorization'
import { assertAuthenticated } from '../../shared/domain/authorization'
import type { Profile } from '../../shared/types/evaluation'
import { supabase } from '../lib/supabase'
import { evaluationApi } from './evaluationApi'

export async function getAuthSubject(): Promise<AuthSubject | null> {
  const profile = await evaluationApi.getProfile()
  if (!profile?.active) return null

  return {
    userId: profile.userId,
    role: profile.role,
  }
}

export async function requireAuthSubject(): Promise<AuthSubject> {
  const subject = await getAuthSubject()
  assertAuthenticated(subject)
  return subject
}

export function profileToSubject(profile: Profile): AuthSubject {
  return { userId: profile.userId, role: profile.role }
}

export async function requireSupabaseUser() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Usuário não autenticado.')
  return user
}
