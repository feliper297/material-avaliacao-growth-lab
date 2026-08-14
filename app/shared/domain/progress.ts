import type { AppStore } from '../types/store'

export function getAllResourceIds(weekResources: { id: string }[][]): string[] {
  return weekResources.flat().map((r) => r.id)
}

export function getOverallProgress(
  completedCount: number,
  totalResources: number,
  evidenceCount: number,
  targetEvidence = 8,
): number {
  if (totalResources === 0) return 0
  const resourceWeight = 70
  const evidenceWeight = 30
  const resourcePart = (completedCount / totalResources) * resourceWeight
  const evidencePart = Math.min(evidenceCount / targetEvidence, 1) * evidenceWeight
  return Math.round(resourcePart + evidencePart)
}

export function getWeekProgress(
  week: { id: number; resources: { id: string }[] },
  store: Pick<AppStore, 'completed' | 'evidences' | 'quizzes'>,
): number {
  const resourceCount = week.resources.length
  const done = week.resources.filter((r) => store.completed.includes(r.id)).length
  const quizzesDone = week.resources.filter((r) => store.quizzes[r.id] != null).length
  const evidenceDone = store.evidences.some((e) => e.week === week.id) ? 1 : 0
  const total = resourceCount * 2 + 1
  if (total === 0) return 0
  return Math.round(((done + quizzesDone + evidenceDone) / total) * 100)
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
