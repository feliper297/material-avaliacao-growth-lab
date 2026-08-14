import { useCallback, useEffect, useState } from 'react'
import type { BackOfficeStats } from '../../shared/types/backoffice'
import { backofficeApi } from '../services/backofficeApi'

export function useBackOffice(enabled: boolean) {
  const [stats, setStats] = useState<BackOfficeStats | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

  useEffect(() => {
    load()
  }, [load])

  return { stats, loading, error, reload: load }
}
