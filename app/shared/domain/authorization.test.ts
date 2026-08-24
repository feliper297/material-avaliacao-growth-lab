import { describe, expect, it } from 'vitest'
import {
  AuthorizationError,
  assertAdmin,
  assertLearnerAccess,
  canAccessLearnerData,
} from './authorization'

const admin = { userId: 'admin-1', role: 'admin' as const }
const learnerA = { userId: 'learner-a', role: 'learner' as const }
const learnerB = { userId: 'learner-b', role: 'learner' as const }

describe('canAccessLearnerData', () => {
  it('permite o próprio participante', () => {
    expect(canAccessLearnerData(learnerA, 'learner-a')).toBe(true)
  })

  it('nega participante acessando outro id (IDOR)', () => {
    expect(canAccessLearnerData(learnerA, 'learner-b')).toBe(false)
  })

  it('permite admin acessar qualquer participante', () => {
    expect(canAccessLearnerData(admin, 'learner-b')).toBe(true)
  })
})

describe('assertAdmin', () => {
  it('bloqueia participante em rota administrativa', () => {
    expect(() => assertAdmin(learnerA)).toThrow(AuthorizationError)
    try {
      assertAdmin(learnerA)
    } catch (error) {
      expect((error as AuthorizationError).status).toBe(403)
    }
  })
})

describe('assertLearnerAccess', () => {
  it('bloqueia IDOR entre participantes', () => {
    expect(() => assertLearnerAccess(learnerA, learnerB.userId)).toThrow(AuthorizationError)
  })
})
