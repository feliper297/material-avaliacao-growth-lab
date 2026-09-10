import { describe, expect, it } from 'vitest'
import { WEEKS } from '../data/weeks'
import {
  createDefaultResource,
  createDefaultWeek,
  createResourceId,
  createWeekId,
  getDefaultTrailCatalog,
  removeResourceFromCatalog,
  removeWeekFromCatalog,
  validateCatalog,
} from './trail-catalog'

describe('getDefaultTrailCatalog', () => {
  it('clones weeks and quizzes from static seed', () => {
    const catalog = getDefaultTrailCatalog()
    expect(catalog.weeks.length).toBeGreaterThan(0)
    expect(catalog.weeks).not.toBe(WEEKS)
    expect(Object.keys(catalog.quizzes).length).toBeGreaterThan(0)
  })
})

describe('createWeekId', () => {
  it('returns next id after max existing week', () => {
    expect(createWeekId([{ id: 1 }, { id: 4 }] as never)).toBe(5)
    expect(createWeekId([])).toBe(1)
  })
})

describe('createResourceId', () => {
  it('generates stable week-prefixed ids', () => {
    expect(createResourceId(2)).toMatch(/^w2-custom-[a-z0-9]+$/)
  })
})

describe('createDefaultWeek', () => {
  it('creates week with trimmed fields', () => {
    const week = createDefaultWeek([], { title: '  Nova  ', objective: '  Objetivo  ' })
    expect(week.title).toBe('Nova')
    expect(week.objective).toBe('Objetivo')
    expect(week.id).toBe(1)
  })
})

describe('createDefaultResource', () => {
  it('fills defaults for optional fields', () => {
    const resource = createDefaultResource(1, {
      title: 'Guia',
      topic: 'Intro',
      url: 'https://example.com',
    })
    expect(resource.source).toBe('Referência')
    expect(resource.type).toBe('Conteúdo')
    expect(resource.duration).toBe('10 min')
  })
})

describe('removeWeekFromCatalog', () => {
  it('removes week and linked quizzes', () => {
    const catalog = getDefaultTrailCatalog()
    const weekId = catalog.weeks[0].id
    const resourceIds = catalog.weeks[0].resources.map((r) => r.id)
    const next = removeWeekFromCatalog(catalog, weekId)
    expect(next.weeks.some((w) => w.id === weekId)).toBe(false)
    resourceIds.forEach((id) => {
      expect(next.quizzes[id]).toBeUndefined()
    })
  })
})

describe('removeResourceFromCatalog', () => {
  it('removes resource and quiz entry', () => {
    const catalog = getDefaultTrailCatalog()
    const resourceId = catalog.weeks[0].resources[0].id
    const next = removeResourceFromCatalog(catalog, resourceId)
    expect(next.weeks[0].resources.some((r) => r.id === resourceId)).toBe(false)
    expect(next.quizzes[resourceId]).toBeUndefined()
  })
})

describe('validateCatalog', () => {
  it('accepts default catalog', () => {
    expect(validateCatalog(getDefaultTrailCatalog())).toEqual([])
  })

  it('rejects empty week title and invalid quiz', () => {
    const catalog = getDefaultTrailCatalog()
    catalog.weeks[0].title = ''
    catalog.quizzes['bad'] = [{ q: '', options: ['a'], answer: 5 }]
    const errors = validateCatalog(catalog)
    expect(errors.length).toBeGreaterThan(0)
  })
})
