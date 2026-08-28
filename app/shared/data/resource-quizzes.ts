import type { QuizItem } from './weeks'

/** Três perguntas por conteúdo da trilha — chave = id do recurso. */
export const RESOURCE_QUIZZES: Record<string, QuizItem[]> = {
  'w1-auto-layout': [
    {
      q: 'Qual é o principal objetivo do Auto Layout?',
      options: [
        'Aplicar efeitos visuais automaticamente',
        'Organizar elementos com direção, espaçamento, padding e redimensionamento',
        'Converter qualquer frame em componente',
        'Publicar uma biblioteca',
      ],
      answer: 1,
    },
    {
      q: 'Em um botão com ícone e texto, o gap do Auto Layout controla:',
      options: [
        'A cor do ícone',
        'O espaço entre ícone e texto',
        'O raio da borda',
        'A publicação do componente',
      ],
      answer: 1,
    },
    {
      q: 'Quando o conteúdo interno cresce, um frame com Auto Layout deve:',
      options: [
        'Cortar o conteúdo sem aviso',
        'Respeitar as regras de hug/fill definidas no frame pai',
        'Desativar constraints automaticamente',
        'Converter tudo em grupo',
      ],
      answer: 1,
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
        'Somente a instância selecionada',
        'Todas as instâncias, exceto propriedades já sobrescritas localmente',
        'Apenas instâncias da mesma página',
        'Nenhuma instância depois de publicada',
      ],
      answer: 1,
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
        'Estados e tamanhos semelhantes pertencem ao mesmo componente',
        'A tela possui mais de uma seção',
        'Somente para ícones',
        'O arquivo ainda não possui Design System',
      ],
      answer: 0,
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
        'Reduzir o tamanho do arquivo exportado',
        'Alternar estados previsíveis sem duplicar componentes',
        'Evitar Auto Layout',
        'Substituir documentação',
      ],
      answer: 1,
    },
  ],
  'w1-design-system': [
    {
      q: 'Um Design System bem estruturado prioriza:',
      options: [
        'Quantidade máxima de telas únicas',
        'Tokens, componentes reutilizáveis e regras de consistência',
        'Estilos diferentes por designer',
        'Frames sem nomenclatura',
      ],
      answer: 1,
    },
    {
      q: 'Design tokens servem para:',
      options: [
        'Substituir o handoff com desenvolvimento',
        'Centralizar decisões de cor, tipografia e espaçamento',
        'Gerar código automaticamente sem revisão',
        'Eliminar variantes',
      ],
      answer: 1,
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
        'Depois do protótipo final',
        'Antes de assumir uma solução',
        'Somente quando não há prazo',
        'Apenas em pesquisas qualitativas',
      ],
      answer: 1,
    },
    {
      q: 'Uma boa declaração de problema diferencia claramente:',
      options: [
        'Cor primária e cor secundária',
        'Problema observado, evidência e impacto para o usuário/negócio',
        'Wireframe e protótipo hi-fi',
        'Sprint atual e sprint seguinte',
      ],
      answer: 1,
    },
    {
      q: '"Precisamos de um dashboard" sem contexto é problemático porque:',
      options: [
        'Dashboards são sempre desnecessários',
        'Confunde solução desejada com problema a resolver',
        'Impede uso de IA',
        'Elimina estados vazios',
      ],
      answer: 1,
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
        'Somente a paleta de cores',
        'Passos, decisões, entradas/saídas e pontos de erro',
        'Apenas telas finais aprovadas',
        'Quantidade de componentes no DS',
      ],
      answer: 1,
    },
    {
      q: 'Mapear jornada antes das telas ajuda a:',
      options: [
        'Escolher sombras e gradientes',
        'Identificar momentos críticos, dores e oportunidades',
        'Publicar biblioteca no Figma',
        'Evitar estados de loading',
      ],
      answer: 1,
    },
  ],
  'w2-empty-states': [
    {
      q: '"Nenhum resultado para o filtro" e "nenhum dado criado ainda" são:',
      options: [
        'O mesmo estado com a mesma mensagem',
        'Estados distintos com causas e próximas ações diferentes',
        'Válidos somente em mobile',
        'Equivalentes se a cor for igual',
      ],
      answer: 1,
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
        'Erro nunca precisa de mensagem',
        'A causa, responsabilidade e recuperação são diferentes',
        'Empty state sempre usa vermelho',
        'Erro só existe em APIs',
      ],
      answer: 1,
    },
  ],
  'w3-client-server': [
    {
      q: 'No modelo cliente–servidor, a interface normalmente:',
      options: [
        'Armazena e processa todas as regras de negócio',
        'Envia solicitações e representa o resultado recebido',
        'Substitui completamente o backend',
        'Não precisa considerar falhas',
      ],
      answer: 1,
    },
    {
      q: 'Quando o servidor demora a responder, a UI deve:',
      options: [
        'Congelar sem feedback',
        'Comunicar loading e evitar ações duplicadas',
        'Assumir sucesso imediato',
        'Ocultar o formulário',
      ],
      answer: 1,
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
        'Ignore o backend',
        'Troque dados estruturados com serviços externos ou backend',
        'Armazene senhas em texto puro',
        'Elimine estados de erro',
      ],
      answer: 1,
    },
    {
      q: 'Ao desenhar uma tela que consome API, é essencial mapear:',
      options: [
        'Apenas a tipografia',
        'Quais dados entram, saem e o que acontece se falhar',
        'Somente o logo do parceiro',
        'Quantidade de frames',
      ],
      answer: 1,
    },
    {
      q: 'Dependência de serviço externo exige considerar:',
      options: [
        'Apenas cor do botão primário',
        'Indisponibilidade, latência e mensagens compreensíveis',
        'Remoção de loading',
        'Uso exclusivo de mock estático',
      ],
      answer: 1,
    },
  ],
  'w3-http': [
    {
      q: 'Uma resposta HTTP 202 geralmente indica:',
      options: [
        'Solicitação aceita, processamento pode continuar',
        'Usuário sem permissão',
        'Recurso inexistente',
        'Servidor nunca recebeu a solicitação',
      ],
      answer: 0,
    },
    {
      q: 'Código 404 na interface deve ser traduzido para:',
      options: [
        'Mensagem técnica bruta sem contexto',
        'Explicação clara e caminho de recuperação quando possível',
        'Tela em branco',
        'Sucesso silencioso',
      ],
      answer: 1,
    },
    {
      q: 'Erro 403 (sem permissão) difere de 401 porque:',
      options: [
        '403 sempre significa sucesso',
        '403 indica autenticado, mas sem autorização para a ação',
        'Não há diferença para o designer',
        '401 só ocorre em mobile',
      ],
      answer: 1,
    },
  ],
  'w3-bff': [
    {
      q: 'O padrão BFF (Backend for Frontend) existe principalmente para:',
      options: [
        'Substituir o banco de dados da aplicação',
        'Adaptar APIs e contratos às necessidades de uma interface específica',
        'Eliminar a camada de frontend',
        'Armazenar componentes visuais do design system',
      ],
      answer: 1,
    },
    {
      q: 'No Growth Lab, uma responsabilidade adequada do BFF seria:',
      options: [
        'Concentrar todas as regras de negócio do produto',
        'Expor contratos HTTP estáveis e adaptar payloads para a UI',
        'Renderizar telas React no servidor',
        'Gerenciar Auto Layout no Figma',
      ],
      answer: 1,
    },
    {
      q: 'Ao decidir usar BFF, o designer deve considerar:',
      options: [
        'Apenas a cor dos botões da tela',
        'Quais dados a UI precisa, estados de loading/erro e dependências entre serviços',
        'Somente a quantidade de frames no protótipo',
        'Que o BFF dispensa documentação de contrato',
      ],
      answer: 1,
    },
  ],
  'w3-git': [
    {
      q: 'O Git ajuda um time a:',
      options: [
        'Eliminar a necessidade de testes',
        'Registrar histórico de mudanças e trabalhar em paralelo com branches',
        'Substituir banco de dados por arquivos locais',
        'Publicar código sem revisão',
      ],
      answer: 1,
    },
    {
      q: 'Um commit representa:',
      options: [
        'Apenas um backup automático do Figma',
        'Um snapshot nomeado de alterações no código ou arquivos versionados',
        'O deploy final em produção',
        'Uma permissão de administrador',
      ],
      answer: 1,
    },
    {
      q: 'Versionar código faz parte da arquitetura porque:',
      options: [
        'Dispensa documentação e evidências',
        'Permite rastrear o que mudou, quando e por quê',
        'Impede rollback em caso de erro',
        'Só interessa ao time de marketing',
      ],
      answer: 1,
    },
  ],
  'w3-github-repos': [
    {
      q: 'Um repositório no GitHub é:',
      options: [
        'Somente uma pasta de imagens do protótipo',
        'A unidade que concentra código, histórico e colaboração do projeto',
        'Um substituto de banco relacional em produção',
        'Apenas um chat de equipe',
      ],
      answer: 1,
    },
    {
      q: 'Repositório público vs privado impacta principalmente:',
      options: [
        'A tipografia da interface',
        'Quem pode ver e contribuir com o código',
        'A velocidade do HTTP GET',
        'O número de frames no Figma',
      ],
      answer: 1,
    },
    {
      q: 'Ligar repositório a deploy (ex.: Vercel) significa que:',
      options: [
        'O design system deixa de existir',
        'Mudanças aprovadas no código podem gerar nova versão publicada',
        'Commits substituem testes automatizados',
        'Pull requests deixam de ser necessários',
      ],
      answer: 1,
    },
  ],
  'w3-github-pr': [
    {
      q: 'Um pull request serve para:',
      options: [
        'Enviar e-mail marketing',
        'Propor mudanças, revisar e integrar código com rastreabilidade',
        'Substituir o controle de versão',
        'Ocultar histórico de alterações',
      ],
      answer: 1,
    },
    {
      q: 'Antes de merge, uma boa prática é:',
      options: [
        'Ignorar comentários de revisão',
        'Revisar diff, testes e impacto da mudança',
        'Fazer push direto na branch principal sem revisão',
        'Apagar issues relacionadas',
      ],
      answer: 1,
    },
    {
      q: 'Para o Growth Lab, PR + deploy conectam arquitetura e entrega porque:',
      options: [
        'Eliminam a necessidade de Supabase',
        'Separam desenvolvimento, revisão e publicação em etapas auditáveis',
        'Dispensam evidências semanais',
        'Garantem que mock vira dado real automaticamente',
      ],
      answer: 1,
    },
  ],
  'w4-study-mode': [
    {
      q: 'O Study Mode do ChatGPT é mais adequado para:',
      options: [
        'Receber respostas prontas sem questionamento',
        'Aprendizagem socrática com perguntas e verificação de entendimento',
        'Substituir evidências da sprint',
        'Gerar telas finais automaticamente',
      ],
      answer: 1,
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
        'Somente agradecer',
        'Teste final, lacunas identificadas e aplicação na demanda real',
        'Apagar o histórico',
        'Publicar sem revisão humana',
      ],
      answer: 1,
    },
  ],
  'w4-prompt': [
    {
      q: 'Um prompt profissional deve incluir:',
      options: [
        'Somente uma frase curta',
        'Objetivo, contexto, restrições, tarefa e critério de qualidade',
        'A resposta esperada pronta',
        'O máximo de jargão possível',
      ],
      answer: 1,
    },
    {
      q: 'Incluir contexto da demanda real no prompt ajuda a IA a:',
      options: [
        'Inventar requisitos',
        'Relacionar o conceito ao problema, riscos e estados da sprint',
        'Evitar perguntas',
        'Eliminar handoff',
      ],
      answer: 1,
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
        'Substituir julgamento de produto',
        'Explorar variações, conteúdo e acelerar com revisão crítica',
        'Eliminar componentes',
        'Publicar sem testes',
      ],
      answer: 1,
    },
    {
      q: 'Resultado gerado por IA no Figma deve ser:',
      options: [
        'Aprovado automaticamente',
        'Revisado quanto a consistência, acessibilidade e aderência ao DS',
        'Ignorado',
        'Usado sem documentação',
      ],
      answer: 1,
    },
    {
      q: 'Usar IA para naming e organização de camadas exige:',
      options: [
        'Nenhum padrão de time',
        'Validação humana contra convenções do projeto',
        'Desativar Auto Layout',
        'Remover variantes',
      ],
      answer: 1,
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
        'Preferência pessoal de cor',
        'Comportamentos, estados, exceções e dependências',
        'Somente o nome do designer',
        'Histórico de commits',
      ],
      answer: 1,
    },
    {
      q: 'Componentes com variantes no handoff precisam indicar:',
      options: [
        'Apenas o estado default',
        'Quais variantes existem e quando usar cada uma',
        'Somente o ícone do Figma',
        'Nada além do frame',
      ],
      answer: 1,
    },
  ],
}

export function getResourceQuiz(resourceId: string): QuizItem[] {
  return RESOURCE_QUIZZES[resourceId] ?? []
}
