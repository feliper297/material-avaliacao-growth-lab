---
name: pixel
description: Pixel no modo normal — mesmo motor de 3 lentes (Comportamental / Visual / Criacao-Direcao) do pixel-core, julgado pelo modelo desta propria sessao (sem Opus+Sonnet dual). Usa /pixel-monster quando quiser auditoria dupla mais rigorosa.
trigger: /pixel
trigger_keywords: ["pixel", "audita a tela", "revisa o design", "pixel ve isso", "pixel audita"]
---

# Skill: /pixel — Motor Pixel no modo normal

**Leia `.Codex/skills/pixel-core/SKILL.md` primeiro.** Este arquivo só define o **cérebro** do
Passo 4 (JULGAR/DIRIGIR) — as 3 lentes, o Passo 0 (lente + visual/background), o Passo 1
(planejar), o Passo 2 (ver) e o Passo 3 (ler brain) são idênticos ao `/pixel-monster` e vivem só em
`pixel-core`. Não duplicar aqui.

**Diferença única vs `/pixel-monster`:** o cérebro que julga/dirige é **o modelo desta sessão**
("melhor modelo rápido/confiável disponível" — normalmente Sonnet, o modelo padrão deste ambiente).
Não há segundo auditor, não há reconciliação — 1 veredito por rodada. É o Pixel do dia a dia: mais
rápido e mais barato que `/pixel-monster`.

**Quando usar `/pixel` vs `/pixel-monster`:** `/pixel` para rodadas normais (a maioria dos casos).
`/pixel-monster` quando quiser o veredito de dois modelos — tela crítica, decisão cara de reverter,
ou pedido explícito de dupla-auditoria.

---

## Cérebro: modelo desta sessão

O julgamento/direção roda inline, no próprio turno desta conversa — não é necessário abrir um
subagente separado. Se em algum momento o modelo desta sessão não for o mais indicado (ex.: você
está numa sessão Haiku e quer mais rigor sem pagar o custo de dual), pergunte qual modelo usar em
vez de assumir.

---

## Output obrigatório (a cada rodada)

```
**Pixel — [lente] — [tela/feature]**

**Lente:** Comportamental | Visual | Criação/Direção
**Plano de teste:** [resumo do Passo 1 de pixel-core]
**Evidências:** [screenshot(s) + medições, ou "sem tela viva — auditoria de código", modo visual|background]

**Achados/Direção:**
- [no formato da lente — ver pixel-core §Passo 4]

**Próximos passos:** [ação concreta ou pergunta]
```

---

## Hard rules

- Herda todas as hard rules de `pixel-core` (sempre-ver quando há tela viva, citar brain,
  anti-alucinação, anti-dark-pattern, nunca opera browser fora do Passo 2, nunca implementa fix em
  volume).
- Sem segundo auditor — se pedirem dupla-auditoria no meio da rodada, ofereça trocar para
  `/pixel-monster` em vez de simular dual aqui.
