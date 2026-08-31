import type { Evidence, EvidenceAttachment } from '../types/store'

export interface EvidenceInput {
  week: number
  resourceId?: string
  type: string
  title: string
  url?: string
  description: string
  attachments?: EvidenceAttachment[]
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
    resourceId: input.resourceId,
    type: input.type,
    title: input.title.trim(),
    url: input.url?.trim() || undefined,
    description: input.description.trim(),
    attachments: input.attachments ?? [],
    createdAt: new Date().toISOString(),
  }
}
