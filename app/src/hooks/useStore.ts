import { useCallback, useEffect, useState } from 'react'
import type { AppStore } from '../../shared/types/store'
import type { EvidenceInput } from '../../shared/domain/evidence'
import { DEFAULT_STORE } from '../../shared/types/store'
import { api } from '../services/api'

export type LoadStatus = 'loading' | 'ready' | 'error'
export type SaveStatus = 'idle' | 'saving' | 'success' | 'error'

export function useStore() {
  const [store, setStore] = useState<AppStore>(DEFAULT_STORE)
  const [loadStatus, setLoadStatus] = useState<LoadStatus>('loading')
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    api
      .getState()
      .then((data) => {
        if (!active) return
        setStore(data)
        setLoadStatus('ready')
      })
      .catch((err: Error) => {
        if (!active) return
        setError(err.message)
        setLoadStatus('error')
      })
    return () => {
      active = false
    }
  }, [])

  const persist = useCallback(async (next: AppStore) => {
    setSaveStatus('saving')
    setError(null)
    try {
      await api.saveState(next)
      setStore(next)
      setSaveStatus('success')
      setTimeout(() => setSaveStatus('idle'), 2000)
    } catch (err) {
      setSaveStatus('error')
      setError(err instanceof Error ? err.message : 'Falha ao salvar.')
      throw err
    }
  }, [])

  const toggleComplete = useCallback(
    async (resourceId: string) => {
      const completed = store.completed.includes(resourceId)
        ? store.completed.filter((id) => id !== resourceId)
        : [...store.completed, resourceId]
      await persist({ ...store, completed })
    },
    [persist, store],
  )

  const addEvidence = useCallback(
    async (input: EvidenceInput) => {
      setSaveStatus('saving')
      setError(null)
      try {
        const evidence = await api.addEvidence(input)
        const next = { ...store, evidences: [evidence, ...store.evidences] }
        setStore(next)
        setSaveStatus('success')
        setTimeout(() => setSaveStatus('idle'), 2000)
      } catch (err) {
        setSaveStatus('error')
        setError(err instanceof Error ? err.message : 'Falha ao salvar evidência.')
        throw err
      }
    },
    [store],
  )

  const deleteEvidence = useCallback(
    async (id: string) => {
      setSaveStatus('saving')
      setError(null)
      try {
        await api.deleteEvidence(id)
        const next = { ...store, evidences: store.evidences.filter((e) => e.id !== id) }
        setStore(next)
        setSaveStatus('success')
        setTimeout(() => setSaveStatus('idle'), 2000)
      } catch (err) {
        setSaveStatus('error')
        setError(err instanceof Error ? err.message : 'Falha ao remover evidência.')
        throw err
      }
    },
    [store],
  )

  const saveQuiz = useCallback(
    async (weekId: number, score: number) => {
      await persist({ ...store, quizzes: { ...store.quizzes, [String(weekId)]: score } })
    },
    [persist, store],
  )

  const saveScores = useCallback(async () => {
    await persist(store)
  }, [persist, store])

  const updateScore = useCallback((index: number, value: number) => {
    setStore((prev) => ({ ...prev, scores: { ...prev.scores, [String(index)]: value } }))
  }, [])

  const setTheme = useCallback(
    async (theme: 'light' | 'dark') => {
      await persist({ ...store, theme })
      document.documentElement.dataset.theme = theme
    },
    [persist, store],
  )

  useEffect(() => {
    document.documentElement.dataset.theme = store.theme
  }, [store.theme])

  const exportProgress = useCallback(() => {
    const payload = { exportedAt: new Date().toISOString(), ...store }
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `growth-lab-progresso-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }, [store])

  return {
    store,
    loadStatus,
    saveStatus,
    error,
    toggleComplete,
    addEvidence,
    deleteEvidence,
    saveQuiz,
    saveScores,
    updateScore,
    setTheme,
    exportProgress,
  }
}
