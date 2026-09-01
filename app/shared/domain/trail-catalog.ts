import { RESOURCE_QUIZZES } from '../data/resource-quizzes'
import { WEEKS, type QuizItem, type TrailResource, type TrailWeek } from '../data/weeks'
import type { TrailCatalog } from '../types/trail-catalog'

/** Id do único conteúdo que já nasce com teste criado, como exemplo do fluxo. */
const EXAMPLE_QUIZ_RESOURCE_ID = 'w1-auto-layout'

export function getDefaultTrailCatalog(): TrailCatalog {
  const exampleQuiz = RESOURCE_QUIZZES[EXAMPLE_QUIZ_RESOURCE_ID]
  return {
    weeks: structuredClone(WEEKS),
    quizzes: exampleQuiz
      ? { [EXAMPLE_QUIZ_RESOURCE_ID]: structuredClone(exampleQuiz) }
      : {},
  }
}

export function getAllResourceIdsFromWeeks(weeks: TrailWeek[]): string[] {
  return weeks.flatMap((week) => week.resources.map((resource) => resource.id))
}

export function getResourceQuizFromCatalog(
  resourceId: string,
  quizzes: Record<string, QuizItem[]>,
): QuizItem[] {
  return quizzes[resourceId] ?? []
}

export function createWeekId(weeks: TrailWeek[]): number {
  const ids = weeks.map((week) => week.id)
  return ids.length === 0 ? 1 : Math.max(...ids) + 1
}

export function createResourceId(weekId: number): string {
  const suffix = Math.random().toString(36).slice(2, 8)
  return `w${weekId}-custom-${suffix}`
}

export function createDefaultResource(
  weekId: number,
  input: Pick<TrailResource, 'title' | 'topic' | 'url'> & Partial<TrailResource>,
): TrailResource {
  return {
    id: createResourceId(weekId),
    title: input.title.trim(),
    topic: input.topic.trim(),
    url: input.url.trim(),
    source: input.source?.trim() || 'Referência',
    type: input.type?.trim() || 'Conteúdo',
    duration: input.duration?.trim() || '10 min',
    icon: input.icon?.trim() || 'ReadOutlined',
    practicalTasks: input.practicalTasks,
  }
}

export function createDefaultWeek(
  weeks: TrailWeek[],
  input: { title: string; objective: string; resources?: TrailResource[] },
): TrailWeek {
  const id = createWeekId(weeks)
  return {
    id,
    title: input.title.trim(),
    objective: input.objective.trim(),
    cover: `week-${id}`,
    deliverables: [],
    resources: input.resources ?? [],
  }
}

export function removeWeekFromCatalog(catalog: TrailCatalog, weekId: number): TrailCatalog {
  const weeks = catalog.weeks.filter((week) => week.id !== weekId)
  const removedResourceIds = new Set(
    catalog.weeks.find((week) => week.id === weekId)?.resources.map((r) => r.id) ?? [],
  )
  const quizzes = { ...catalog.quizzes }
  removedResourceIds.forEach((resourceId) => {
    delete quizzes[resourceId]
  })
  return { weeks, quizzes }
}

export function removeResourceFromCatalog(catalog: TrailCatalog, resourceId: string): TrailCatalog {
  const weeks = catalog.weeks.map((week) => ({
    ...week,
    resources: week.resources.filter((resource) => resource.id !== resourceId),
  }))
  const quizzes = { ...catalog.quizzes }
  delete quizzes[resourceId]
  return { weeks, quizzes }
}

export function validateCatalog(catalog: TrailCatalog): string[] {
  const errors: string[] = []

  if (catalog.weeks.length === 0) {
    errors.push('Adicione pelo menos uma semana.')
  }

  catalog.weeks.forEach((week) => {
    if (!week.title.trim()) errors.push(`Semana ${week.id}: nome obrigatório.`)
    if (!week.objective.trim()) errors.push(`Semana ${week.id}: descrição obrigatória.`)

    week.resources.forEach((resource) => {
      if (!resource.title.trim()) {
        errors.push(`Conteúdo em "${week.title}": nome obrigatório.`)
      }
      if (!resource.topic.trim()) {
        errors.push(`"${resource.title}": descrição obrigatória.`)
      }
      if (!resource.url.trim()) {
        errors.push(`"${resource.title}": link obrigatório.`)
      }
    })
  })

  Object.entries(catalog.quizzes).forEach(([resourceId, questions]) => {
    if (questions.length === 0) return
    questions.forEach((question, index) => {
      if (!question.q.trim()) {
        errors.push(`Teste ${resourceId}, pergunta ${index + 1}: enunciado obrigatório.`)
      }
      if (question.options.length < 2) {
        errors.push(`Teste ${resourceId}, pergunta ${index + 1}: mínimo 2 alternativas.`)
      }
      if (question.options.some((option) => !option.trim())) {
        errors.push(`Teste ${resourceId}, pergunta ${index + 1}: alternativas não podem ser vazias.`)
      }
      if (question.answer < 0 || question.answer >= question.options.length) {
        errors.push(`Teste ${resourceId}, pergunta ${index + 1}: resposta correta inválida.`)
      }
    })
  })

  return errors
}
