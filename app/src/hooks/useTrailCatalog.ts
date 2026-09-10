import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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
  const [draftPreview, setDraftPreview] = useState<TrailCatalog | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const hasLoadedOnceRef = useRef(false)

  const reload = useCallback(async () => {
    if (!enabled) {
      setCatalog(getDefaultTrailCatalog())
      setLoading(false)
      hasLoadedOnceRef.current = false
      return
    }

    const isInitialLoad = !hasLoadedOnceRef.current
    if (isInitialLoad) {
      setLoading(true)
    }
    setError(null)
    try {
      const next = await fetchTrailCatalog()
      setCatalog(next)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao carregar trilha.')
      setCatalog(getDefaultTrailCatalog())
    } finally {
      if (isInitialLoad) {
        setLoading(false)
      }
      hasLoadedOnceRef.current = true
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
      setDraftPreview(null)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Falha ao salvar trilha.'
      setError(message)
      throw err
    } finally {
      setSaving(false)
    }
  }, [])

  const weeks = catalog.weeks
  const quizzes = catalog.quizzes
  const allResourceIds = useMemo(() => getAllResourceIdsFromWeeks(weeks), [weeks])

  const getResourceQuiz = useCallback(
    (resourceId: string) => getResourceQuizFromCatalog(resourceId, quizzes),
    [quizzes],
  )

  return {
    weeks,
    quizzes,
    allResourceIds,
    draftPreview,
    setDraftPreview,
    loading,
    saving,
    error,
    reload,
    saveCatalog,
    getResourceQuiz,
  }
}
