# Arquitetura e decisoes esperadas

Autor: Bruno Liberato Girardi

Este documento nao obriga uma stack. Ele define as perguntas que a arquitetura precisa responder.

## Fronteiras minimas

### Front-end

Responsavel por:

- renderizar a experiencia;
- coletar interacoes;
- mostrar estados e feedbacks;
- controlar estado de tela;
- oferecer acessibilidade e responsividade.

Nao deve concentrar regra de negocio, segredo, prompt sensivel, acesso direto indiscriminado ao banco ou orquestracao complexa de agentes.

### BFF

Responsavel por adaptar o contrato do dominio para a necessidade da interface:

- agregar dados para a tela de Hoje;
- validar payloads de entrada;
- esconder detalhes internos do back-end;
- aplicar autorizacao e limites;
- reduzir chamadas excessivas do front-end;
- traduzir erros de dominio em estados compreensiveis.

Explique por que o BFF existe no seu desenho. O BFF nao deve virar um segundo back-end com toda a regra de negocio.

### Back-end de dominio

Responsavel por:

- ciclo;
- objetivos;
- criterios;
- acoes;
- evidencias;
- feedbacks;
- avaliacoes;
- historico;
- regras de consistencia.

### Banco de dados

Modelo minimo sugerido:

- `cycles`;
- `goals`;
- `dimensions`;
- `actions`;
- `resources`;
- `evidences`;
- `feedbacks`;
- `assessments`;
- `assessment_items`;
- `agent_runs`;
- `audit_events`.

O candidato deve explicar chaves, relacionamentos, historico, versionamento, exclusao e o que e derivado versus persistido.

### Agentes

Um agente nao e apenas uma chamada para um modelo. Deve ter:

- objetivo;
- instrucoes;
- ferramentas permitidas;
- contexto recebido;
- formato de saida;
- limites;
- guardrails;
- aprovacao humana quando houver efeito externo;
- registro da execucao;
- estrategia de erro e fallback.

Uma divisao possivel:

- tutor: conduz perguntas e verifica entendimento;
- critico: revisa evidencias e identifica lacunas;
- planejador: sugere a proxima acao com base no ciclo;
- sintetizador: prepara o checkup mensal.

Nao e obrigatorio implementar quatro agentes. E obrigatorio explicar por que um agente unico, varios agentes ou nenhum agente e a melhor decisao para cada parte.

## Por que separar os itens

As separacoes devem ser justificadas por pelo menos uma destas razoes:

- responsabilidade diferente;
- ritmo de mudanca diferente;
- contrato independente;
- seguranca ou segredo;
- teste isolado;
- deploy independente;
- limite de custo ou latencia;
- falha isolada;
- necessidade de observabilidade;
- ownership diferente.

Se a separacao nao muda nenhuma dessas propriedades, ela provavelmente e apenas complexidade.

## Design system e Storybook

O design system deve priorizar:

- tokens de cor, espaco, tipografia e raio;
- Button, Input, Select, Textarea, Card, Badge, Progress, Modal, EmptyState, Feedback e Timeline;
- estados default, hover, focus, disabled, loading, success, error e empty;
- composicao de componentes, nao uma colecao de telas copiadas;
- exemplos ligados a comportamentos reais do produto.

O Storybook deve mostrar componentes isolados e estados importantes. Uma historia sem estado de erro, loading ou vazio nao prova maturidade de sistema.

## Deploy e CI/CD

O candidato deve desenhar o caminho:

1. mudanca local;
2. teste local;
3. pull request;
4. lint, typecheck, testes e build;
5. preview;
6. revisao;
7. deploy;
8. smoke test;
9. observabilidade;
10. rollback.

O pipeline deve deixar claro o que bloqueia o merge e o que e apenas informativo. Migracoes de banco, variaveis de ambiente, segredos, healthcheck e rollback precisam aparecer na proposta.

## MVP honesto versus evolucao

E aceitavel que a primeira versao seja local ou use mock. Nesse caso, documente:

- qual contrato esta sendo simulado;
- qual parte seria substituida por API real;
- qual dado nao persiste fora do navegador;
- quais riscos ainda nao foram resolvidos;
- qual seria a proxima etapa para producao.

Nao apresente um mock como backend real, nem um link publicado como prova de CI/CD se o pipeline nao executou.

