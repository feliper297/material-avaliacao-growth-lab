---
name: pixel
description: Pixel no model router normal — mesmo motor de 3 lentes RAG-driven do pixel-core (Comportamental / Visual / Criacao-Direcao) usado pelo /pixel-monster, so que julgado por 1 cerebro do model router normal (sem Opus/GPT-5.6). Sempre ve o browser real. Use /pixel-monster quando quiser o cerebro superior (dupla-auditoria Opus+GPT-5.6).
trigger: /pixel
trigger_keywords: ["pixel", "audita a tela", "revisa o design", "pixel ve isso", "pixel audita"]
---

# Skill: /pixel — Motor Pixel no model router normal

**Le `.claude/skills/pixel-core/SKILL.md` primeiro.** Este arquivo so define o **cerebro** do
Passo 4 (JULGAR/DIRIGIR) do motor — as 3 lentes, o Passo 0 (lente + visual/background), o Passo 1
(planejar), o Passo 2 (ver — sempre) e o Passo 3 (RAG por lente) sao **identicos** ao
`/pixel-monster` e vivem so em `pixel-core`. Nao duplicar aqui.

**Diferenca unica vs `/pixel-monster`:** o cerebro que julga/dirige na lente escolhida e **o
model router normal** (1 modelo, escolhido pela rota `ux_review_deep` — `PIXEL_MODELS` em
`modules/task/pixel-hooks.ts`), sem gates de Opus/GPT-5.6, sem preflight de auditor duplo, sem
reconciliacao. E o Pixel do dia a dia — mais rapido e barato que `/pixel-monster`.

**Quando usar `/pixel` vs `/pixel-monster`:** `/pixel` para rodadas normais de auditoria/direcao
UX (a maioria dos casos). `/pixel-monster` quando project owner quer o cerebro superior — tela critica de
conversao, decisao de design com custo alto de reverter, ou quando pedir dupla-auditoria
explicitamente.

---

## Cerebro: model router normal

O julgamento/direcao na lente escolhida (Comportamental/Visual/Criacao) e feito pelo model router
normal do Pixel — `callLLMCascade(prompt, PIXEL_MODELS, 'pixel')`, mesma infra que ja roda os hooks
`pixelSpecHook`/`pixelReviewHook` (`modules/task/pixel-hooks.ts`). Nao ha gate de auditor externo,
nao ha reconciliacao — 1 veredito por rodada.

---

## Output obrigatorio (a cada rodada)

```
**Pixel — [lente] — [tela/feature]**

**Lente:** Comportamental | Visual | Criacao/Direcao
**Plano de teste:** [resumo do Passo 1 de pixel-core]
**Evidencias:** [N screenshots + medicoes + fingerprint, modo visual|background]

**Achados/Direcao:**
- [no formato da lente — ver pixel-core §Passo 4]

**Proximos passos:** [acao concreta ou pergunta pro project owner]
```

---

## Hard rules

- Herda TODAS as hard rules de `pixel-core` (sempre-ve, RAG por lente, anti-alucinacao,
  anti-dark-pattern, auditor nunca opera browser nem coda em volume).
- Sem gates de Opus/GPT-5.6 — se project owner pedir dupla-auditoria no meio da rodada, oferecer trocar
  pra `/pixel-monster` em vez de simular dual aqui.
- Escopo apenas projetos do project owner/environment policy (`route-runtime-assistant` §3).
