---
name: pixel-monster-exit
description: Desativa o modo dual (Opus + Sonnet 5) do /pixel-monster e volta ao motor pixel-core rodando via /pixel (1 cerebro so).
trigger: /pixel-monster-exit
trigger_keywords: ["pixel-monster-exit", "sai do modo pixel monster", "desativa auditoria ux dupla"]
---

# Skill: /pixel-monster-exit — Desativa o modo dual do Pixel-Monster

Encerra o escopo aberto por `/pixel-monster` para o resto desta conversa. A partir daqui, auditoria
volta ao motor `.Codex/skills/pixel-core/SKILL.md` via `/pixel` (1 cérebro, sem persona dual nem
reconciliação).

Se havia auditoria em andamento quando o modo saiu, registrar no relatório de saída o que já foi
coletado (qual dos dois auditores já tinha rodado, quais achados já existem) — não descartar
trabalho já feito, e não fingir que terminou se não terminou.

O usuário pode reativar a qualquer momento com `/pixel-monster`.
