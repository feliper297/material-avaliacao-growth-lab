import { useCallback, useEffect, useState } from 'react'
import type { Evaluation, Profile } from '../../shared/types/evaluation'
import { evaluationApi } from '../services/evaluationApi'

export function useEvaluations(learnerId: string | null, enabled: boolean) {
  const [evaluations, setEvaluations] = useState<Evaluation[]>([])
  const [learners, setLearners] = useState<Profile[]>([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    if (!enabled) return
    setLoading(true)
    setError(null)
    try {
      const learnerList = await evaluationApi.listLearners()
      setLearners(learnerList)

      if (learnerId) {
        const data = await evaluationApi.getEvaluations(learnerId)
        setEvaluations(data)
      } else {
        setEvaluations([])
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao carregar avaliações.')
    } finally {
      setLoading(false)
    }
  }, [enabled, learnerId])

  useEffect(() => {
    load()
  }, [load])

  const getWeekEvaluation = useCallback(
    (week: number) => evaluations.find((e) => e.scope === 'week' && e.week === week),
    [evaluations],
  )

  const finalEvaluation = evaluations.find((e) => e.scope === 'final') ?? null

  const saveWeekEvaluation = useCallback(
    async (week: number, overall: number, notes: string) => {
      if (!learnerId) return
      setSaving(true)
      setError(null)
      try {
        const saved = await evaluationApi.saveWeekEvaluation({ learnerId, week, overall, notes })
        setEvaluations((prev) => {
          const rest = prev.filter((e) => !(e.scope === 'week' && e.week === week))
          return [...rest, saved]
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Falha ao salvar avaliação.')
        throw err
      } finally {
        setSaving(false)
      }
    },
    [learnerId],
  )

  const saveFinalEvaluation = useCallback(
    async (scores: Record<string, number>, notes: string) => {
      if (!learnerId) return
      setSaving(true)
      setError(null)
      try {
        const saved = await evaluationApi.saveFinalEvaluation({ learnerId, scores, notes })
        setEvaluations((prev) => [...prev.filter((e) => e.scope !== 'final'), saved])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Falha ao salvar avaliação final.')
        throw err
      } finally {
        setSaving(false)
      }
    },
    [learnerId],
  )

  return {
    evaluations,
    learners,
    loading,
    saving,
    error,
    getWeekEvaluation,
    finalEvaluation,
    saveWeekEvaluation,
    saveFinalEvaluation,
    reload: load,
  }
}
