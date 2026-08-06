import { type FormEvent, useState } from 'react'
import type { TrailWeek } from '../../../shared/data/weeks'
import { Button } from '../ui/Button'

interface QuizFormProps {
  week: TrailWeek
  onSubmit: (score: number) => Promise<void>
}

export function QuizForm({ week, onSubmit }: QuizFormProps) {
  const [result, setResult] = useState<string | null>(null)
  const [resultType, setResultType] = useState<'good' | 'warn'>('warn')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    let score = 0
    let answered = 0
    week.quiz.forEach((item, qi) => {
      const selected = (e.currentTarget.elements.namedItem(`q${qi}`) as RadioNodeList)?.value
      if (selected) {
        answered++
        if (Number(selected) === item.answer) score++
      }
    })
    if (answered < week.quiz.length) {
      setResultType('warn')
      setResult('Responda todas as perguntas antes de corrigir.')
      return
    }
    await onSubmit(score)
    setResultType(score >= 2 ? 'good' : 'warn')
    setResult(
      score === 3
        ? '3/3 — Bom domínio dos fundamentos. Agora comprove aplicando na sprint.'
        : `${score}/3 — Revise o conteúdo e converse com o tutor de IA sobre as respostas incorretas.`,
    )
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-3">
      {week.quiz.map((item, qi) => (
        <fieldset key={qi} className="rounded-2xl border border-line p-4">
          <legend className="mb-2 text-xs font-bold">
            {qi + 1}. {item.q}
          </legend>
          {item.options.map((option, oi) => (
            <label key={oi} className="flex cursor-pointer gap-2 rounded-lg px-2 py-1.5 text-[11px] hover:bg-surface-soft">
              <input type="radio" name={`q${qi}`} value={oi} />
              <span>{option}</span>
            </label>
          ))}
        </fieldset>
      ))}
      {result && (
        <p
          className={`rounded-xl px-3 py-2 text-xs font-bold ${resultType === 'good' ? 'bg-green-soft text-green' : 'bg-amber-soft text-amber'}`}
          role="status"
        >
          {result}
        </p>
      )}
      <div className="flex justify-end">
        <Button type="submit" variant="accent">
          Corrigir teste
        </Button>
      </div>
    </form>
  )
}
