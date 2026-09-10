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

export const PASSWORD_RESET_RESEND_COOLDOWN_SEC = 60

export function parseRateLimitSeconds(message: string): number | null {
  const match = message.match(/after\s+(\d+)\s+seconds?/i)
  if (!match) return null
  const seconds = Number(match[1])
  return Number.isFinite(seconds) && seconds > 0 ? seconds : null
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
  if (/rate limit/i.test(message) || /after\s+\d+\s+seconds?/i.test(message)) {
    const seconds = parseRateLimitSeconds(message)
    if (seconds != null) {
      return `Aguarde ${seconds} segundos antes de solicitar um novo link.`
    }
    return 'Aguarde alguns segundos antes de solicitar um novo link.'
  }
  if (/password.*at least/i.test(message)) return 'A senha deve ter pelo menos 6 caracteres.'
  if (/same.*password/i.test(message)) return 'A nova senha deve ser diferente da anterior.'
  return message
}
