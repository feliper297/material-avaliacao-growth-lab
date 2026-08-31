export interface PracticalTask {
  id: string
  title: string
  typeLabel: string
  duration: string
  /** Ação especial na UI (ex.: modal da PokéAPI). */
  action?: 'pokemon-api'
}

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
  practicalTasks?: PracticalTask[]
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
        practicalTasks: [
          {
            id: 'w1-auto-layout-practice',
            title: 'Auditoria de Auto Layout — tela real',
            typeLabel: 'Praticar tarefa',
            duration: '30 min',
          },
        ],
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
        practicalTasks: [
          {
            id: 'w1-components-practice',
            title: 'Componentes e instâncias na tela real',
            typeLabel: 'Praticar tarefa',
            duration: '30 min',
          },
        ],
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
        practicalTasks: [
          {
            id: 'w1-variants-practice',
            title: 'Variantes e componentes feito por IA no Figma',
            typeLabel: 'Praticar tarefa',
            duration: '45 min',
          },
        ],
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
        practicalTasks: [
          {
            id: 'w1-design-system-practice',
            title: 'Design system do projeto de gestão',
            typeLabel: 'Praticar tarefa',
            duration: '60 min',
          },
        ],
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
        practicalTasks: [
          {
            id: 'w2-problem-framing-practice',
            title: 'Problem framing da demanda',
            typeLabel: 'Praticar tarefa',
            duration: '45 min',
          },
        ],
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
        practicalTasks: [
          {
            id: 'w2-journeys-flows-practice',
            title: 'Jornada e fluxo diferenciados',
            typeLabel: 'Praticar tarefa',
            duration: '60 min',
          },
        ],
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
        practicalTasks: [
          {
            id: 'w2-empty-states-practice',
            title: 'Matriz de estados e casos de borda',
            typeLabel: 'Praticar tarefa',
            duration: '45 min',
          },
        ],
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
        practicalTasks: [
          {
            id: 'w3-client-server-practice',
            title: 'Diagrama simplificado do sistema',
            typeLabel: 'Praticar tarefa',
            duration: '45 min',
          },
        ],
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
        practicalTasks: [
          {
            id: 'w3-api-practice',
            title: 'Origem e destino dos dados',
            typeLabel: 'Praticar tarefa',
            duration: '30 min',
          },
          {
            id: 'w3-api-pokemon',
            title: 'Explorar API Pokémon',
            typeLabel: 'Praticar tarefa',
            duration: '20 min',
            action: 'pokemon-api',
          },
        ],
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
        practicalTasks: [
          {
            id: 'w3-http-practice',
            title: 'Loading, sucesso, pendência e erro',
            typeLabel: 'Praticar tarefa',
            duration: '40 min',
          },
        ],
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
        practicalTasks: [
          {
            id: 'w3-bff-practice',
            title: 'Dependências e permissões',
            typeLabel: 'Praticar tarefa',
            duration: '30 min',
          },
        ],
      },
      {
        id: 'w3-git',
        title: 'Sobre o controle de versão do Git',
        source: 'GitHub Docs',
        type: 'Texto técnico',
        duration: '12 min',
        icon: 'CodeOutlined',
        url: 'https://docs.github.com/pt/get-started/using-git/about-git',
        topic:
          'Git, commits, histórico de alterações, branches e por que versionar código faz parte da arquitetura de um sistema.',
        practicalTasks: [
          {
            id: 'w3-git-practice',
            title: 'Commits e histórico no projeto',
            typeLabel: 'Praticar tarefa',
            duration: '25 min',
          },
        ],
      },
      {
        id: 'w3-github-repos',
        title: 'Sobre repositórios',
        source: 'GitHub Docs',
        type: 'Texto técnico',
        duration: '10 min',
        icon: 'InboxOutlined',
        url: 'https://docs.github.com/pt/repositories/creating-and-managing-repositories/about-repositories',
        topic:
          'Repositório como unidade de código e dados do projeto, visibilidade, estrutura e relação com deploy e colaboração.',
        practicalTasks: [
          {
            id: 'w3-github-repos-practice',
            title: 'Estrutura e visibilidade do repositório',
            typeLabel: 'Praticar tarefa',
            duration: '20 min',
          },
        ],
      },
      {
        id: 'w3-github-pr',
        title: 'Sobre pull requests',
        source: 'GitHub Docs',
        type: 'Texto técnico',
        duration: '12 min',
        icon: 'GroupOutlined',
        url: 'https://docs.github.com/pt/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests',
        topic:
          'Pull request como contrato de mudança: revisão, aprovação, integração de código e rastreabilidade no fluxo de entrega.',
        practicalTasks: [
          {
            id: 'w3-github-pr-practice',
            title: 'Pull request de entrega',
            typeLabel: 'Praticar tarefa',
            duration: '30 min',
          },
        ],
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
        practicalTasks: [
          {
            id: 'w4-study-mode-practice',
            title: 'Aprendizado com Study Mode documentado',
            typeLabel: 'Praticar tarefa',
            duration: '30 min',
          },
        ],
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
        practicalTasks: [
          {
            id: 'w4-prompt-practice',
            title: 'Prompts e decisões documentados',
            typeLabel: 'Praticar tarefa',
            duration: '45 min',
          },
        ],
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
        practicalTasks: [
          {
            id: 'w4-figma-ai-practice',
            title: 'Protótipo conduzido com IA',
            typeLabel: 'Praticar tarefa',
            duration: '60 min',
          },
        ],
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
        practicalTasks: [
          {
            id: 'w4-dev-mode-practice',
            title: 'Handoff e inspeção no Dev Mode',
            typeLabel: 'Praticar tarefa',
            duration: '40 min',
          },
        ],
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
const TRAIL_ACCENT = '#0958d9'

export function weekAccentHex(_weekId?: number): string {
  return TRAIL_ACCENT
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
