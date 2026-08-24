# Growth Lab — pacote de avaliação dupla

Autor: Bruno Liberato Girardi

Este pacote é o contrato de trabalho da avaliação. Ele deve ser entregue inteiro ao executor, junto com o projeto-base. O executor deve ler este README antes de abrir o editor, o Claude ou o Cursor.

## O que está sendo avaliado

Existem dois desafios conectados:

### Desafio A — construir o sistema

Construir um sistema de evolução pessoal de 30 dias. O sistema deve ajudar uma pessoa a definir um objetivo, estudar conceitos, aplicar o conhecimento em uma demanda real, registrar evidências, receber feedback, acompanhar check-ins semanais e comparar a avaliação inicial com o checkup do dia 30.

O sistema é parte da avaliação. A entrega não é apenas uma página bonita: é necessário explicar o problema, propor a arquitetura, implementar uma primeira versão coerente, testar os comportamentos e provar o que realmente funciona.

### Desafio B — evoluir usando o sistema

Durante a construção, o executor também deverá executar desafios semanais de evolução profissional. Toda sexta-feira ele deve usar o próprio sistema para apresentar:

- o que foi estudado;
- o que foi aplicado;
- qual evidência foi produzida;
- quais decisões foram tomadas;
- quais erros ou excessos a IA sugeriu;
- o que foi corrigido após verificação humana;
- quais aprendizados ficaram;
- qual nota ele atribui a si mesmo;
- qual feedback e próxima ação precisa receber.

O avaliador revisará o sistema e o processo. A qualidade da interface é apenas uma parte da nota.

## Regra principal

Não trate o protótipo incluído em `projeto-base/` como solução final. Ele existe para permitir que o executor rode, observe e critique um ponto de partida real. É permitido evoluir, refatorar ou reconstruir, desde que a decisão seja justificada.

Auto Layout, CSS básico, componentes visuais simples e CRUD superficial são pré-requisitos. O diferencial esperado está em IA, vibecoding responsável, arquitetura de sistemas, separação de responsabilidades, dados, agentes, testes, feedbacks, CI/CD e deploy.

## Como começar

1. Leia este README inteiro.
2. Leia [DESAFIO-DUPLO.md](./DESAFIO-DUPLO.md).
3. Leia o roteiro operacional da [primeira semana](./PRIMEIRA-SEMANA.md).
4. Rode o conteúdo de `projeto-base/` e registre o estado inicial antes de alterar arquivos.
5. Leia [CONTRATO-COM-EXECUTOR.md](./CONTRATO-COM-EXECUTOR.md).
6. Estude somente os módulos necessários para tomar as primeiras decisões; não tente consumir todos os links antes de agir.
7. Entregue os documentos de descoberta, arquitetura e testes antes da implementação.

## Como rodar o projeto-base

O projeto-base é um protótipo estático de referência. A partir desta pasta:

```bash
cd projeto-base
python3 -m http.server 4173
```

Abra `http://127.0.0.1:4173/` no navegador. O executor deve registrar o que observou, incluindo problemas de nomenclatura, fluxo, acessibilidade, persistência, progresso e estados de erro. Ele não deve assumir que o protótipo representa a arquitetura que precisa ser mantida.

Se escolher outra stack, deve documentar os comandos de instalação, desenvolvimento, teste, build e deploy no README do próprio projeto.

## Estrutura do pacote

### Documentação da aplicação construída

O pacote inclui muitos guias sobre o **processo de avaliação**. Para o **software em `app/`**, use apenas:

| Documento | Conteúdo |
|-----------|----------|
| [app/SEGURANCA.md](./app/SEGURANCA.md) | Postura de segurança — status AMARELO, RLS, pendências |
| [app/ESTADO-DO-SISTEMA.md](./app/ESTADO-DO-SISTEMA.md) | Protótipo vs publicado vs mock vs Supabase; feito vs planejado |
| [app/README.md](./app/README.md) | Instalação e comandos |
| [app/VALIDACAO-LOCAL.md](./app/VALIDACAO-LOCAL.md) | Última validação lint/test/build |

Evite inferir o comportamento da app a partir de ADRs da Semana 1 ou do protótipo em `projeto-base/` sem ler `ESTADO-DO-SISTEMA.md`.

### Materiais do desafio (avaliador e executor)

- [DESAFIO-DUPLO.md](./DESAFIO-DUPLO.md): objetivos, fases, desafios semanais e entregas.
- [CONTRATO-COM-EXECUTOR.md](./CONTRATO-COM-EXECUTOR.md): regras de trabalho com Claude, Cursor e IA.
- [PRIMEIRA-SEMANA.md](./PRIMEIRA-SEMANA.md): mensagem pronta, roteiro diário e rubrica da primeira sexta-feira.
- [COMPORTAMENTOS-E-FEEDBACK.md](./COMPORTAMENTOS-E-FEEDBACK.md): dimensão comportamental observável, rubrica e exemplos de feedback.
- [RUBRICA-DO-AVALIADOR.md](./RUBRICA-DO-AVALIADOR.md): régua das quatro semanas (complementa [CRITERIOS-DE-AVALIACAO.md](./CRITERIOS-DE-AVALIACAO.md), não precisa ler os dois por completo).
- [PROMPT-DE-ESTUDO-COM-IA.md](./PROMPT-DE-ESTUDO-COM-IA.md): prompt socrático, teste de conhecimento e critério de conclusão.
- [TRILHA-DE-APRENDIZAGEM.md](./TRILHA-DE-APRENDIZAGEM.md): dois estudos obrigatórios, um variável e aplicação por semana.
- [PAINEL-DE-ACOMPANHAMENTO.md](./PAINEL-DE-ACOMPANHAMENTO.md): visão visual das fases complementares, Gantt e trilhas de evolução.
- [CONTRATO-DE-ENTREGA-SEMANAL.md](./CONTRATO-DE-ENTREGA-SEMANAL.md): formato de versão, evidência e acompanhamento de cada sexta-feira.
- [MENSAGEM-PARA-ENVIO.md](./MENSAGEM-PARA-ENVIO.md): texto pronto para enviar junto com o ZIP.
- [MVP-DA-FASE-1.md](./MVP-DA-FASE-1.md): critérios para o sistema ficar utilizável já na primeira semana.
- [MODELO-DE-ONBOARDING.md](./MODELO-DE-ONBOARDING.md): como o produto ensina, pergunta, orienta e se constrói ao mesmo tempo.
- [GUIA-DO-EXECUTOR.md](./GUIA-DO-EXECUTOR.md): conteúdo detalhado por fase, avanço esperado, checklist e feedback.
- [CHECKLIST-DO-EXECUTOR.md](./CHECKLIST-DO-EXECUTOR.md): checklist operacional — **não duplica** [app/ESTADO-DO-SISTEMA.md](./app/ESTADO-DO-SISTEMA.md) (processo vs estado do código).
- [PROMPT-MESTRE-CURSOR.md](./PROMPT-MESTRE-CURSOR.md): prompt inicial e prompt de continuidade para o Cursor no Mac.
- O painel privado do avaliador para o Notion fica fora deste pacote e não deve ser enviado ao executor.
- [BRIEF.md](./BRIEF.md): problema, usuário, hipóteses e recorte.
- [ARQUITETURA-E-DECISOES.md](./ARQUITETURA-E-DECISOES.md): fronteiras entre front-end, BFF, back-end, banco e agentes.
- [JORNADAS-E-TESTES.md](./JORNADAS-E-TESTES.md): jornadas, comportamentos e falhas obrigatórias.
- [CRITERIOS-DE-AVALIACAO.md](./CRITERIOS-DE-AVALIACAO.md): rubrica de 100 pontos e red flags — critérios do avaliador, não spec da app.
- [RECURSOS.md](./RECURSOS.md): índice rápido dos estudos oficiais.
- `estudos/`: guias curtos, exercícios e definição de concluído por tema.
- `anexos/`: modelos para registro de IA, ADRs, check-in, auditoria, nota, feedback e evidências.
- `evidencias/`: artefatos organizados por semana para auditoria visual e reprodução.
- `projeto-base/`: ponto de partida executável, mantido como referência e não como resposta.
- [CHECKLIST-DE-ENTREGA.md](./CHECKLIST-DE-ENTREGA.md): checklist final.

## Ritmo de acompanhamento

### Início do ciclo

O executor deve registrar baseline, objetivo âncora, critérios observáveis, riscos, data de início e definição de pronto. A avaliação inicial não pode ser preenchida com notas padrão sem justificativa.

### Durante a semana

Cada semana precisa transformar estudo em comportamento observável. O executor deve escolher uma ação pequena, aplicar em uma demanda real e salvar evidência. Consumo de conteúdo, número de cliques ou quantidade de prompts não são prova suficiente de evolução.

### Toda sexta-feira

O executor apresenta o check-in semanal no sistema. O avaliador revisa a implementação e o registro da semana, atribui nota e escreve feedback. O feedback deve virar uma próxima ação rastreável, não apenas um comentário solto.

As fases são cumulativas: cada sexta-feira compara a entrega com a semana anterior e com o baseline. Uma fase não é considerada concluída apenas porque o calendário avançou.

O painel do sistema e o Notion são dois lugares intencionalmente redundantes: o primeiro prova o produto que o executor construiu; o segundo é o espelho independente de monitoramento, nota e feedback do avaliador.

### Final do dia 30

O sistema deve permitir um checkup comparável: baseline versus final por critério, evidências, bloqueios, decisões, aprendizados e próximo ciclo. Se não houver dados suficientes, o produto deve mostrar essa limitação em vez de inventar progresso.

## O produto mínimo esperado

O sistema construído deve permitir:

- iniciar um ciclo de 30 dias com objetivo, demanda âncora e datas;
- registrar uma avaliação inicial baseada em critérios observáveis;
- mostrar uma próxima ação pequena e clara;
- organizar materiais curtos com tipo, duração, objetivo, prática e definição de concluído;
- registrar aplicação prática e evidência;
- registrar feedback do avaliador, nota e próxima ação;
- salvar check-ins semanais e retomá-los;
- registrar uso de IA, correções, verificações e decisões humanas;
- registrar comportamentos de ownership, comunicação, disciplina, aprendizagem e resposta a feedback;
- conduzir perguntas de tutoria sobre decisões de arquitetura e melhoria, sem substituir a decisão humana;
- fazer a avaliação final comparável com a inicial;
- mostrar melhorias, bloqueios e próximo ciclo;
- exportar ou consultar o histórico de forma compreensível.

Na primeira semana, uma versão mínima desses fluxos já deve estar utilizável. As fases seguintes melhoram dados, IA, testes, design system, operação e checkup dentro do próprio sistema.

## O que não vale como prova

- screenshot sem jornada reproduzível;
- build verde apresentado como prova de comportamento;
- arquitetura sugerida pela IA sem decisão humana;
- agente que é apenas um prompt nomeado;
- BFF criado por moda, sem contrato ou motivo;
- mock apresentado como persistência real;
- deploy declarado sem URL, log ou artefato verificável;
- nota final sem baseline;
- conteúdo consumido apresentado como crescimento pessoal.

## Fontes essenciais

Os links foram escolhidos para serem curtos e aplicáveis. O executor deve registrar a decisão ou prática produzida a partir de cada estudo, não apenas marcar o link como lido.

- [BFF — Microsoft Learn](https://learn.microsoft.com/en-us/azure/architecture/patterns/backends-for-frontends)
- [Why Storybook](https://storybook.js.org/docs/get-started/why-storybook)
- [Testes de UI com Storybook](https://storybook.js.org/docs/writing-tests)
- [Integração contínua com GitHub Actions](https://docs.github.com/en/actions/get-started/continuous-integration)
- [Agents — OpenAI Agents SDK](https://openai.github.io/openai-agents-python/agents/)
- [Guardrails — OpenAI Agents SDK](https://openai.github.io/openai-agents-js/guides/guardrails/)
- [Study Mode — OpenAI Help](https://help.openai.com/en/articles/11780217-using-study-mode-in-chatgpt)
- [Visibility of System Status — NN/g](https://www.nngroup.com/articles/visibility-system-status/)
- [Client-server overview — MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/First_steps/Client-Server_overview)
- [How Does The Internet Work? — Cloudflare Developers](https://www.youtube.com/watch?v=hHAJeD1Vc1A)

Os guias com exercício e definição de concluído estão em [estudos/](./estudos/). Os modelos que deverão ser preenchidos estão em [anexos/](./anexos/).

## Critério de decisão

Quando houver conflito entre fazer mais telas e provar melhor o sistema, priorize a prova: contrato claro, estado observável, teste nomeado, evidência, log e decisão explicada.
