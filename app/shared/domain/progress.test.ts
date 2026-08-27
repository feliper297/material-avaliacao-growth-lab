import { describe, expect, it } from 'vitest'
import { calculateAverage, getOverallProgress, getWeekProgress } from './progress'

describe('getOverallProgress', () => {
  it('returns 0 when no resources', () => {
    expect(getOverallProgress(0, 0)).toBe(0)
  })

  it('reflects only completed contents', () => {
    expect(getOverallProgress(14, 14)).toBe(100)
    expect(getOverallProgress(0, 14)).toBe(0)
    expect(getOverallProgress(4, 14)).toBe(29)
  })
})

describe('getWeekProgress', () => {
  it('counts resources, quiz and evidence', () => {
    const week = {
      id: 1,
      resources: [{ id: 'a' }, { id: 'b' }, { id: 'c' }],
    }
    const store = {
      completed: ['a', 'b', 'c'],
      quizzes: { a: 3, b: 2, c: 3 },
      evidences: [{ id: '1', week: 1, type: 'Figma', title: 't', description: 'd', attachments: [], createdAt: '' }],
    }
    expect(getWeekProgress(week, store)).toBe(100)
  })
})

describe('calculateAverage', () => {
  it('defaults missing scores to 3', () => {
    expect(calculateAverage({}, 6)).toBe(3)
  })
})
