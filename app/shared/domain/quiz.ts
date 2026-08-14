import type { QuizResult, QuizResults } from '../types/store'

export function getQuizScore(value: QuizResults[string] | undefined): number | undefined {
  if (value == null) return undefined
  return typeof value === 'number' ? value : value.score
}

export function getQuizAnswers(value: QuizResults[string] | undefined): number[] | undefined {
  if (value == null || typeof value === 'number') return undefined
  return value.answers
}

export function hasQuizResult(value: QuizResults[string] | undefined): boolean {
  return value != null
}

export function createQuizResult(score: number, answers: number[]): QuizResult {
  return {
    score,
    answers,
    completedAt: new Date().toISOString(),
  }
}
