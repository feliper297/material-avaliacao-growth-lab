import type { AppStore } from '../types/store'
import { SCORE_DIMENSIONS } from '../types/store'
import type { QuizItem, TrailWeek } from '../data/weeks'
import type { Evaluation } from '../types/evaluation'

export function getAllResourceIds(weekResources: { id: string }[][]): string[] {
  return weekResources.flat().map((r) => r.id)
}

export function resourceHasQuiz(
  resourceId: string,
  quizzes: Record<string, QuizItem[]>,
): boolean {
  return (quizzes[resourceId]?.length ?? 0) > 0
}

export function getOverallProgress(completedCount: number, totalResources: number): number {
  if (totalResources === 0) return 0
  return Math.round((completedCount / totalResources) * 100)
}

/**
 * Conta apenas os ids de `completed` que ainda existem no catálogo atual.
 * Conteúdos removidos da trilha continuam marcados no histórico do usuário
 * (`completed` nunca é limpo ao editar o catálogo), então contar o array
 * bruto infla o numerador e passa de 100%.
 */
export function countValidCompleted(completed: string[], resourceIds: Iterable<string>): number {
  const validIds = resourceIds instanceof Set ? resourceIds : new Set(resourceIds)
  return completed.filter((id) => validIds.has(id)).length
}

export function getWeekProgress(
  week: { id: number; resources: { id: string }[] },
  store: Pick<AppStore, 'completed' | 'evidences' | 'quizzes'>,
  quizzes: Record<string, QuizItem[]> = {},
): number {
  const resourceCount = week.resources.length
  const done = week.resources.filter((r) => store.completed.includes(r.id)).length
  const quizzesRequired = week.resources.filter((r) => resourceHasQuiz(r.id, quizzes)).length
  const quizzesDone = week.resources.filter(
    (r) => resourceHasQuiz(r.id, quizzes) && store.quizzes[r.id] != null,
  ).length
  const evidenceDone = store.evidences.some((e) => e.week === week.id) ? 1 : 0
  const total = resourceCount + quizzesRequired + 1
  if (total === 0) return 0
  return Math.round(((done + quizzesDone + evidenceDone) / total) * 100)
}

/** Semana fechada: todos os conteúdos selecionados marcados como concluídos. */
export function isWeekClosed(
  week: TrailWeek,
  store: Pick<AppStore, 'completed'>,
): boolean {
  if (week.resources.length === 0) return false
  return week.resources.every((resource) => store.completed.includes(resource.id))
}

/** Avaliação final concluída: registro salvo com todas as dimensões pontuadas. */
export function isFinalEvaluationComplete(evaluation: Evaluation | null): boolean {
  if (!evaluation) return false
  return SCORE_DIMENSIONS.every((_, index) => evaluation.scores[String(index)] != null)
}

export function calculateAverage(scores: Record<string, number>, dimensionCount: number): number {
  if (dimensionCount === 0) return 0
  let sum = 0
  for (let i = 0; i < dimensionCount; i++) {
    sum += Number(scores[String(i)] ?? 3)
  }
  return sum / dimensionCount
}

export function getCycleStatus(progress: number): string {
  if (progress >= 100) return 'Ciclo concluído'
  if (progress >= 50) return 'Em evolução'
  return 'Ciclo iniciado'
}
