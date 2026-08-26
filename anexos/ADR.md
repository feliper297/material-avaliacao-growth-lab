# ADR-001 — Recorte do problema (Growth Lab)

Status: aceita
Data: 2026-08-05

## Contexto

Na Pergunta 1 do tutor de onboarding, foi necessário definir qual problema o Growth Lab resolve neste ciclo. O pacote de avaliação recomenda evolução profissional auditável (Opção A); o protótipo-base implementa trilha de conteúdo + checklist (Opção B).

## Opções consideradas

1. **A — Evolução profissional auditável** — baseline, evidência vinculada a critério, feedback, histórico comparável
2. **B — Trilha de conteúdo + checklist** — organizar materiais, marcar concluído, registrar evidências soltas (como o protótipo)
3. **C — Ferramenta só para avaliador** — painel externo de notas e feedback
4. **D — Híbrido** — trilha de conteúdo + camada de auditabilidade

## Decisão

**Opção B** — Trilha de conteúdo + checklist, evoluindo a partir do protótipo existente.

Decisão humana registrada na sessão Cursor em 2026-08-05.

## Por quê

Escolha explícita do executor. Prioriza simplicidade, reaproveitamento visual do `projeto-base/` e foco em organização de estudo com checklist de conteúdos e evidências.

## Consequências

### Positivas

- Menor distância entre protótipo e primeira versão
- UI já navegável como referência
- Escopo inicial mais enxuto

### Negativas

- **Não atende o gate obrigatório da Fase 1** descrito em `MVP-DA-FASE-1.md` (ciclo, baseline, check-in, nota/feedback do avaliador, histórico comparável)
- Risco de medir atividade (conteúdos marcados) em vez de capacidade demonstrável
- Desafio B (usar o sistema para autoavaliação semanal) fica incompleto sem camada de auditabilidade

### Riscos e mitigação

| Risco | Mitigação proposta |
|---|---|
| Nota da semana limitada a 5/10 pelo gate do MVP | Documentar explicitamente o recorte e, se necessário, evoluir para D (híbrido) na Semana 2 |
| Evidências sem vínculo a critério | Adicionar campo opcional "critério/dimensão" no fluxo de evidência |
| Sem baseline comparável | Registrar como `[→]` adiado no checklist, com data alvo |

## Evidência

- Resposta humana: "B" (sessão Cursor, 2026-08-05)
- Tutor apresentou alternativas A–D com trade-offs antes da decisão
- Protótipo analisado em `projeto-base/STATUS-INICIAL-ESPERADO.md`

---

# ADR-002 — Usuário principal

Status: aceita
Data: 2026-08-05

## Contexto

Pergunta 2 do tutor: quem usa o produto no dia a dia, dado o recorte B (trilha + checklist).

## Opções consideradas

1. **A — Profissional solo em evolução** — perfil genérico do BRIEF
2. **B — Product Designer em trilha guiada** — alinhado ao protótipo atual
3. **C — Executor da avaliação Growth Lab** — candidato + entrega semanal
4. **D — Time pequeno (2–5)** — squad com mentor/avaliador

## Decisão

**Opção B** — Product Designer em trilha guiada de 30 dias (Figma, jornadas, sistemas, IA aplicada ao design).

Decisão humana: "b" (sessão Cursor, 2026-08-05).

## Por quê

Coerência com ADR-001 e com o `projeto-base/` (4 semanas de Product Design, conteúdos Figma/NNg/MDN, evidências de sprint).

## Consequências

### Positivas

- Persona clara para copy, jornadas e conteúdos
- Reaproveitamento direto dos 13 recursos já modelados no protótipo
- Evidências tipadas (Figma, fluxo, antes/depois) fazem sentido para PD

### Negativas

- Produto menos genérico que o BRIEF original
- Camada de avaliação Growth Lab (Desafio B) precisa ser explicitada como meta secundária ou adiada

### Riscos e mitigação

| Risco | Mitigação |
|---|---|
| Confundir trilha PD com sistema de avaliação | Documentar em README do app: "v1 = trilha PD; auditabilidade = fase 2" |
| Conteúdo hardcoded demais | Modelar semanas/recursos como dados editáveis na stack escolhida |

## Evidência

- Resposta humana: "b"
- Protótipo: `projeto-base/index.html` — persona implícita "Product Design · 30 dias"

---

# ADR-003 — Stack da aplicação

Status: aceita
Data: 2026-08-05

## Contexto

Pergunta 3 do tutor: qual stack para a primeira versão, dado ADR-001 (trilha + checklist) e ADR-002 (usuário PD).

## Opções consideradas

1. **A — HTML/CSS/JS estático** — como o protótipo
2. **B — Vite + React + TypeScript + Tailwind** — SPA modular e testável
3. **C — Next.js (App Router)** — full-stack
4. **D — Outra** — Vue, Svelte, etc.

## Decisão

**Opção B** — Vite + React + TypeScript + Tailwind CSS.

Decisão humana: "b" (sessão Cursor, 2026-08-05).

## Por quê

Equilíbrio entre reaproveitar referência visual do protótipo e ganhar modularidade, tipagem, testes e caminho de evolução para API/persistência nas fases 2–4.

## Consequências

### Positivas

- Componentes funcionais reutilizáveis (Button, Card, Modal, etc.)
- Typecheck e lint integráveis ao CI (Fase 4)
- Tailwind acelera fidelidade visual ao protótipo com tokens
- `localStorage` ou API futura isolável em camada de serviços

### Negativas

- Setup inicial antes da primeira tela
- Mais arquivos que o monolito estático

### Riscos e mitigação

| Risco | Mitigação |
|---|---|
| Over-engineering na Semana 1 | Walking skeleton mínimo; sem BFF/back-end real ainda |
| Perder visual do protótipo | Migrar tokens CSS (`:root`) para Tailwind config |

## Evidência

- Resposta humana: "b"
- Regras do executor: React functional components, Vite, Tailwind

---

# ADR-004 — Organização do front-end

Status: aceita
Data: 2026-08-05

## Contexto

Pergunta 4 do tutor: o que fica no front-end na Semana 1 (React).

## Opções consideradas

1. **A — UI + estado local** — tudo na UI + localStorage
2. **B — UI + camada de serviços** — components + `services/` + hooks
3. **C — UI + estado global** — Context/Zustand
4. **D — UI mínima + Storybook primeiro**

## Decisão

**Opção B** — UI + camada de serviços (`services/storage`, `services/trail`, hooks).

Decisão humana: executor respondeu **"tanto faz"** → tutor registra recomendação B como decisão aceita explicitamente.

## Por quê

Separa apresentação de persistência; facilita testes e substituição de localStorage por API na Fase 2 sem reescrever componentes. Evita over-engineering de store global (C) ou atraso de Storybook-first (D).

## Consequências

### Positivas

- Contrato claro: componentes consomem hooks/serviços
- Mock local honesto e substituível
- Alinhado a ADR-003 (React + TS)

### Negativas

- Estrutura de pastas um pouco maior que A

### Riscos e mitigação

| Risco | Mitigação |
|---|---|
| Serviços virarem "segundo back-end" | Serviços só fazem I/O e adaptação; regras leves documentadas |

## Evidência

- Resposta humana: "tanto faz" (delegação à recomendação do tutor)
- Referência: `ARQUITETURA-E-DECISOES.md` — front-end renderiza e coleta interações

---

# ADR-005 — BFF (Backend for Frontend)

Status: aceita
Data: 2026-08-05

## Contexto

Pergunta 5 do tutor: BFF necessário na Semana 1?

## Opções consideradas

1. **A — Sem BFF na Fase 1** — front-end → localStorage direto
2. **B — BFF leve agora** — proxy Vite ou API routes mínimas espelhando contrato futuro
3. **C — BFF desde já (Node/Express)** — servidor separado

## Decisão

**Opção B** — BFF leve: endpoints mínimos via Vite (plugin/express middleware ou similar) que expõem contrato REST alinhado ao domínio, implementação inicial pode delegar a persistência local/arquivo JSON.

Decisão humana: "b" (sessão Cursor, 2026-08-05).

## Por quê

Executor quer antecipar contrato front↔API sem subir infraestrutura pesada. Permite testar fatia vertical com fetch real enquanto persistência ainda é local/mock.

## Consequências

### Positivas

- Contrato HTTP definido cedo (`GET/POST /api/evidences`, etc.)
- Front-end não acopla a localStorage diretamente nos componentes
- Migração para back-end real = trocar implementação do BFF, não a UI

### Negativas

- Mais setup que Opção A
- Risco de BFF virar "back-end disfarçado" se concentrar regra de negócio

### Riscos e mitigação

| Risco | Mitigação |
|---|---|
| BFF com regra de negócio demais | BFF só adapta/valida payload; domínio documentado para Fase 2 |
| Mock apresentado como produção | README declara: "BFF local + JSON/file storage — não é deploy prod" |

## Evidência

- Resposta humana: "b"
- Referência: `estudos/02-bff-e-contratos.md`, Microsoft BFF pattern

---

# ADR-006 — Back-end e domínio

Status: aceita
Data: 2026-08-05

## Contexto

Pergunta 6 do tutor: onde ficam regras de domínio na Semana 1, com BFF leve (ADR-005).

## Opções consideradas

1. **A — Sem back-end** — regras leves só no BFF
2. **B — Módulo de domínio no monorepo** — funções puras testáveis
3. **C — Back-end Node completo** — Express/Fastify + repo

## Decisão

**Opção B** — Módulo de domínio (`src/domain/` ou `server/domain/`) com funções puras: cálculo de progresso, validação de evidência, progresso por semana.

Decisão humana: **"d" (tanto faz)** → tutor registra recomendação B.

## Por quê

Testável sem banco; BFF delega validação/cálculo ao domínio; evita microserviço prematuro (C) e BFF gordo (A).

## Consequências

### Positivas

- Testes unitários no domínio desde Semana 1
- Fronteira clara BFF (adaptação HTTP) vs domínio (regras)

### Negativas

- Pastas a mais no repo

### Riscos e mitigação

| Risco | Mitigação |
|---|---|
| Domínio inchado | Só regras já usadas pelo protótipo (progresso, evidência, quiz) |

## Evidência

- Resposta humana: "d"
- `ARQUITETURA-E-DECISOES.md` — back-end de domínio responsável por ciclo, evidências, consistência

---

# ADR-007 — Persistência (banco de dados)

Status: aceita
Data: 2026-08-05

## Contexto

Pergunta 7 do tutor: onde persistir trilha, evidências, quizzes e scores na Semana 1.

## Opções consideradas

1. **A — localStorage** — browser only
2. **B — Arquivo JSON no servidor** — BFF lê/escreve `data/store.json`
3. **C — SQLite local**
4. **D — Supabase/Postgres**

## Decisão

**Opção B** — Persistência via arquivo JSON no servidor, acessada exclusivamente pelo BFF leve.

Decisão humana: "b" (sessão Cursor, 2026-08-05).

### Evolução (2026-08+)

A versão publicada migrou para **Supabase** (Auth + Postgres). O JSON/BFF permanece no repo como legado da Semana 1. Estado atual: [app/ESTADO-DO-SISTEMA.md](../app/ESTADO-DO-SISTEMA.md).

## Por quê

Alinha com ADR-005 (BFF leve): front-end usa `fetch`, não localStorage direto. JSON é reproduzível, auditável e substituível por SQLite/Supabase na Fase 2 sem mudar contrato HTTP.

## Consequências

### Positivas

- Fatia vertical real: UI → HTTP → BFF → arquivo
- Export/backup = copiar JSON
- Honesto: documentar como persistência local de desenvolvimento

### Negativas

- Sem concorrência multi-usuário
- Risco de commitar dados sensíveis — `.gitignore` em `data/store.json`

### Riscos e mitigação

| Risco | Mitigação |
|---|---|
| JSON apresentado como DB prod | README + ADR: "mock de persistência Fase 1" |
| Corrupção de arquivo | Escrita atômica (write temp + rename); validação schema no BFF |

## Evidência

- Resposta humana: "b"
- Modelo sugerido: `ARQUITETURA-E-DECISOES.md` (cycles, evidences, assessments…)

---

# ADR-008 — Design system

Status: aceita (recomendação tutor — perguntas 8–14 retomadas sem nova rodada)
Data: 2026-08-05

## Decisão

**Tokens + componentes base** — migrar tokens do protótipo para Tailwind; `Button`, `Card`, `Modal`, `Badge`, `EmptyState`, `Toast` com estados default/hover/focus/loading/empty/success/error.

---

# ADR-009 — Storybook

Status: aceita (adiado)
Data: 2026-08-05

## Decisão

**Sem Storybook na Semana 1** — `[→]` Fase 4. Componentes documentados via uso na app; smoke test cobre jornada.

---

# ADR-010 — Hospedagem

Status: aceita
Data: 2026-08-05

## Decisão

**Local dev na Semana 1** — Vite (5173) + Express BFF (3001). Deploy `[→]` Fase 4 (Vercel front + serverless ou Railway para BFF).

---

# ADR-011 — GitHub

Status: aceita
Data: 2026-08-05

## Decisão

**Monorepo na pasta `app/`** dentro do pacote; commits incrementais; branch de feature quando aplicável.

---

# ADR-012 — CI/CD

Status: aceita (adiado)
Data: 2026-08-05

## Decisão

**Scripts locais na Semana 1** — `npm run lint`, `npm run test`, `npm run build`. Pipeline GitHub Actions `[→]` Fase 4.

---

# ADR-013 — Testes

Status: aceita
Data: 2026-08-05

## Decisão

**Vitest** — testes unitários no domínio (`shared/domain`); smoke test de API BFF; Playwright `[→]` Fase 3.

---

# ADR-014 — Rollback

Status: aceita
Data: 2026-08-05

## Decisão

**Backup JSON + git** — `data/store.json` no `.gitignore`; rollback = restaurar backup ou `store.example.json`; documentado no README da app.

---

# ADR-[n] — [próximas decisões]

[Usar o template acima]
