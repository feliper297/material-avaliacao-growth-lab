import { describe, expect, it } from 'vitest'
import { validateEvidence } from './evidence'

describe('validateEvidence', () => {
  it('requires title and description', () => {
    expect(validateEvidence({ week: 1, type: 'Figma', title: '', description: '' })).toContain(
      'Título é obrigatório.',
    )
  })

  it('rejects invalid week', () => {
    expect(validateEvidence({ week: 9, type: 'Figma', title: 'Ok', description: 'Ok' })).toContain(
      'Semana inválida.',
    )
  })
})
