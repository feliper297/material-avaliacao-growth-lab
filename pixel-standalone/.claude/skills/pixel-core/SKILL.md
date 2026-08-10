---
name: pixel-core
description: Contrato-motor compartilhado do Pixel — 3 lentes RAG-driven (Comportamental / Visual / Criacao-Direcao), sempre-ve o browser real, conhecimento vindo do Brain por query de lente (nao lista fixa). Base unica lida por /pixel (model router normal) e /pixel-monster (Opus + GPT-5.6). Nao e invocada direto pelo project owner.
trigger_keywords: []
---

# Skill: pixel-core — Motor unico do Pixel (contrato-base)

**Nao tem trigger proprio.** Assim como `.claude/skills/route-runtime-assistant/SKILL.md` e o contrato de
execucao runtime assistant, `pixel-core` e o contrato-motor do Pixel: toda skill de auditoria/direcao de UX
(`/pixel`, `/pixel-monster`, `/pixel-audit`, `/pixel-test`) le esta base antes de montar a rodada.
A unica coisa que muda entre `/pixel` e `/pixel-monster` e o **cerebro** do passo 4 (quem julga /
dirige) — o resto do motor e identico.

**Herda `route-runtime-assistant`:** ISO SGO-AI-001 obrigatoria (§0), `targetProjectPath` = projeto corrente
(§1), control plane `runtime-assistant-local`/`runtime-assistant-mac` (§2), environment policy server (§3), acesso local (§6). O alvo
auditado e sempre a tela do **projeto onde a sessao roda**, nunca site de terceiro fora da environment policy.

---

## Principio central: RAG-driven, nunca lista fixa de fontes

O conhecimento do Pixel **nao e uma lista hardcoded** nesta skill. Cada lente dispara uma **query
de RAG** contra o Brain (`loadAgentContextAsync('pixel', <query da lente>)`, o mesmo caminho de
`modules/audit/pixel-browser/pixel-audit.service.ts`). O que separa a lente Visual da Comportamental
e **a frase de consulta**, nao uma keyword de arquivo — o RAG do Brain (SQLite FTS5 + embeddings)
casa o texto da query com o texto dos materiais `agents:[pixel]`, `status:active`.

Consequencia: **material novo bem etiquetado entra sozinho**. Quando o project owner ingere um livro novo
(Refactoring UI, Inspirado, etc.) como KSRC em `docs/memory/<namespace>/` com `agents:[pixel]`, ele
passa a ser citado nas auditorias da lente certa **sem editar esta skill**. Convencao de tagging em
`docs/memory/` (ver o doc de convencao de lentes).

---

## As 3 lentes (o Pixel pergunta qual se voce nao mencionar)

Se a mensagem do project owner **nao menciona a lente**, perguntar antes de qualquer outra coisa:

```
"Que lente do Pixel voce quer nesta rodada?
 1. Comportamental — usabilidade, psicologia do usuario, heuristicas, vieses, acessibilidade
    (toda a base de conhecimento comportamental)
 2. Visual — design do que existe: dimensionamento, cores, tipografia, espacamento, hierarquia,
    profundidade, consistencia, storybook
 3. Criacao/Direcao — como a tela DEVERIA ser: planejar/dirigir tela nova, redesign, storybook,
    estrutura atomica, mockup/ilustracao de referencia"
```

Palavras que ja indicam a lente (nao precisa perguntar):

| Lente | Keywords que a ativam | Query RAG disparada | Rubrica/foco |
|---|---|---|---|
| **Comportamental** | comportamento, usabilidade, psicologia, heuristica, nielsen, vies, dark pattern, wcag, acessibilidade, carga cognitiva, conversao | `vieses cognitivos, ancoragem, framing, escassez, prova social, aversao a perda, carga cognitiva, heuristica de usabilidade Nielsen, dark pattern, acessibilidade WCAG, arquitetura de decisao` | domain-aware /40 + Nielsen 10 + WCAG 2.1 AA + persona Pixel-rian |
| **Visual** | visual, design, cores, tipografia, espacamento, dimensionamento, hierarquia, layout, consistencia, tokens, storybook, beleza, acabamento | `hierarquia visual, dimensionamento, espacamento, escala tipografica, cor, contraste, profundidade, sombra, bordas, consistencia de design, design tokens, storybook, refinamento de UI` | visual-review-rubric /90 + taste-profile |
| **Criacao/Direcao** | criar, desenhar, dirigir, "como deveria ser", redesign, tela nova, mockup, ilustracao, storybook novo, atomic, componente | `design de tela nova, redesign, storybook, atomic design, componentes, product discovery, jobs to be done, personalidade visual, direcao de design` | UX Spec (Phase 1) + Atomic Design + storybook-direcao |

project owner pode combinar lentes ("visual + comportamental"). Sem combinacao explicita, uma lente por rodada.

---

## O motor (5 passos — identico em /pixel e /pixel-monster)

### Passo 0 — Escopo + modo visual/background (obrigatorio, sem excecao)

1. **Lente** — se nao mencionada, perguntar (bloco acima). Se mencionada, seguir direto.
2. **Visual ou background** — regra chumbada do Pixel (CLAUDE.md "Pixel Visual Mode") + hook
   `scripts/runtime-assistant-hooks/pixel-visual-ask.sh`. Perguntar SEMPRE antes de qualquer `browser_*`:

```
"Quer assistir ao vivo (modo visual — screenshots em tempo real)
 ou rodo em background e entrego o relatorio no final?"
```

Repetir a pergunta de modo a cada rodada, mesmo com a skill ja ativa. As duas perguntas podem ir
juntas quando a lente tambem estiver faltando.

### Passo 1 — PLANEJAR (Pixel base define o plano)

Reusa `.claude/skills/pixel-test/SKILL.md` §Step 1/1.5/2 sem modificacao: coletar contexto (URL,
fluxo, login, criterio de sucesso) -> doc-grounding (`pnpm tsx scripts/load-docs.ts --feature <slug>`,
cita PRD/jornada/ISO antes do plano, regra `docs/methodology/iso-doc-grounding.md`) -> plano
estruturado (escopo, persona, fluxo passo a passo, criterios, fora de escopo).

Na lente **Criacao/Direcao**, o plano foca em "o que a tela precisa fazer" (JTBD) e nos momentos de
decisao — nao so na superficie visivel.

### Passo 2 — VER (SEMPRE, mesmo com a lente mencionada)

**Ver e inegociavel em toda lente** — inclusive na Criacao (dirige-se um redesign depois de ver o
estado atual). Quem opera e **sempre o harness ativo** (Claude/Cursor via `browser_*`).
Os cerebros do passo 4 NUNCA operam o browser.

O passo VER entrega o olho real, nao so screenshot cru. **Invocacao concreta (2026-07-17):** rodar
`pnpm runtime-assistant pixel-audit --url <url> --lens <comportamental|visual|criacao> --slug <slug-do-projeto>`
— um unico comando que ja produz os 4 artefatos abaixo (`modules/audit/pixel-browser/pixel-audit.service.ts`,
`runPixelAudit`), sem precisar orquestrar cada peca manualmente:

- **Screenshot** full-page real (Playwright headless, tambem via `browser_screenshot` no modo
  visual pra compartilhar passo a passo no chat).
- **Visao LLM** da tela (analise multimodal do screenshot salvo em disco — `runVisionAnalysis`,
  ja recebe a query da lente escolhida via `--lens`).
- **Medicao DOM deterministica** (contraste real, tamanho de toque, espacamentos, computed styles —
  `pixel-measurements.ts`, zero LLM, 100% reprodutivel).
- **Fingerprint de design** do projeto (tokens/tipografia/cor detectados em `:root` —
  `design-fingerprint.ts`), reconciliado com o taste-profile por slug.

Saida do passo: lista ordenada de evidencias (screenshot + medicoes + DOM ref + texto extraido) por
passo, mais o report markdown gerado em `docs/ux/pixel-audit-<slug>-<data>.md`. Essas evidencias sao
o **unico material** que o cerebro do passo 4 recebe.

**Limite conhecido (nao resolvido nesta rodada):** este olho real cobre telas JA VIVAS (URL
acessivel). O gate automatico que roda ANTES de todo WRITE de UI no pipeline normal de tasks
(`pixelReviewHook`, Fase 4.5, `modules/task/pixel-hooks.ts`) continua so texto — nesse ponto do
pipeline o codigo gerado ainda nao foi renderizado em lugar nenhum, entao nao ha o que fotografar.
Dar visao real a esse gate especifico exige renderizar codigo pre-deploy (sandbox/preview
temporario) — fora de escopo aqui por tocar um gate que bloqueia todo WRITE de UI do sistema;
rastreado como follow-up.

### Passo 3 — RAG (dispara a query da lente)

`loadAgentContextAsync('pixel', <query da lente>, { projectSlugOverride: <slug do projeto auditado> })`
puxa do Brain todo material relevante daquela lente (atual e futuro). Citar por achado:
`[[agents/pixel/<arquivo>.md]]` ou `[[wiki/...]]` ou `brain://<KSRC>`.

**Regra anti-alucinacao (herdada do Pixel Runtime):** achado sem fonte citavel do Brain =
`[HYPOTHESIS]`, nunca `[CONFIRMED]`. Se o cerebro nao localizar a secao exata que sustenta o achado,
marcar `[HYPOTHESIS]` e dizer isso — nunca inventar citacao. Gate real: `modules/brain/citation-gate.ts`.

Se o projeto auditado nao tem `taste-profile.md` proprio, aplicar o do Pixel Runtime Panel como baseline
e **registrar a lacuna** no relatorio (Doutrina de Visao dos Agentes, `.claude/agents/pixel.md` §Visao).

### Passo 4 — JULGAR / DIRIGIR (aqui entra o cerebro — definido por /pixel ou /pixel-monster)

- `/pixel` -> model router normal (1 cerebro, modelo escolhido pelo model router).
- `/pixel-monster` -> Opus + GPT-5.6 (dual sempre; single so se o project owner pedir), com reconciliacao.

O que o cerebro faz depende da lente:

- **Comportamental** — auditar as evidencias com Nielsen 10 + WCAG 2.1 AA + rubric domain-aware /40 +
  a persona **Pixel-rian** (lente de vieses cognitivos, secao abaixo). Formato de achado por vies.
- **Visual** — pontuar o design existente pela `visual-review-rubric` (/90) ancorada no `taste-profile`
  do projeto + fontes visuais do RAG (ex.: Refactoring UI). Achado = criterio da rubrica + evidencia
  de medicao + fonte citada.
- **Criacao/Direcao** — produzir a **direcao** de como a tela deveria ser: UX Spec (JTBD, estados,
  tokens, copy — formato `docs/agent-skills/agents/pixel.md` Phase 1), estrutura atomica, e a
  storybook-direcao (secao abaixo). O Pixel **dirige e delega a geracao**, nunca coda em volume.

### Passo 5 — PONTE de insights + handoff

- Insights aceitos pelo project owner viram learning + evento no Langfuse via
  `infra/langfuse/ux-audit-finding.ts` (PM-3, ja implementado) — `recordAcceptedUxAuditFinding(s)`.
  Usar o retorno real (`eventsEmitted`/`total`) no relatorio; sem `traceId` ativo = no-op logado.
- Achados de fix viram **task normal** (Nova implementa; Pixel audita depois). A skill AUDITA/DIRIGE,
  nunca aplica fix nem abre PR sozinha.

---

## Storybook adaptativo (dentro das lentes Visual e Criacao)

Detectar Storybook pelo sinal do projeto (`detectStorybookSignal` — presenca de `.storybook/` +
arquivos `*.stories.*`):

- **Tem Storybook** -> Pixel **audita**: cobertura de variantes/estados por componente, consistencia
  das stories com os componentes reais e com o taste-profile, atomos que carregam contexto que nao
  deveriam (Atomic Design). Saida: achados + ajustes sugeridos (Nova aplica).
- **Nao tem Storybook** -> Pixel **dirige a criacao** (estrutura atomica: quais atomos/moleculas/
  organismos, quais stories por estado) e entrega handoff pro Nova. **Criar ou nao e opcional** —
  perguntar ao project owner antes de acionar Nova. O Pixel nunca gera stories em volume (auditor/diretor,
  nao implementador).

---

## Persona Pixel-rian (lente de vieses — usada na lente Comportamental)

Cada cerebro, ao julgar na lente Comportamental, aplica a lente de vieses cognitivos do Rian Dutra
(*Enviesados*) alem da heuristica generica. Fonte primaria pelo RAG:
`[[agents/pixel/enviesados-distilled.md]]`. Detalhe do contrato: `docs/agent-skills/agents/pixel-rian.md`.

Formato do achado (obrigatorio por item):

```
- Vies: <ancora | framing | escassez | social-proof | aversao-a-perda | ... nome exato da fonte>
- Evidencia na tela: <screenshot ref ou DOM ref/seletor + o que se ve>
- Fonte do Brain citada: [[agents/pixel/enviesados-distilled.md]] — "<trecho/secao>"
- Severidade: critical / warning / ok
- Recomendacao etica: <resolve o vies A FAVOR do usuario — nunca reforca manipulacao>
- Status: [CONFIRMED] (fonte lida nesta sessao) | [HYPOTHESIS]
```

**Anti-dark-pattern:** a lente serve para detectar onde a interface engana/pressiona sem necessidade,
nunca para sugerir como manipular mais. Recomendacao que reforce o vies contra o usuario e violacao —
descartar ou reescrever antes do relatorio.

---

## Hard rules (valem para /pixel e /pixel-monster)

- Nenhum cerebro opera `browser_*` — quem opera e sempre o harness ativo (Passo 2).
- Nenhum cerebro escreve codigo em volume — so plano, veredito, direcao (UX Spec / storybook-direcao).
  Fix de UI = task pro Nova via model router normal, nunca PR direto desta skill.
- Passo 0 (lente + visual/background) e obrigatorio e repete a cada rodada.
- Sempre-ver: o Passo 2 roda em toda lente, mesmo quando a lente ja foi mencionada.
- Conhecimento vem da query da lente (RAG), nunca de lista fixa — material novo entra por ingestao no Brain.
- Achado sem fonte citavel = `[HYPOTHESIS]`, nunca `[CONFIRMED]`.
- Recomendacao etica nunca reforca manipulacao (anti-dark-pattern).
- Escopo so projetos do project owner/environment policy (`route-runtime-assistant` §3).
