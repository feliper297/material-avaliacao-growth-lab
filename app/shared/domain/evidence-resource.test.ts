import { describe, expect, it } from 'vitest'
import { WEEKS } from '../data/weeks'
import { resolveEvidenceResourceId } from './evidence-resource'

describe('resolveEvidenceResourceId', () => {
  const week1 = WEEKS[0]

  it('maps variants evidence to Create and Use Variants', () => {
    const resourceId = resolveEvidenceResourceId(
      {
        id: '1',
        week: 1,
        resourceId: 'w1-components',
        type: 'Figma',
        title: 'Variantes e componentes feito por IA no Figma',
        description: 'Teste',
        attachments: [],
        createdAt: '2026-01-01',
      },
      week1,
    )

    expect(resourceId).toBe('w1-variants')
  })

  it('maps front-end improvement evidence to Guide to Components', () => {
    const resourceId = resolveEvidenceResourceId(
      {
        id: '6',
        week: 1,
        type: 'Antes e depois',
        title: 'Melhoria no front da plataforma de Gestão',
        description: 'Antes: https://peoplehub.convem.me/admin Depois: https://plataforma-gestao-two.vercel.app/',
        attachments: [],
        createdAt: '2026-08-14',
      },
      week1,
    )

    expect(resourceId).toBe('w1-components')
  })

  it('maps design system evidence to Design System content', () => {
    const resourceId = resolveEvidenceResourceId(
      {
        id: '2',
        week: 1,
        type: 'Figma',
        title: 'Design system do projeto de gestão',
        description: 'Teste',
        attachments: [],
        createdAt: '2026-01-01',
      },
      week1,
    )

    expect(resourceId).toBe('w1-design-system')
  })

  it('maps GitHub evidences to Sobre repositórios in week 3', () => {
    const week3 = WEEKS[2]

    expect(
      resolveEvidenceResourceId(
        {
          id: '3',
          week: 3,
          type: 'Documentação',
          title: 'Github do front melhorado do Projeto de Gestão',
          description: 'Teste',
          attachments: [],
          createdAt: '2026-01-01',
        },
        week3,
      ),
    ).toBe('w3-github-repos')

    expect(
      resolveEvidenceResourceId(
        {
          id: '4',
          week: 3,
          type: 'Documentação',
          title: 'GitHub deste projeto de Evolução',
          description: 'Teste',
          attachments: [],
          createdAt: '2026-01-01',
        },
        week3,
      ),
    ).toBe('w3-github-repos')
  })

  it('maps client-server document to Client–Server Overview in week 3', () => {
    const week3 = WEEKS[2]

    expect(
      resolveEvidenceResourceId(
        {
          id: '5',
          week: 3,
          type: 'Documentação',
          title: 'Documento de client server',
          description: 'Teste',
          attachments: [],
          createdAt: '2026-01-01',
        },
        week3,
      ),
    ).toBe('w3-client-server')
  })
})
