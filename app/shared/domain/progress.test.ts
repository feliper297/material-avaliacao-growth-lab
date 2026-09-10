import { describe, expect, it } from 'vitest'
import { WEEKS } from '../data/weeks'
import { SCORE_DIMENSIONS } from '../types/store'
import { calculateAverage, getOverallProgress, getWeekProgress, isFinalEvaluationComplete, isWeekClosed } from './progress'

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

describe('isWeekClosed', () => {
  it('returns true when all contents are marked complete', () => {
    const week = WEEKS[1]
    const store = {
      completed: week.resources.map((resource) => resource.id),
    }

    expect(isWeekClosed(week, store)).toBe(true)
  })

  it('returns false when a content is still pending', () => {
    const week = WEEKS[1]
    const store = {
      completed: week.resources.slice(1).map((resource) => resource.id),
    }

    expect(isWeekClosed(week, store)).toBe(false)
  })
})

describe('isFinalEvaluationComplete', () => {
  it('returns true when all dimensions are scored', () => {
    const evaluation = {
      id: '1',
      learnerId: 'u1',
      evaluatorId: 'u2',
      scope: 'final' as const,
      week: null,
      scores: Object.fromEntries(SCORE_DIMENSIONS.map((_, index) => [String(index), 4])),
      notes: 'Ok',
      attachments: [],
      updatedAt: '',
    }

    expect(isFinalEvaluationComplete(evaluation)).toBe(true)
  })

  it('returns false when evaluation is missing or incomplete', () => {
    expect(isFinalEvaluationComplete(null)).toBe(false)
    expect(
      isFinalEvaluationComplete({
        id: '1',
        learnerId: 'u1',
        evaluatorId: 'u2',
        scope: 'final',
        week: null,
        scores: { '0': 4 },
        notes: '',
        attachments: [],
        updatedAt: '',
      }),
    ).toBe(false)
  })
})

describe('calculateAverage', () => {
  it('defaults missing scores to 3', () => {
    expect(calculateAverage({}, 6)).toBe(3)
  })
})
