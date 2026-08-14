import { useEffect, useState } from 'react'
import type { Profile } from '../../shared/types/evaluation'
import { evaluationApi } from '../services/evaluationApi'

export function useProfile(email?: string) {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    async function load() {
      try {
        const data = email
          ? await evaluationApi.ensureProfile(email)
          : ((await evaluationApi.getProfile()) ?? null)
        if (active) setProfile(data)
      } catch {
        if (active) setProfile(null)
      } finally {
        if (active) setLoading(false)
      }
    }

    load()
    return () => {
      active = false
    }
  }, [email])

  const isAdmin = profile?.role === 'admin'

  return { profile, isAdmin, loading }
}
