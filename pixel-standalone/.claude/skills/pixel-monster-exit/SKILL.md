---
name: pixel-monster-exit
description: Desativa o cerebro Opus + GPT-5.6 (dual sempre) do /pixel-monster e volta ao motor pixel-core rodando no model router normal (/pixel) — mesmas 3 lentes, sem persona Pixel-rian nem reconciliacao de veredito. Par do /pixel-monster.
trigger: /pixel-monster-exit
trigger_keywords: ["pixel-monster-exit", "sai do modo pixel monster", "desativa pixel-rian", "desativa auditoria ux dupla"]
---

# Skill: /pixel-monster-exit — Desativa o cerebro dual do Pixel-Monster

Encerra o escopo de sessao/sprint aberto por `/pixel-monster`. A partir daqui:

- Auditoria/direcao UX volta ao motor `.claude/skills/pixel-core/SKILL.md` rodando via `/pixel`
  (model router normal — Pixel planeja, harness opera, Pixel julga/dirige nas 3 lentes) — sem a persona
  Pixel-rian (lente de vieses cognitivos do Rian Dutra, especifica da lente Comportamental do modo
  dual) e sem dupla-auditoria Opus/GPT-5.6. As 3 lentes (Comportamental/Visual/Criacao) e o
  sempre-ve continuam identicos — so o cerebro do Passo 4 muda de dual pra model router normal.
- Nenhuma auditoria pendente (de qualquer um dos 2 auditores) fica assumida como feita so porque
  o modo saiu — se havia auditoria em andamento, registrar no handoff/relatorio final como
  pendente, incluindo qual dos 2 auditores ja tinha rodado e quais achados ja foram coletados.
- Achados ja coletados nesta rodada que ainda nao foram reportados a project owner devem ser entregues no
  relatorio de saida (mesmo formato "Output obrigatorio" do `/pixel-monster`) antes de sair do
  modo — nao descartar trabalho ja feito.
- project owner pode reativar a qualquer momento com `/pixel-monster`.
