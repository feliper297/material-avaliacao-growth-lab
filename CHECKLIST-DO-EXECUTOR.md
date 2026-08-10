# Checklist visual do executor — Growth Lab

Autor: Bruno Liberato Girardi

Este é o roteiro operacional. O executor deve marcar cada item somente quando houver evidência. A lista não substitui o sistema: ela orienta o trabalho até que o painel dentro do produto esteja funcionando.

## Como usar

- `[ ]` pendente;
- `[x]` concluído com evidência;
- `[!]` bloqueado, com motivo registrado;
- `[→]` adiado conscientemente para outra fase.

Nunca marque um item apenas porque começou. Ao marcar `[x]`, informe o link para o arquivo, teste, commit, vídeo, preview ou registro correspondente.

## Ordem de início

- [x] Ler `README.md`. — evidência: sessão Cursor 2026-08-05
- [x] Ler `PAINEL-DE-ACOMPANHAMENTO.md`.
- [x] Ler este checklist inteiro.
- [ ] Ler `PROMPT-MESTRE-CURSOR.md`.
- [x] Rodar `projeto-base/` no Mac. — `python -m http.server 4173`, STATUS-INICIAL-ESPERADO.md
- [x] Preencher `projeto-base/STATUS-INICIAL-ESPERADO.md`.
- [ ] Definir a data real de início no Gantt.
- [ ] Criar ou atualizar a branch/tag da avaliação.
- [x] Registrar o primeiro uso de IA em `anexos/LOG-DE-IA.md`.

## Entrega obrigatória de toda sexta-feira

- [ ] Versão identificável: commit, tag ou ZIP.
- [ ] Preview, vídeo curto ou comando reproduzível.
- [ ] `anexos/REGISTRO-SEMANAL.md` preenchido.
- [ ] Evidências organizadas em `evidencias/semana-0N/`.
- [ ] Log de IA atualizado.
- [ ] O que foi aceito, rejeitado, corrigido e adiado.
- [ ] Bloqueios e hipóteses ainda não confirmadas.
- [ ] Próxima ação com critério de aceite.

---

## Fase 1 — Semana 1: clareza + sistema mínimo auditável

### Estudar

- [ ] [Limites de arquitetura](./estudos/01-limites-de-arquitetura.md).
- [ ] [BFF e contratos](./estudos/02-bff-e-contratos.md).
- [ ] Conteúdo variável: [Design system e Storybook](./estudos/06-design-system-e-storybook.md), se necessário.
- [ ] Usar o [prompt socrático de estudo](./PROMPT-DE-ESTUDO-COM-IA.md).
- [ ] Registrar três aprendizados, um teste e uma aplicação real.

### Entender e decidir

- [x] Definir usuário, contexto e problema. — ADR-001, ADR-002
- [ ] Registrar hipóteses e perguntas abertas.
- [ ] Definir objetivo âncora e resultado esperado em 30 dias.
- [ ] Definir escopo IN e OUT.
- [ ] Criar baseline dos critérios com justificativa.
- [ ] Mapear jornadas principais.
- [x] Definir responsabilidades de front-end, BFF, back-end, banco e agentes. — ADR-004 a ADR-007
- [x] Registrar alternativas descartadas e trade-offs. — `anexos/ADR.md`
- [ ] Criar modelo de dados inicial.

### Construir o sistema mínimo

- [ ] Iniciar ciclo de 30 dias.
- [ ] Registrar objetivo, demanda âncora e data.
- [ ] Registrar baseline.
- [ ] Mostrar fase atual e próxima ação.
- [ ] Registrar conteúdo, prática e definição de concluído.
- [x] Registrar evidência vinculada a critério. — parcial: evidência por semana via `POST /api/evidences`
- [ ] Registrar check-in semanal.
- [ ] Permitir ao avaliador registrar nota, feedback e próxima ação.
- [ ] Mostrar histórico inicial e da Semana 1.
- [x] Implementar estados vazio, salvando, sucesso e erro. — loading/error/saving/toast em `app/src`
- [x] Criar uma jornada de ponta a ponta reproduzível. — `npm run dev`, trilha + evidência + quiz + scores
- [ ] Criar o tutor inicial do sistema: perguntas guiadas sobre decisões, recomendações explicadas e registro das respostas.
- [ ] Perguntar ao Pixel, ou ao agente visual disponível, sobre hierarquia, estados, acessibilidade e consistência quando houver uma versão navegável.

### Entregar na sexta

- [ ] Demonstração do fluxo completo dentro do sistema.
- [x] Documento de decisões e limites técnicos. — `anexos/ADR.md`, `app/README.md`
- [x] Pelo menos três usos relevantes de IA registrados. — `anexos/LOG-DE-IA.md`
- [ ] Uma sugestão de IA rejeitada ou corrigida com justificativa.
- [x] Teste ou smoke test reproduzível. — `npm run test` (6 passed), `GET /api/health`
- [ ] [MVP da Fase 1](./MVP-DA-FASE-1.md) atendido. — bloqueado parcialmente por ADR-001 (recorte B)

---

## Fase 2 — Semana 2: dados, jornadas e persistência

### Estudar

- [ ] [Dados e persistência](./estudos/03-dados-e-persistencia.md).
- [ ] [Jornadas, feedback e testes](./estudos/07-jornadas-feedback-e-testes.md).
- [ ] Conteúdo variável: [Limites de arquitetura](./estudos/01-limites-de-arquitetura.md), se necessário.

### Melhorar o sistema

- [ ] Revisar o feedback da Semana 1 dentro do sistema.
- [ ] Corrigir a próxima ação definida na auditoria.
- [ ] Implementar ou justificar persistência.
- [ ] Garantir que baseline e avaliações semanais sejam históricos diferentes.
- [ ] Seguir uma evidência desde a interface até o armazenamento e retorno.
- [ ] Tratar rede indisponível, dado vazio, salvamento interrompido e conflito.
- [ ] Testar jornada de primeiro uso, evidência e feedback.
- [ ] Atualizar o painel com o que mudou desde a Semana 1.
- [ ] Atualizar o tutor com o feedback recebido, sem apagar a decisão anterior.

### Entregar na sexta

- [ ] Commit/tag `semana-02`.
- [ ] Evidência de uma jornada ponta a ponta.
- [ ] Testes de estados e falhas.
- [ ] Comparação entre o que foi prometido e entregue.
- [ ] Feedback anterior marcado como resolvido, parcial ou não iniciado.
- [ ] Próxima ação da Semana 3.

---

## Fase 3 — Semana 3: IA, agentes, guardrails e testes

### Estudar

- [ ] [IA e vibecoding](./estudos/04-ia-e-vibecoding.md).
- [ ] [Agentes e guardrails](./estudos/05-agentes-e-guardrails.md).
- [ ] [Prompt de estudo com IA](./PROMPT-DE-ESTUDO-COM-IA.md).

### Melhorar o sistema

- [ ] Diferenciar prompt, ferramenta, workflow e agente.
- [ ] Definir contexto, memória, limites, aprovações e logs.
- [ ] Implementar ou simular de forma honesta uma interação de IA.
- [ ] Validar entradas e saídas da IA.
- [ ] Registrar resposta ruim, exagerada ou alucinada.
- [ ] Corrigir o problema e provar a correção.
- [ ] Revisar diffs produzidos por IA.
- [ ] Adicionar testes de componente e jornada no navegador.
- [ ] Mostrar no sistema o status da execução ou da falha de IA.
- [ ] Mostrar quais recomendações vieram do tutor/Pixel e quais foram decisões humanas.

### Entregar na sexta

- [ ] Commit/tag `semana-03`.
- [ ] Três usos de IA documentados.
- [ ] Uma correção com evidência antes/depois.
- [ ] Teste de jornada e teste de estado.
- [ ] Feedback anterior incorporado ou justificado.
- [ ] Próxima ação da Semana 4.

---

## Fase 4 — Semana 4: design system, CI/CD, deploy e checkup

### Estudar

- [ ] [Design system e Storybook](./estudos/06-design-system-e-storybook.md).
- [ ] [CI/CD, deploy e operação](./estudos/08-cicd-deploy-e-operacao.md).
- [ ] Conteúdo variável: [Jornadas, feedback e testes](./estudos/07-jornadas-feedback-e-testes.md).

### Melhorar o sistema

- [ ] Documentar tokens e componentes principais.
- [ ] Cobrir estados default, focus, loading, vazio, sucesso e erro.
- [ ] Executar lint, typecheck, testes e build quando aplicável.
- [ ] Configurar CI ou documentar por que ficou fora do escopo.
- [ ] Fazer deploy ou declarar claramente o limite local.
- [ ] Executar smoke test.
- [ ] Documentar rollback ou recuperação.
- [ ] Fazer checkup final comparável ao baseline.
- [ ] Registrar bloqueios, aprendizados e próximo ciclo.

### Entregar na sexta

- [ ] Commit/tag `semana-04`.
- [ ] Preview ou URL publicada.
- [ ] Evidência de CI, build ou teste.
- [ ] Checkup final dentro do sistema.
- [ ] Comparação por critério: baseline, semanas e final.
- [ ] Retrospectiva do processo.
- [ ] Plano do próximo ciclo.

## Regra final

As fases são cumulativas. Não comece a Semana 2 fingindo que a Semana 1 terminou: leve os bloqueios adiante, corrija o feedback e mostre no painel o que evoluiu.
