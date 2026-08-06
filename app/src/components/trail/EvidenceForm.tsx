import { type FormEvent, useState } from 'react'
import { EVIDENCE_TYPES } from '../../../shared/data/weeks'
import type { EvidenceInput } from '../../../shared/domain/evidence'
import { Button } from '../ui/Button'

interface EvidenceFormProps {
  defaultWeek?: number
  loading?: boolean
  onSubmit: (input: EvidenceInput) => Promise<void>
  onCancel: () => void
}

export function EvidenceForm({ defaultWeek = 1, loading, onSubmit, onCancel }: EvidenceFormProps) {
  const [week, setWeek] = useState(defaultWeek)
  const [type, setType] = useState<string>(EVIDENCE_TYPES[0])
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    try {
      await onSubmit({ week, type, title, url, description })
      setTitle('')
      setUrl('')
      setDescription('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-3">
      {error && (
        <p className="rounded-xl bg-red-soft px-3 py-2 text-xs font-semibold text-red" role="alert">
          {error}
        </p>
      )}
      <label className="grid gap-1 text-[11px] font-bold">
        Semana
        <select
          className="rounded-xl border border-line bg-surface-soft px-3 py-2.5"
          value={week}
          onChange={(e) => setWeek(Number(e.target.value))}
        >
          {[1, 2, 3, 4].map((w) => (
            <option key={w} value={w}>
              Semana {w}
            </option>
          ))}
        </select>
      </label>
      <label className="grid gap-1 text-[11px] font-bold">
        Tipo de evidência
        <select
          className="rounded-xl border border-line bg-surface-soft px-3 py-2.5"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          {EVIDENCE_TYPES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>
      <label className="grid gap-1 text-[11px] font-bold">
        Título
        <input
          required
          className="rounded-xl border border-line bg-surface-soft px-3 py-2.5"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex.: Refatoração do fluxo de estorno"
        />
      </label>
      <label className="grid gap-1 text-[11px] font-bold">
        Link
        <input
          type="url"
          className="rounded-xl border border-line bg-surface-soft px-3 py-2.5"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://..."
        />
      </label>
      <label className="grid gap-1 text-[11px] font-bold">
        O que foi aplicado e o que mudou?
        <textarea
          required
          className="min-h-24 resize-y rounded-xl border border-line bg-surface-soft px-3 py-2.5"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descreva o problema, o conceito aplicado, a mudança realizada e o resultado observado."
        />
      </label>
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" variant="accent" loading={loading}>
          Salvar evidência
        </Button>
      </div>
    </form>
  )
}
