import { useCallback, useEffect, useState } from 'react'
import type { BackOfficeStats, UpdateBackOfficeUserInput } from '../../shared/types/backoffice'
import { backofficeApi } from '../services/backofficeApi'

export function useBackOffice(enabled: boolean) {
  const [stats, setStats] = useState<BackOfficeStats | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const load = useCallback(async () => {
    if (!enabled) return
    setLoading(true)
    setError(null)
    try {
      const data = await backofficeApi.getStats()
      setStats(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao carregar back office.')
    } finally {
      setLoading(false)
    }
  }, [enabled])

  const updateUser = useCallback(async (input: UpdateBackOfficeUserInput) => {
    setSaving(true)
    setError(null)
    try {
      await backofficeApi.updateUser(input)
      await load()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Falha ao atualizar usuário.'
      setError(message)
      throw new Error(message)
    } finally {
      setSaving(false)
    }
  }, [load])

  useEffect(() => {
    load()
  }, [load])

  return { stats, loading, error, saving, reload: load, updateUser }
}
