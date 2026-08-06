import { useState } from 'react'
import { buildPrompt } from '../../lib/promptTemplate'
import { Button } from '../ui/Button'

interface PromptPanelProps {
  topic: string
  link: string
  week: string
}

export function PromptPanel({ topic, link, week }: PromptPanelProps) {
  const [context, setContext] = useState('')
  const prompt = buildPrompt(topic, link, week, context.trim())

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(prompt)
    } catch {
      const area = document.createElement('textarea')
      area.value = prompt
      document.body.appendChild(area)
      area.select()
      document.execCommand('copy')
      area.remove()
    }
  }

  return (
    <div className="grid gap-3">
      <label className="grid gap-1 text-[11px] font-bold">
        Contexto da demanda real
        <textarea
          className="min-h-20 resize-y rounded-xl border border-line bg-surface-soft px-3 py-2.5 font-normal"
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="Ex.: Estou desenhando um dashboard financeiro..."
        />
      </label>
      <pre className="max-h-96 overflow-auto whitespace-pre-wrap rounded-2xl border border-line bg-surface-soft p-4 font-mono text-[11px] leading-relaxed">
        {prompt}
      </pre>
      <div className="flex flex-wrap justify-end gap-2">
        <Button onClick={copyPrompt}>Copiar prompt</Button>
        <a
          className="inline-flex items-center rounded-xl bg-text px-3 py-2 text-xs font-bold text-bg"
          href="https://chatgpt.com/studymode"
          target="_blank"
          rel="noreferrer"
        >
          Abrir Study Mode ↗
        </a>
      </div>
    </div>
  )
}
