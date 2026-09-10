import type { PracticalTask, TrailWeek } from '../data/weeks'
import type { Evidence } from '../types/store'

function normalizeTitle(value: string): string {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim()
}

export function evidenceMatchesTask(evidence: Evidence, task: PracticalTask): boolean {
  const evidenceTitle = normalizeTitle(evidence.title)
  const taskTitle = normalizeTitle(task.title)

  if (evidenceTitle === taskTitle) return true
  if (evidenceTitle.includes(taskTitle) || taskTitle.includes(evidenceTitle)) return true

  const aliases: Record<string, string[]> = {
    'w1-variants-practice': [
      'variantes e componentes no figma',
      'variantes e componentes feito por ia no figma',
      'variantes e componentes feitos por ia no figma',
      'yano',
    ],
    'w1-design-system-practice': ['design system do projeto de gestao', 'design system gestao'],
    'w1-auto-layout-practice': ['auditoria de auto layout', 'auto layout tela real'],
    'w1-components-practice': [
      'componentes e instancias',
      'guide to components',
      'melhoria no front',
      'melhoria no front da plataforma',
      'plataforma de gestao',
      'front da plataforma de gestao',
    ],
    'w2-problem-framing-practice': [
      'problem framing',
      '5 porques',
      'cinco porques',
      'tecnica dos 5',
      'tecnica dos cinco',
      'porques no projeto',
    ],
    'w2-journeys-flows-practice': [
      'jornada do usuario',
      'jornada e fluxo',
      'userflow',
      'user flow',
      'user journeys',
      'user journeys vs',
      'fluxo diferenciados',
    ],
    'w2-empty-states-practice': [
      'empty state',
      'empty stats',
      'estados vazios',
      'matriz de estados',
      'casos de borda',
    ],
    'w3-github-repos-practice': [
      'github',
      'github do front',
      'github deste projeto',
      'projeto de gestao',
      'projeto de evolucao',
      'repositorio',
      'front melhorado',
    ],
    'w3-client-server-practice': [
      'client server',
      'cliente server',
      'cliente servidor',
      'client-server',
      'cliente-servidor',
      'diagrama simplificado',
      'arquitetura client',
      'documento de client',
    ],
  }

  return (aliases[task.id] ?? []).some((alias) => evidenceTitle.includes(normalizeTitle(alias)))
}

const RESOURCE_TITLE_PATTERNS: Record<string, string[]> = {
  'w3-github-repos': ['github', 'repositorio'],
  'w3-client-server': ['client server', 'cliente server', 'cliente servidor', 'client-server', 'cliente-servidor'],
}

function matchResourceByEvidenceTitle(evidence: Evidence, week: TrailWeek): string | undefined {
  const evidenceTitle = normalizeTitle(evidence.title)

  for (const resource of week.resources) {
    const patterns = RESOURCE_TITLE_PATTERNS[resource.id]
    if (patterns?.some((pattern) => evidenceTitle.includes(normalizeTitle(pattern)))) {
      return resource.id
    }
  }

  return undefined
}

function evidenceBelongsToWeekView(evidence: Evidence, week: TrailWeek, resourceId: string): boolean {
  if (evidence.week === week.id) return true

  if (
    evidence.resourceId === resourceId &&
    week.resources.some((resource) => resource.id === resourceId)
  ) {
    return true
  }

  // Evidências GitHub/repositório registradas em outra semana aparecem na Semana 3.
  if (week.id === 3 && resourceId === 'w3-github-repos') {
    const title = normalizeTitle(evidence.title)
    return title.includes('github') || title.includes('repositorio')
  }

  return false
}

export function resolveEvidenceResourceId(evidence: Evidence, week: TrailWeek): string | undefined {
  for (const resource of week.resources) {
    for (const task of resource.practicalTasks ?? []) {
      if (evidenceMatchesTask(evidence, task)) return resource.id
    }
  }

  const byTitle = matchResourceByEvidenceTitle(evidence, week)
  if (byTitle) return byTitle

  if (evidence.resourceId && week.resources.some((resource) => resource.id === evidence.resourceId)) {
    return evidence.resourceId
  }

  return undefined
}

export function groupEvidencesByResource(
  evidences: Evidence[],
  week: TrailWeek,
): Map<string, Evidence[]> {
  const map = new Map<string, Evidence[]>()

  for (const evidence of evidences) {
    const resourceId = resolveEvidenceResourceId(evidence, week)
    if (!resourceId) continue
    if (!evidenceBelongsToWeekView(evidence, week, resourceId)) continue
    const list = map.get(resourceId) ?? []
    list.push(evidence)
    map.set(resourceId, list)
  }

  return map
}

export function orphanEvidencesForWeek(evidences: Evidence[], week: TrailWeek): Evidence[] {
  const grouped = groupEvidencesByResource(evidences, week)
  const groupedIds = new Set<string>()
  grouped.forEach((list) => list.forEach((evidence) => groupedIds.add(evidence.id)))

  return evidences.filter((evidence) => {
    if (evidence.week !== week.id) return false
    return !groupedIds.has(evidence.id)
  })
}

export function evidencesForTask(resourceEvidences: Evidence[], task: PracticalTask): Evidence[] {
  return resourceEvidences.filter((evidence) => evidenceMatchesTask(evidence, task))
}

export function unmatchedResourceEvidences(
  resourceEvidences: Evidence[],
  resource: TrailWeek['resources'][number],
): Evidence[] {
  return resourceEvidences.filter(
    (evidence) => !(resource.practicalTasks ?? []).some((task) => evidenceMatchesTask(evidence, task)),
  )
}
