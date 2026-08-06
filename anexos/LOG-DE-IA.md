# Log de uso de IA — 2026-08-05

Executor: sessão Cursor (executor técnico + tutor)
Ferramenta ou modelo: Cursor Agent (Composer)
Etapa: descoberta / observação do projeto-base

## Objetivo

Ler o pacote Growth Lab, executar o projeto-base e registrar estado inicial antes de qualquer alteração de código.

## Prompt

```text
Você é o executor técnico e tutor de onboarding do Growth Lab.
Leia README.md, PAINEL-DE-ACOMPANHAMENTO.md, CHECKLIST-DO-EXECUTOR.md,
MVP-DA-FASE-1.md, DESAFIO-DUPLO.md e PRIMEIRA-SEMANA.md.
Antes de codar, rode o projeto-base e registre o estado inicial.
Faça uma pergunta por vez sobre problema, usuário, stack, front-end, BFF...
```

## Resposta recebida

Análise do protótipo estático: trilha de Product Design com localStorage, sem ciclo auditável, baseline, check-in, feedback de avaliador ou histórico comparável. Tutor = template de prompt externo. Decisão preliminar: reconstruir fluxos core; manter referência visual.

## Decisão humana

- Aceitei: registrar estado inicial em STATUS-INICIAL-ESPERADO.md antes de codar; seguir onboarding uma pergunta por vez.
- Rejeitei: tratar o protótipo como arquitetura final ou MVP da Fase 1.
- Adiei: implementação até concluir descoberta guiada (problema → rollback).

## Erro, excesso ou risco encontrado

Risco de começar pelo layout bonito do protótipo sem resolver o gap de auditabilidade (baseline, evidência vinculada a critério, feedback, histórico).

## Verificação

- Arquivo, teste, log ou fonte consultada: `projeto-base/index.html` (leitura completa), servidor `python -m http.server 4173`
- Resultado: protótipo roda; gaps confirmados contra MVP-DA-FASE-1.md
- Status: [x] confirmado [ ] hipótese [ ] não confirmado

## Impacto

- Arquivos alterados: `projeto-base/STATUS-INICIAL-ESPERADO.md`, `anexos/LOG-DE-IA.md`
- Testes executados: HTTP 200 no servidor local
- Próxima ação: responder pergunta 1 do tutor (problema) e registrar decisão

---

# Log de uso de IA — 2026-08-05 (decisão de problema)

Executor: sessão Cursor
Ferramenta ou modelo: Cursor Agent (Composer)
Etapa: descoberta / decisão de produto

## Objetivo

Registrar a escolha humana sobre o recorte do problema (Pergunta 1 do tutor).

## Prompt

Tutor apresentou opções A (evolução auditável), B (trilha + checklist), C (só avaliador), D (híbrido).

## Resposta recebida

Usuário respondeu: **B**

## Decisão humana

- Aceitei: Opção B — trilha de conteúdo + checklist
- Rejeitei: Opção A recomendada pelo tutor para atender gate da Fase 1
- Adiei: camada de auditabilidade (baseline, check-in, histórico) — risco documentado em ADR-001

## Erro, excesso ou risco encontrado

Opção B conflita com `MVP-DA-FASE-1.md` gate obrigatório. Tutor registrou risco e mitigação em ADR-001; não marcou nada como concluído sem evidência.

## Verificação

- Arquivo: `anexos/ADR.md` (ADR-001)
- Resultado: decisão humana registrada com trade-offs explícitos
- Status: [x] confirmado

## Impacto

- Arquivos alterados: `anexos/ADR.md`, `anexos/LOG-DE-IA.md`
- Próxima ação: Pergunta 2 — Usuário

---

# Log de uso de IA — 2026-08-05 (decisão de usuário)

Executor: sessão Cursor
Ferramenta ou modelo: Cursor Agent (Composer)
Etapa: descoberta / persona

## Objetivo

Registrar escolha do usuário principal (Pergunta 2).

## Prompt

Tutor apresentou A (profissional solo), B (PD trilha guiada), C (executor avaliação), D (time pequeno).

## Resposta recebida

Usuário respondeu: **b** → Opção B (Product Designer em trilha guiada)

## Decisão humana

- Aceitei: Opção B
- Rejeitei: —
- Adiei: —

## Verificação

- Arquivo: `anexos/ADR.md` (ADR-002)
- Status: [x] confirmado

## Impacto

- Próxima ação: Pergunta 3 — Stack

---

# Log de uso de IA — 2026-08-05 (decisão de stack)

Executor: sessão Cursor
Etapa: descoberta / arquitetura

## Resposta recebida

Usuário: **b** → Vite + React + TypeScript + Tailwind

## Decisão humana

- Aceitei: Opção B
- Registrado em ADR-003

## Impacto

- Próxima ação: Pergunta 4 — Front-end

---

# Log de uso de IA — 2026-08-05 (front-end — delegação)

## Resposta recebida

Usuário: **"tanto faz"**

## Decisão humana

- Aceitei: recomendação do tutor → **Opção B** (UI + serviços + hooks)
- Registrado em ADR-004

## Impacto

- Próxima ação: Pergunta 5 — BFF

---

# Log de uso de IA — 2026-08-05 (BFF)

## Resposta recebida

Usuário: **b** → BFF leve com contrato antecipado

## Decisão humana

- Aceitei: Opção B (ADR-005)

## Impacto

- Próxima ação: Pergunta 6 — Back-end

---

# Log de uso de IA — 2026-08-05 (back-end — delegação)

## Resposta recebida

Usuário: **d** (tanto faz)

## Decisão humana

- Aceitei: recomendação tutor → **Opção B** módulo de domínio (ADR-006)

## Impacto

- Próxima ação: Pergunta 7 — Banco

---

# Log de uso de IA — 2026-08-05 (persistência)

## Resposta recebida

Usuário: **b** → JSON no servidor via BFF

## Decisão humana

- Aceitei: Opção B (ADR-007)

## Impacto

- Próxima ação: Pergunta 8 — Design system

---

# Log de uso de IA — [próximas entradas]

---

# Log de uso de IA — 2026-08-05 (implementação walking skeleton)

Executor: sessão Cursor
Etapa: código / arquitetura

## Objetivo

Implementar app React conforme ADR-001–014: trilha PD, BFF leve, domínio, JSON.

## Decisão humana

- Aceitei: stack Vite+React+TS+Tailwind, BFF Express, persistência JSON
- Rejeitei: manter monolito HTML como produto final
- Adiei: gate MVP auditável completo (baseline, check-in, feedback avaliador) — conflito documentado com ADR-001

## Verificação

- `npm run test` → 6 passed
- `npm run build` → OK
- BFF `GET /api/health` → `{ ok: true, persistence: "json-file" }`
- Front: http://127.0.0.1:5173/

## Impacto

- Nova pasta `app/` com walking skeleton
- Próxima ação: evoluir para híbrido (ADR-001→D) ou completar check-in/baseline/feedback

[Usar o template acima para cada uso relevante de IA]
