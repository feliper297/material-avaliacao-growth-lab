export interface TrailResource {
  id: string
  title: string
  source: string
  type: string
  duration: string
  /** Key into the RESOURCE_ICONS map in WeekSection.tsx — one of @ant-design/icons' *Outlined components. */
  icon: string
  url: string
  topic: string
}

export interface QuizItem {
  q: string
  options: string[]
  answer: number
}

export interface TrailWeek {
  id: number
  title: string
  objective: string
  cover: string
  deliverables: string[]
  resources: TrailResource[]
}

export const WEEKS: TrailWeek[] = [
  {
    id: 1,
    title: 'Fundamentos e qualidade',
    objective: 'Dominar estrutura, consistência, atenção aos detalhes e organização no Figma.',
    cover: 'week-1',
    deliverables: [
      'Auditoria de uma tela real',
      'Antes e depois documentado',
      'Auto Layout e componentes corrigidos',
      'Justificativa da hierarquia visual',
    ],
    resources: [
      {
        id: 'w1-auto-layout',
        title: 'Guide to Auto Layout',
        source: 'Figma',
        type: 'Texto oficial',
        duration: '10–15 min',
        icon: 'TableOutlined',
        url: 'https://help.figma.com/hc/en-us/articles/360040451373-Guide-to-auto-layout',
        topic: 'Auto Layout, responsividade de componentes e comportamento com conteúdos variáveis.',
      },
      {
        id: 'w1-components',
        title: 'Guide to Components',
        source: 'Figma',
        type: 'Texto oficial',
        duration: '10 min',
        icon: 'BlockOutlined',
        url: 'https://help.figma.com/hc/en-us/articles/360038662654-Guide-to-components-in-Figma',
        topic: 'Componentes, instâncias, reutilização e consistência em Design Systems.',
      },
      {
        id: 'w1-variants',
        title: 'Create and Use Variants',
        source: 'Figma',
        type: 'Texto oficial',
        duration: '10 min',
        icon: 'GroupOutlined',
        url: 'https://help.figma.com/hc/en-us/articles/360056440594-Create-and-use-variants',
        topic: 'Propriedades, variantes, estados e organização de conjuntos de componentes.',
      },
      {
        id: 'w1-design-system',
        title: 'Design System',
        source: 'Figma',
        type: 'Texto oficial',
        duration: '12 min',
        icon: 'AppstoreOutlined',
        url: 'https://help.figma.com/hc/en-us/articles/360039238753-Guide-to-design-systems-in-Figma',
        topic:
          'Design System: tokens, bibliotecas compartilhadas, componentes reutilizáveis, governança, consistência visual e escalabilidade entre produtos.',
      },
    ],
  },
  {
    id: 2,
    title: 'Produto, jornada e estados',
    objective: 'Compreender o problema e representar a experiência antes de começar pelas telas.',
    cover: 'week-2',
    deliverables: [
      'Problem framing da demanda',
      'Jornada e fluxo diferenciados',
      'Matriz de estados e casos de borda',
      'Decisões fundamentadas',
    ],
    resources: [
      {
        id: 'w2-problem-framing',
        title: 'Problem Framing',
        source: 'Atlassian Team Playbook',
        type: 'Método prático',
        duration: '10 min',
        icon: 'AimOutlined',
        url: 'https://www.atlassian.com/team-playbook/plays/problem-framing',
        topic: 'Problem framing e diferenciação entre problema, evidência, hipótese, requisito e solução.',
      },
      {
        id: 'w2-journeys-flows',
        title: 'User Journeys vs. User Flows',
        source: 'Nielsen Norman Group',
        type: 'Artigo',
        duration: '4 min',
        icon: 'NodeIndexOutlined',
        url: 'https://www.nngroup.com/articles/user-journeys-vs-user-flows/',
        topic: 'Diferença entre jornada do usuário, fluxo da funcionalidade e sequência de telas.',
      },
      {
        id: 'w2-empty-states',
        title: 'Designing Empty States',
        source: 'Nielsen Norman Group',
        type: 'Artigo',
        duration: '7 min',
        icon: 'InboxOutlined',
        url: 'https://www.nngroup.com/articles/empty-state-interface-design/',
        topic: 'Estados vazios, primeiro uso, ausência de resultado, loading, erro e falta de permissão.',
      },
    ],
  },
  {
    id: 3,
    title: 'Sistemas, dados e arquitetura',
    objective: 'Entender como interface, backend, dados, APIs e falhas se conectam.',
    cover: 'week-3',
    deliverables: [
      'Diagrama simplificado do sistema',
      'Origem e destino dos dados',
      'Loading, sucesso, pendência e erro',
      'Dependências e permissões',
    ],
    resources: [
      {
        id: 'w3-client-server',
        title: 'Client–Server Overview',
        source: 'MDN',
        type: 'Texto técnico',
        duration: '15 min',
        icon: 'SwapOutlined',
        url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/First_steps/Client-Server_overview',
        topic: 'Cliente, servidor, frontend, backend, banco de dados, requisição e resposta.',
      },
      {
        id: 'w3-api',
        title: 'Introduction to Web APIs',
        source: 'MDN',
        type: 'Texto técnico',
        duration: '15 min',
        icon: 'ApiOutlined',
        url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Client-side_APIs/Introduction',
        topic: 'APIs, integrações, dados enviados, dados recebidos e dependências externas.',
      },
      {
        id: 'w3-http',
        title: 'HTTP Response Status Codes',
        source: 'MDN',
        type: 'Referência',
        duration: '10 min',
        icon: 'NumberOutlined',
        url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status',
        topic: 'Respostas do sistema e tradução de situações técnicas em comportamentos compreensíveis da interface.',
      },
      {
        id: 'w3-bff',
        title: 'Backends for Frontends (BFF)',
        source: 'Microsoft Learn',
        type: 'Padrão de arquitetura',
        duration: '10–12 min',
        icon: 'ClusterOutlined',
        url: 'https://learn.microsoft.com/pt-br/azure/architecture/patterns/backends-for-frontends',
        topic:
          'BFF: camada entre interface e APIs, adaptação de contratos por experiência, limites de responsabilidade e quando o padrão faz sentido.',
      },
    ],
  },
  {
    id: 4,
    title: 'IA, autonomia e entrega',
    objective: 'Usar IA para aprender, criticar e acelerar, mantendo julgamento e responsabilidade humana.',
    cover: 'week-4',
    deliverables: [
      'Demanda conduzida de ponta a ponta',
      'Prompts e decisões documentados',
      'Protótipo e handoff',
      'Autoavaliação comparativa',
    ],
    resources: [
      {
        id: 'w4-study-mode',
        title: 'Using Study Mode in ChatGPT',
        source: 'OpenAI',
        type: 'Guia oficial',
        duration: '8 min',
        icon: 'ReadOutlined',
        url: 'https://help.openai.com/en/articles/11780217-using-study-mode-in-chatgpt',
        topic: 'Aprendizagem socrática, perguntas progressivas, testes e correção de entendimento com IA.',
      },
      {
        id: 'w4-prompt',
        title: 'Prompt Engineering Best Practices',
        source: 'OpenAI',
        type: 'Guia oficial',
        duration: '7 min',
        icon: 'EditOutlined',
        url: 'https://help.openai.com/en/articles/10032626-prompt-engineering-best-practices-for-chatgpt',
        topic: 'Construção de prompts com objetivo, contexto, restrições, formato de saída e critérios de qualidade.',
      },
      {
        id: 'w4-figma-ai',
        title: 'Use AI Tools in Figma Design',
        source: 'Figma',
        type: 'Guia oficial',
        duration: '10 min',
        icon: 'RobotOutlined',
        url: 'https://help.figma.com/hc/en-us/articles/23870272542231-Use-AI-tools-in-Figma-Design',
        topic: 'IA aplicada à exploração, conteúdo, organização, prototipação e revisão crítica no Figma.',
      },
      {
        id: 'w4-dev-mode',
        title: 'Guide to Dev Mode',
        source: 'Figma',
        type: 'Bônus',
        duration: '10 min',
        icon: 'CodeOutlined',
        url: 'https://help.figma.com/hc/en-us/articles/15023124644247-Guide-to-Dev-Mode',
        topic: 'Handoff, inspeção, anotações, componentes, estados e comunicação com desenvolvimento.',
      },
    ],
  },
]

export const ALL_RESOURCE_IDS = WEEKS.flatMap((w) => w.resources.map((r) => r.id))

/**
 * One accent per week, reused everywhere for week identity (Avatar chips, Progress fill, Tag).
 *
 * Ant Design's default preset-6 swatches (e.g. green `#52c41a`, orange `#fa8c16`, the default
 * `Tag color="gold"`) read as white text on those fills, or as their own default light-Tag
 * text/background pairing — both measured below 4.5:1 against WCAG 2.1 AA in a live contrast
 * check (green 2.27–3.37:1, orange 2.38–3.34:1, gold 2.76:1). These are the next-darker step of
 * the same four Ant Design hues (blue-7, green-8, orange-8, magenta-7 per
 * https://ant.design/docs/spec/colors) — still 100% sourced from Ant Design's own palette, chosen
 * for ≥4.5:1 contrast as both white-on-fill (Avatar) and Ant Design's auto-generated light-tint
 * Tag text/background pairing (verified 4.7–6.2:1 for all four).
 */
const WEEK_ACCENTS = ['#0958d9', '#237804', '#ad4e00', '#c41d7f'] as const

export function weekAccentHex(weekId: number): string {
  return WEEK_ACCENTS[(weekId - 1) % WEEK_ACCENTS.length]
}

export const EVIDENCE_TYPES = [
  'Figma',
  'Antes e depois',
  'Fluxo ou jornada',
  'Diagrama de sistema',
  'Teste com IA',
  'Protótipo',
  'Documentação',
  'Outro',
] as const
