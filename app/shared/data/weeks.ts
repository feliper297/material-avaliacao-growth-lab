export interface TrailResource {
  id: string
  title: string
  source: string
  type: string
  duration: string
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
  quiz: QuizItem[]
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
        icon: '▦',
        url: 'https://help.figma.com/hc/en-us/articles/360040451373-Guide-to-auto-layout',
        topic: 'Auto Layout, responsividade de componentes e comportamento com conteúdos variáveis.',
      },
      {
        id: 'w1-components',
        title: 'Guide to Components',
        source: 'Figma',
        type: 'Texto oficial',
        duration: '10 min',
        icon: '◆',
        url: 'https://help.figma.com/hc/en-us/articles/360038662654-Guide-to-components-in-Figma',
        topic: 'Componentes, instâncias, reutilização e consistência em Design Systems.',
      },
      {
        id: 'w1-variants',
        title: 'Create and Use Variants',
        source: 'Figma',
        type: 'Texto oficial',
        duration: '10 min',
        icon: '◫',
        url: 'https://help.figma.com/hc/en-us/articles/360056440594-Create-and-use-variants',
        topic: 'Propriedades, variantes, estados e organização de conjuntos de componentes.',
      },
    ],
    quiz: [
      {
        q: 'Qual é o principal objetivo do Auto Layout?',
        options: [
          'Aplicar efeitos visuais automaticamente',
          'Organizar elementos com regras de direção, espaçamento, padding e redimensionamento',
          'Converter qualquer frame em componente',
          'Publicar uma biblioteca',
        ],
        answer: 1,
      },
      {
        q: 'Quando variantes são especialmente úteis?',
        options: [
          'Quando estados e tamanhos semelhantes pertencem ao mesmo componente',
          'Sempre que uma tela possuir mais de uma seção',
          'Somente para ícones',
          'Quando o arquivo ainda não possui Design System',
        ],
        answer: 0,
      },
      {
        q: 'Uma boa evidência desta semana seria:',
        options: [
          'Somente confirmar que leu os três materiais',
          'Mostrar uma tela bonita sem explicar mudanças',
          'Apresentar antes/depois, problemas encontrados e justificativa das correções',
          'Criar o maior número possível de componentes',
        ],
        answer: 2,
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
        icon: '◎',
        url: 'https://www.atlassian.com/team-playbook/plays/problem-framing',
        topic: 'Problem framing e diferenciação entre problema, evidência, hipótese, requisito e solução.',
      },
      {
        id: 'w2-journeys-flows',
        title: 'User Journeys vs. User Flows',
        source: 'Nielsen Norman Group',
        type: 'Artigo',
        duration: '4 min',
        icon: '↝',
        url: 'https://www.nngroup.com/articles/user-journeys-vs-user-flows/',
        topic: 'Diferença entre jornada do usuário, fluxo da funcionalidade e sequência de telas.',
      },
      {
        id: 'w2-empty-states',
        title: 'Designing Empty States',
        source: 'Nielsen Norman Group',
        type: 'Artigo',
        duration: '7 min',
        icon: '□',
        url: 'https://www.nngroup.com/articles/empty-state-interface-design/',
        topic: 'Estados vazios, primeiro uso, ausência de resultado, loading, erro e falta de permissão.',
      },
    ],
    quiz: [
      {
        q: 'Problem framing deve acontecer principalmente:',
        options: [
          'Depois do protótipo final',
          'Antes de assumir uma solução',
          'Somente quando não há prazo',
          'Apenas em pesquisas qualitativas',
        ],
        answer: 1,
      },
      {
        q: 'Qual diferença é mais importante entre jornada e fluxo?',
        options: [
          'A jornada é sempre desenhada; o fluxo é sempre escrito',
          'A jornada examina uma experiência mais ampla; o fluxo detalha interações para cumprir uma tarefa',
          'Não existe diferença prática',
          'O fluxo contém emoções e a jornada contém apenas telas',
        ],
        answer: 1,
      },
      {
        q: '"Nenhum resultado para o filtro aplicado" é o mesmo estado de "nenhum dado criado ainda"?',
        options: [
          'Sim, a mesma mensagem serve',
          'Não; causas, orientação e próxima ação são diferentes',
          'Somente em aplicativos mobile',
          'Depende apenas da cor da interface',
        ],
        answer: 1,
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
        icon: '⇄',
        url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/First_steps/Client-Server_overview',
        topic: 'Cliente, servidor, frontend, backend, banco de dados, requisição e resposta.',
      },
      {
        id: 'w3-api',
        title: 'Introduction to Web APIs',
        source: 'MDN',
        type: 'Texto técnico',
        duration: '15 min',
        icon: '⌁',
        url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Client-side_APIs/Introduction',
        topic: 'APIs, integrações, dados enviados, dados recebidos e dependências externas.',
      },
      {
        id: 'w3-http',
        title: 'HTTP Response Status Codes',
        source: 'MDN',
        type: 'Referência',
        duration: '10 min',
        icon: '200',
        url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status',
        topic: 'Respostas do sistema e tradução de situações técnicas em comportamentos compreensíveis da interface.',
      },
    ],
    quiz: [
      {
        q: 'No modelo cliente–servidor, a interface normalmente:',
        options: [
          'Armazena e processa obrigatoriamente todas as regras',
          'Envia uma solicitação e representa o resultado recebido',
          'Substitui completamente o backend',
          'Não precisa considerar falhas',
        ],
        answer: 1,
      },
      {
        q: 'Uma resposta 202 geralmente indica:',
        options: [
          'A solicitação foi aceita, mas o processamento pode continuar',
          'O usuário não tem permissão',
          'O recurso não existe',
          'O servidor nunca recebeu a solicitação',
        ],
        answer: 0,
      },
      {
        q: 'Ao desenhar uma integração externa, qual pergunta é essencial?',
        options: [
          'Qual sombra deixa a tela mais moderna?',
          'O que acontece se o serviço estiver indisponível ou demorar?',
          'Qual ferramenta o designer prefere?',
          'Quantos frames serão produzidos?',
        ],
        answer: 1,
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
        icon: '✦',
        url: 'https://help.openai.com/en/articles/11780217-using-study-mode-in-chatgpt',
        topic: 'Aprendizagem socrática, perguntas progressivas, testes e correção de entendimento com IA.',
      },
      {
        id: 'w4-prompt',
        title: 'Prompt Engineering Best Practices',
        source: 'OpenAI',
        type: 'Guia oficial',
        duration: '7 min',
        icon: '⌘',
        url: 'https://help.openai.com/en/articles/10032626-prompt-engineering-best-practices-for-chatgpt',
        topic: 'Construção de prompts com objetivo, contexto, restrições, formato de saída e critérios de qualidade.',
      },
      {
        id: 'w4-figma-ai',
        title: 'Use AI Tools in Figma Design',
        source: 'Figma',
        type: 'Guia oficial',
        duration: '10 min',
        icon: 'AI',
        url: 'https://help.figma.com/hc/en-us/articles/23870272542231-Use-AI-tools-in-Figma-Design',
        topic: 'IA aplicada à exploração, conteúdo, organização, prototipação e revisão crítica no Figma.',
      },
      {
        id: 'w4-dev-mode',
        title: 'Guide to Dev Mode',
        source: 'Figma',
        type: 'Bônus',
        duration: '10 min',
        icon: '</>',
        url: 'https://help.figma.com/hc/en-us/articles/15023124644247-Guide-to-Dev-Mode',
        topic: 'Handoff, inspeção, anotações, componentes, estados e comunicação com desenvolvimento.',
      },
    ],
    quiz: [
      {
        q: 'Qual é o melhor uso da IA nesta trilha?',
        options: [
          'Substituir a análise e produzir a solução final automaticamente',
          'Apoiar pesquisa, questionamento, crítica, testes e aceleração com revisão humana',
          'Evitar conversas com produto e desenvolvimento',
          'Gerar mais telas, independentemente do problema',
        ],
        answer: 1,
      },
      {
        q: 'Um prompt profissional deveria incluir:',
        options: [
          'Somente uma frase curta',
          'Objetivo, contexto, informações, restrições, tarefa e critério de qualidade',
          'A resposta esperada já pronta',
          'O máximo de termos técnicos possível',
        ],
        answer: 1,
      },
      {
        q: 'Uma evidência adequada de uso de IA deve mostrar:',
        options: [
          'Somente o resultado gerado',
          'Prompt, resultado, problemas encontrados, decisões e alterações humanas',
          'A quantidade de mensagens da conversa',
          'A ferramenta utilizada, sem relação com a entrega',
        ],
        answer: 1,
      },
    ],
  },
]

export const ALL_RESOURCE_IDS = WEEKS.flatMap((w) => w.resources.map((r) => r.id))

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
