---
name: pixel-audit
description: Atalho pro /pixel com a lente Comportamental pre-selecionada (Nielsen 10, WCAG 2.1 AA, psicologia comportamental, performance-como-UX). Absorvido pelo motor pixel-core em 2026-07-17 — mantido como alias por compatibilidade de memoria muscular. Prefira /pixel (ou /pixel-monster) direto.
trigger: /pixel-audit
trigger_keywords: ["pixel-audit", "auditoria ux", "auditoria ui", "pixel audita", "analise ux", "auditoria completa", "heuristicas", "wcag", "acessibilidade"]
---

# Skill: /pixel-audit — Alias para /pixel (lente Comportamental)

**Absorvido pelo motor unico.** O checklist de 8 dimensoes que esta skill definia (Nielsen 10,
WCAG 2.1 AA, performance como UX, psicologia comportamental, hierarquia visual, copy, jornada,
mobile) agora vive dentro da **lente Comportamental** do `.claude/skills/pixel-core/SKILL.md`,
usada tanto por `/pixel` (model router normal) quanto por `/pixel-monster` (Opus + GPT-5.6 dual).

**O que fazer quando `/pixel-audit` for chamado:** tratar como `/pixel` com a lente **Comportamental**
ja selecionada (nao perguntar a lente — so o modo visual/background, que continua obrigatorio).
Seguir o motor completo de `pixel-core` (Passo 0-5): sempre ver o browser real (screenshot + visao
LLM + medicao DOM + fingerprint), RAG da lente comportamental (Nielsen/WCAG/vieses/carga cognitiva),
julgamento pelo model router normal, ponte de insights.

Performance continua parte da mesma rodada (nao e dimensao separada) — TTFB/LCP/INP/CLS entram
como parte do julgamento da lente Comportamental, igual ao comportamento anterior desta skill.

**Migrar mentalmente para:** `/pixel visual` ou `/pixel comportamental` (ou so `/pixel`, que
pergunta a lente) cobre o mesmo escopo com o motor atualizado (3 lentes, sempre-ve, RAG-driven).
Este arquivo continua funcional como atalho — nao e obrigatorio trocar de comando.

---

## Hard rules (herdadas de pixel-core)

- Bugs P1+ (`critical`) -> `/bug` chamado automaticamente pra criar Issue.
- Screenshots + medicoes obrigatorios como evidencia de cada achado.
- Score numerico nao e mais o formato padrao — o formato de achado agora e o template por
  dimensao/vies de `pixel-core` (mais rastreavel: fonte do Brain citada por achado).
