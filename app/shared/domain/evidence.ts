import type { Evidence } from '../types/store'

export interface EvidenceInput {
  week: number
  type: string
  title: string
  url?: string
  description: string
}

export function validateEvidence(input: EvidenceInput): string[] {
  const errors: string[] = []
  if (!input.title.trim()) errors.push('Título é obrigatório.')
  if (!input.description.trim()) errors.push('Descrição é obrigatória.')
  if (input.week < 1 || input.week > 4) errors.push('Semana inválida.')
  if (input.url?.trim()) {
    try {
      const parsed = new URL(input.url.trim())
      if (!['http:', 'https:'].includes(parsed.protocol)) {
        errors.push('URL deve usar http ou https.')
      }
    } catch {
      errors.push('URL inválida.')
    }
  }
  return errors
}

export function createEvidence(input: EvidenceInput, id: string): Evidence {
  return {
    id,
    week: input.week,
    type: input.type,
    title: input.title.trim(),
    url: input.url?.trim() || undefined,
    description: input.description.trim(),
    createdAt: new Date().toISOString(),
  }
}
