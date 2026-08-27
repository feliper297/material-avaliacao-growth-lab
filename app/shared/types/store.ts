export interface EvidenceAttachment {
  id: string
  url: string
  name: string
  createdAt: string
}

export interface Evidence {
  id: string
  week: number
  type: string
  title: string
  url?: string
  description: string
  attachments: EvidenceAttachment[]
  createdAt: string
}

export interface QuizResult {
  score: number
  answers: number[]
  completedAt: string
}

/** Score legado (number) ou tentativa completa com respostas para revisão. */
export type QuizResults = Record<string, number | QuizResult>

export interface AppStore {
  completed: string[]
  evidences: Evidence[]
  scores: Record<string, number>
  quizzes: QuizResults
  theme: 'light' | 'dark'
}

export const SCORE_DIMENSIONS = [
  'Comunicação e bloqueios',
  'Qualidade de execução',
  'Raciocínio de produto',
  'Produtividade e previsibilidade',
  'Autonomia e iniciativa',
  'IA, documentação e visão técnica',
] as const

export const DEFAULT_STORE: AppStore = {
  completed: [],
  evidences: [],
  scores: {},
  quizzes: {},
  theme: 'light',
}
