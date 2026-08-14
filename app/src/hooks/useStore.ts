import { useCallback, useEffect, useState } from 'react'
import type { AppStore } from '../../shared/types/store'
import type { EvidenceInput } from '../../shared/domain/evidence'
import { DEFAULT_STORE } from '../../shared/types/store'
import { supabaseApi as api } from '../services/supabaseApi'

export type LoadStatus = 'loading' | 'ready' | 'error' | 'idle'
export type SaveStatus = 'idle' | 'saving' | 'success' | 'error'

interface UseStoreOptions {
  readOnly?: boolean
}

export function useStore(userId: string | null, options: UseStoreOptions = {}) {
  const { readOnly = false } = options
  const [store, setStore] = useState<AppStore>(DEFAULT_STORE)
  const [loadStatus, setLoadStatus] = useState<LoadStatus>(userId ? 'loading' : 'idle')
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) {
      setStore(DEFAULT_STORE)
      setLoadStatus('idle')
      return
    }

    let active = true
    setLoadStatus('loading')
    setError(null)

    api
      .getState(userId)
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
  }, [userId])

  const persist = useCallback(
    async (next: AppStore) => {
      if (readOnly) return
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
    },
    [readOnly],
  )

  const toggleComplete = useCallback(
    async (resourceId: string) => {
      if (readOnly) return
      const completed = store.completed.includes(resourceId)
        ? store.completed.filter((id) => id !== resourceId)
        : [...store.completed, resourceId]
      await persist({ ...store, completed })
    },
    [persist, readOnly, store],
  )

  const addEvidence = useCallback(
    async (input: EvidenceInput) => {
      if (readOnly) return
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
    [readOnly, store],
  )

  const deleteEvidence = useCallback(
    async (id: string) => {
      if (readOnly) return
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
    [readOnly, store],
  )

  const saveQuiz = useCallback(
    async (weekId: number, score: number) => {
      if (readOnly) return
      await persist({ ...store, quizzes: { ...store.quizzes, [String(weekId)]: score } })
    },
    [persist, readOnly, store],
  )

  const setTheme = useCallback(
    async (theme: 'light' | 'dark') => {
      if (readOnly) {
        setStore((prev) => ({ ...prev, theme }))
        return
      }
      await persist({ ...store, theme })
    },
    [persist, readOnly, store],
  )

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
    setTheme,
    exportProgress,
    readOnly,
  }
}
