import { useCallback, useEffect, useState } from 'react'
import type { AuthChangeEvent, Session } from '@supabase/supabase-js'
import { isRecoveryCallback } from '../services/authApi'
import { isSupabaseConfigured, supabase } from '../lib/supabase'

export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated'

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null)
  const [status, setStatus] = useState<AuthStatus>('loading')
  const [recoveryMode, setRecoveryMode] = useState(isRecoveryCallback())

  const applyAuthState = useCallback((event: AuthChangeEvent | 'INIT', newSession: Session | null) => {
    const fromRecoveryLink = isRecoveryCallback() || event === 'PASSWORD_RECOVERY'

    if (fromRecoveryLink && newSession) {
      setRecoveryMode(true)
      setSession(newSession)
      setStatus('authenticated')
      return
    }

    setRecoveryMode(false)
    setSession(newSession)
    setStatus(newSession ? 'authenticated' : 'unauthenticated')
  }, [])

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setStatus('unauthenticated')
      return
    }

    supabase.auth.getSession().then(({ data }) => {
      applyAuthState('INIT', data.session)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, newSession) => {
      applyAuthState(event, newSession)
    })

    return () => subscription.unsubscribe()
  }, [applyAuthState])

  async function signOut() {
    await supabase.auth.signOut()
    setRecoveryMode(false)
  }

  function completePasswordRecovery() {
    setRecoveryMode(false)
  }

  return { session, status, recoveryMode, signOut, completePasswordRecovery }
}
