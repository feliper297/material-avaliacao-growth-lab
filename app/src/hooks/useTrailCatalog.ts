import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  getAllResourceIdsFromWeeks,
  getDefaultTrailCatalog,
  getResourceQuizFromCatalog,
} from '../../shared/domain/trail-catalog'
import type { TrailCatalog } from '../../shared/types/trail-catalog'
import type { TrailCatalogContextValue } from '../context/TrailCatalogContext'
import { fetchTrailCatalog, saveTrailCatalog } from '../services/trailCatalogApi'

export function useTrailCatalog(enabled: boolean): TrailCatalogContextValue {
  const [catalog, setCatalog] = useState<TrailCatalog>(() => getDefaultTrailCatalog())
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const reload = useCallback(async () => {
    if (!enabled) {
      setCatalog(getDefaultTrailCatalog())
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)
    try {
      const next = await fetchTrailCatalog()
      setCatalog(next)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao carregar trilha.')
      setCatalog(getDefaultTrailCatalog())
    } finally {
      setLoading(false)
    }
  }, [enabled])

  useEffect(() => {
    void reload()
  }, [reload])

  const saveCatalog = useCallback(async (next: TrailCatalog) => {
    setSaving(true)
    setError(null)
    try {
      const saved = await saveTrailCatalog(next)
      setCatalog(saved)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Falha ao salvar trilha.'
      setError(message)
      throw err
    } finally {
      setSaving(false)
    }
  }, [])

  const weeks = useMemo(() => catalog.weeks, [catalog.weeks])
  const quizzes = useMemo(() => catalog.quizzes, [catalog.quizzes])
  const allResourceIds = useMemo(() => getAllResourceIdsFromWeeks(weeks), [weeks])

  const getResourceQuiz = useCallback(
    (resourceId: string) => getResourceQuizFromCatalog(resourceId, quizzes),
    [quizzes],
  )

  return {
    weeks,
    quizzes,
    allResourceIds,
    loading,
    saving,
    error,
    reload,
    saveCatalog,
    getResourceQuiz,
  }
}
