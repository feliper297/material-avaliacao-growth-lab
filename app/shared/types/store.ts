export interface Evidence {
  id: string
  week: number
  type: string
  title: string
  url?: string
  description: string
  createdAt: string
}

export interface AppStore {
  completed: string[]
  evidences: Evidence[]
  scores: Record<string, number>
  quizzes: Record<string, number>
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
