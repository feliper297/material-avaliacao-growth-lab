import type { QuizItem } from './weeks'

/** Três perguntas por conteúdo da trilha — chave = id do recurso. */
export const RESOURCE_QUIZZES: Record<string, QuizItem[]> = {
  'w1-auto-layout': [
    {
      q: 'Qual é o principal objetivo do Auto Layout?',
      options: [
        'Organizar elementos com direção, espaçamento, padding e redimensionamento',
        'Aplicar efeitos visuais automaticamente',
        'Converter qualquer frame em componente',
        'Publicar uma biblioteca',
      ],
      answer: 0,
    },
    {
      q: 'Em um botão com ícone e texto, o gap do Auto Layout controla:',
      options: [
        'A cor do ícone',
        'O raio da borda',
        'O espaço entre ícone e texto',
        'A publicação do componente',
      ],
      answer: 2,
    },
    {
      q: 'Quando o conteúdo interno cresce, um frame com Auto Layout deve:',
      options: [
        'Cortar o conteúdo sem aviso',
        'Desativar constraints automaticamente',
        'Converter tudo em grupo',
        'Respeitar as regras de hug/fill definidas no frame pai',
      ],
      answer: 3,
    },
  ],
  'w1-components': [
    {
      q: 'A principal vantagem de um componente em relação a um grupo é:',
      options: [
        'Ocupar menos camadas no painel',
        'Reutilização com instâncias sincronizadas ao master',
        'Impossibilitar overrides',
        'Eliminar a necessidade de variantes',
      ],
      answer: 1,
    },
    {
      q: 'Alterar o master de um componente afeta:',
      options: [
        'Todas as instâncias, exceto propriedades já sobrescritas localmente',
        'Somente a instância selecionada',
        'Apenas instâncias da mesma página',
        'Nenhuma instância depois de publicada',
      ],
      answer: 0,
    },
    {
      q: 'Detaching (desvincular) uma instância é adequado quando:',
      options: [
        'Sempre, para ganhar liberdade criativa',
        'Nunca, pois quebra o Design System',
        'Há exceção pontual justificada e documentada',
        'O componente tem variantes',
      ],
      answer: 2,
    },
  ],
  'w1-variants': [
    {
      q: 'Variantes são especialmente úteis quando:',
      options: [
        'A tela possui mais de uma seção',
        'Somente para ícones',
        'O arquivo ainda não possui Design System',
        'Estados e tamanhos semelhantes pertencem ao mesmo componente',
      ],
      answer: 3,
    },
    {
      q: 'Uma propriedade booleana em variantes costuma representar:',
      options: [
        'Cor fixa do componente',
        'Estados como ativo/inativo ou com/sem ícone',
        'Nome da página no Figma',
        'Versão do arquivo',
      ],
      answer: 1,
    },
    {
      q: 'Organizar variantes em conjunto ajuda principalmente a:',
      options: [
        'Alternar estados previsíveis sem duplicar componentes',
        'Reduzir o tamanho do arquivo exportado',
        'Evitar Auto Layout',
        'Substituir documentação',
      ],
      answer: 0,
    },
  ],
  'w1-design-system': [
    {
      q: 'Um Design System bem estruturado prioriza:',
      options: [
        'Quantidade máxima de telas únicas',
        'Estilos diferentes por designer',
        'Tokens, componentes reutilizáveis e regras de consistência',
        'Frames sem nomenclatura',
      ],
      answer: 2,
    },
    {
      q: 'Design tokens servem para:',
      options: [
        'Substituir o handoff com desenvolvimento',
        'Gerar código automaticamente sem revisão',
        'Eliminar variantes',
        'Centralizar decisões de cor, tipografia e espaçamento',
      ],
      answer: 3,
    },
    {
      q: 'Publicar uma biblioteca compartilhada permite:',
      options: [
        'Impedir atualizações nos arquivos consumidores',
        'Manter consistência entre times e produtos',
        'Remover a necessidade de componentes locais',
        'Desativar instâncias',
      ],
      answer: 1,
    },
  ],
  'w2-problem-framing': [
    {
      q: 'Problem framing deve acontecer principalmente:',
      options: [
        'Antes de assumir uma solução',
        'Depois do protótipo final',
        'Somente quando não há prazo',
        'Apenas em pesquisas qualitativas',
      ],
      answer: 0,
    },
    {
      q: 'Uma boa declaração de problema diferencia claramente:',
      options: [
        'Cor primária e cor secundária',
        'Wireframe e protótipo hi-fi',
        'Problema observado, evidência e impacto para o usuário/negócio',
        'Sprint atual e sprint seguinte',
      ],
      answer: 2,
    },
    {
      q: '"Precisamos de um dashboard" sem contexto é problemático porque:',
      options: [
        'Dashboards são sempre desnecessários',
        'Impede uso de IA',
        'Elimina estados vazios',
        'Confunde solução desejada com problema a resolver',
      ],
      answer: 3,
    },
  ],
  'w2-journeys-flows': [
    {
      q: 'A diferença mais importante entre jornada e fluxo é:',
      options: [
        'A jornada é sempre desenhada; o fluxo é sempre escrito',
        'A jornada examina experiência ampla; o fluxo detalha interações para cumprir uma tarefa',
        'Não existe diferença prática',
        'O fluxo contém emoções e a jornada contém apenas telas',
      ],
      answer: 1,
    },
    {
      q: 'Um fluxo de tarefa deve deixar explícito:',
      options: [
        'Passos, decisões, entradas/saídas e pontos de erro',
        'Somente a paleta de cores',
        'Apenas telas finais aprovadas',
        'Quantidade de componentes no DS',
      ],
      answer: 0,
    },
    {
      q: 'Mapear jornada antes das telas ajuda a:',
      options: [
        'Escolher sombras e gradientes',
        'Publicar biblioteca no Figma',
        'Identificar momentos críticos, dores e oportunidades',
        'Evitar estados de loading',
      ],
      answer: 2,
    },
  ],
  'w2-empty-states': [
    {
      q: '"Nenhum resultado para o filtro" e "nenhum dado criado ainda" são:',
      options: [
        'O mesmo estado com a mesma mensagem',
        'Válidos somente em mobile',
        'Equivalentes se a cor for igual',
        'Estados distintos com causas e próximas ações diferentes',
      ],
      answer: 3,
    },
    {
      q: 'Um empty state eficaz deve orientar o usuário a:',
      options: [
        'Fechar o produto',
        'Entender o que aconteceu e qual a próxima ação',
        'Ignorar o contexto',
        'Aguardar sem feedback',
      ],
      answer: 1,
    },
    {
      q: 'Estados de erro devem ser diferenciados de estados vazios porque:',
      options: [
        'A causa, responsabilidade e recuperação são diferentes',
        'Erro nunca precisa de mensagem',
        'Empty state sempre usa vermelho',
        'Erro só existe em APIs',
      ],
      answer: 0,
    },
  ],
  'w3-client-server': [
    {
      q: 'No modelo cliente–servidor, a interface normalmente:',
      options: [
        'Armazena e processa todas as regras de negócio',
        'Substitui completamente o backend',
        'Envia solicitações e representa o resultado recebido',
        'Não precisa considerar falhas',
      ],
      answer: 2,
    },
    {
      q: 'Quando o servidor demora a responder, a UI deve:',
      options: [
        'Congelar sem feedback',
        'Assumir sucesso imediato',
        'Ocultar o formulário',
        'Comunicar loading e evitar ações duplicadas',
      ],
      answer: 3,
    },
    {
      q: 'Dados persistidos em banco ficam tipicamente:',
      options: [
        'Somente no navegador do usuário',
        'No servidor/backend, acessados via API',
        'Apenas em cache local permanente',
        'Dentro do arquivo Figma',
      ],
      answer: 1,
    },
  ],
  'w3-api': [
    {
      q: 'Uma API web permite que o frontend:',
      options: [
        'Troque dados estruturados com serviços externos ou backend',
        'Ignore o backend',
        'Armazene senhas em texto puro',
        'Elimine estados de erro',
      ],
      answer: 0,
    },
    {
      q: 'Ao desenhar uma tela que consome API, é essencial mapear:',
      options: [
        'Apenas a tipografia',
        'Somente o logo do parceiro',
        'Quais dados entram, saem e o que acontece se falhar',
        'Quantidade de frames',
      ],
      answer: 2,
    },
    {
      q: 'Dependência de serviço externo exige considerar:',
      options: [
        'Apenas cor do botão primário',
        'Remoção de loading',
        'Uso exclusivo de mock estático',
        'Indisponibilidade, latência e mensagens compreensíveis',
      ],
      answer: 3,
    },
  ],
  'w3-http': [
    {
      q: 'Uma resposta HTTP 202 geralmente indica:',
      options: [
        'Usuário sem permissão',
        'Solicitação aceita, processamento pode continuar',
        'Recurso inexistente',
        'Servidor nunca recebeu a solicitação',
      ],
      answer: 1,
    },
    {
      q: 'Código 404 na interface deve ser traduzido para:',
      options: [
        'Explicação clara e caminho de recuperação quando possível',
        'Mensagem técnica bruta sem contexto',
        'Tela em branco',
        'Sucesso silencioso',
      ],
      answer: 0,
    },
    {
      q: 'Erro 403 (sem permissão) difere de 401 porque:',
      options: [
        '403 sempre significa sucesso',
        'Não há diferença para o designer',
        '403 indica autenticado, mas sem autorização para a ação',
        '401 só ocorre em mobile',
      ],
      answer: 2,
    },
  ],
  'w4-study-mode': [
    {
      q: 'O Study Mode do ChatGPT é mais adequado para:',
      options: [
        'Receber respostas prontas sem questionamento',
        'Substituir evidências da sprint',
        'Gerar telas finais automaticamente',
        'Aprendizagem socrática com perguntas e verificação de entendimento',
      ],
      answer: 3,
    },
    {
      q: 'Durante estudo com IA, respostas vagas devem ser:',
      options: [
        'Aceitas para ganhar tempo',
        'Questionadas com "por quê?" e pedido de exemplo concreto',
        'Ignoradas',
        'Copiadas direto para o Figma',
      ],
      answer: 1,
    },
    {
      q: 'Um bom encerramento de sessão com IA inclui:',
      options: [
        'Teste final, lacunas identificadas e aplicação na demanda real',
        'Somente agradecer',
        'Apagar o histórico',
        'Publicar sem revisão humana',
      ],
      answer: 0,
    },
  ],
  'w4-prompt': [
    {
      q: 'Um prompt profissional deve incluir:',
      options: [
        'Somente uma frase curta',
        'A resposta esperada pronta',
        'Objetivo, contexto, restrições, tarefa e critério de qualidade',
        'O máximo de jargão possível',
      ],
      answer: 2,
    },
    {
      q: 'Incluir contexto da demanda real no prompt ajuda a IA a:',
      options: [
        'Inventar requisitos',
        'Evitar perguntas',
        'Eliminar handoff',
        'Relacionar o conceito ao problema, riscos e estados da sprint',
      ],
      answer: 3,
    },
    {
      q: 'Restrições em um prompt servem para:',
      options: [
        'Limitar criatividade sem motivo',
        'Delimitar formato, profundidade e o que não deve ser feito',
        'Substituir revisão humana',
        'Ocultar o objetivo',
      ],
      answer: 1,
    },
  ],
  'w4-figma-ai': [
    {
      q: 'IA no Figma é mais útil para:',
      options: [
        'Explorar variações, conteúdo e acelerar com revisão crítica',
        'Substituir julgamento de produto',
        'Eliminar componentes',
        'Publicar sem testes',
      ],
      answer: 0,
    },
    {
      q: 'Resultado gerado por IA no Figma deve ser:',
      options: [
        'Aprovado automaticamente',
        'Ignorado',
        'Revisado quanto a consistência, acessibilidade e aderência ao DS',
        'Usado sem documentação',
      ],
      answer: 2,
    },
    {
      q: 'Usar IA para naming e organização de camadas exige:',
      options: [
        'Nenhum padrão de time',
        'Desativar Auto Layout',
        'Remover variantes',
        'Validação humana contra convenções do projeto',
      ],
      answer: 3,
    },
  ],
  'w4-dev-mode': [
    {
      q: 'Dev Mode no Figma facilita principalmente:',
      options: [
        'Substituir conversa com desenvolvimento',
        'Inspeção, medidas, tokens e handoff estruturado',
        'Eliminar estados de componente',
        'Gerar backend automaticamente',
      ],
      answer: 1,
    },
    {
      q: 'Anotações no handoff devem esclarecer:',
      options: [
        'Comportamentos, estados, exceções e dependências',
        'Preferência pessoal de cor',
        'Somente o nome do designer',
        'Histórico de commits',
      ],
      answer: 0,
    },
    {
      q: 'Componentes com variantes no handoff precisam indicar:',
      options: [
        'Apenas o estado default',
        'Somente o ícone do Figma',
        'Quais variantes existem e quando usar cada uma',
        'Nada além do frame',
      ],
      answer: 2,
    },
  ],
}

export function getResourceQuiz(resourceId: string): QuizItem[] {
  return RESOURCE_QUIZZES[resourceId] ?? []
}
