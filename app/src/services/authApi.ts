import { supabase } from '../lib/supabase'

export function getAuthRedirectUrl() {
  const { origin, pathname } = window.location
  return `${origin}${pathname}`
}

export function isRecoveryCallback() {
  const hash = window.location.hash.replace(/^#/, '')
  if (!hash) return false
  return new URLSearchParams(hash).get('type') === 'recovery'
}

export function clearAuthCallbackHash() {
  window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`)
}

export async function requestPasswordReset(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
    redirectTo: getAuthRedirectUrl(),
  })
  if (error) throw error
}

export async function updatePassword(password: string) {
  const { error } = await supabase.auth.updateUser({ password })
  if (error) throw error
}

export function mapAuthError(message: string): string {
  if (message === 'Invalid login credentials') return 'E-mail ou senha incorretos.'
  if (/rate limit/i.test(message)) return 'Aguarde alguns segundos antes de tentar novamente.'
  if (/password.*at least/i.test(message)) return 'A senha deve ter pelo menos 6 caracteres.'
  if (/same.*password/i.test(message)) return 'A nova senha deve ser diferente da anterior.'
  return message
}
