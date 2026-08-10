---
name: pixel-monster
description: Porta unica do Pixel com cerebro superior — mesmo motor de 3 lentes RAG-driven do pixel-core (Comportamental / Visual / Criacao-Direcao), julgado por Opus + GPT-5.6 EM DUPLA SEMPRE (com reconciliacao), persona Pixel-rian na lente comportamental, sempre ve o browser real. Analogo UX do /runtime-assistant-monster. Auditores nunca operam browser nem escrevem codigo em volume.
trigger: /pixel-monster
trigger_keywords: ["pixel-monster", "pixel monster", "auditoria ux dupla", "pixel-rian", "opus e gpt56 audita ux", "dois auditores ux", "pixel dupla auditoria"]
---

# Skill: /pixel-monster — Motor Pixel com cerebro Opus + GPT-5.6

**Le `.claude/skills/pixel-core/SKILL.md` primeiro.** Este arquivo so define o **cerebro** do
Passo 4 (JULGAR/DIRIGIR) do motor — as 3 lentes, o Passo 0 (lente + visual/background), o Passo 1
(planejar), o Passo 2 (ver — sempre) e o Passo 3 (RAG por lente) sao **identicos** ao `/pixel`
normal e vivem so em `pixel-core`. Nao duplicar aqui.

**Diferenca unica vs `/pixel`:** o cerebro que julga/dirige na lente escolhida e **Opus +
GPT-5.6 em DUPLA SEMPRE** (nao 1 cerebro do model router normal), com reconciliacao de veredito —
mesmo contrato do `.claude/skills/runtime-assistant-monster/SKILL.md` (ADR-011,
`docs/adr/ADR-011-runtime-assistant-monster-dual-model-audit.md`), adaptado ao dominio UX/design em vez de
codigo/PR.

**Origem:** PRD `docs/specs/active/pixel-monster/prd-pixel-monster.md`. Evoluido 2026-07-17 (project owner):
"pixel-monster usa Opus + GPT 5.6, não só opus... dual sempre, exceto se eu mencionar para usar
um dos dois apenas" + "3 lentes: comportamental, visual, criação/direção".

**Escopo:** ativo para a sessao/sprint atual. Desativa com `/pixel-monster-exit`, com
"Claude"/"Cursor" no inicio da mensagem, ou automaticamente ao fechar a sprint com `/close-sprint`.

**Alvo — projeto corrente:** a URL/tela testada e sempre do **projeto onde a sessao esta rodando**
(`pixel-core` herda `route-runtime-assistant` §1). O Pixel Runtime so entra como **control plane** — o motor que
hospeda os gates dos auditores, nao necessariamente o produto auditado.

---

## Cerebro: Opus + GPT-5.6 — DUAL SEMPRE (default 2026-07-17)

**Mudanca de default:** ao contrario do `/runtime-assistant-monster` (onde single-Opus e o padrao e dual e
opt-in), `/pixel-monster` roda **dual por padrao** — os dois cerebros julgam/dirigem toda rodada,
salvo pedido explicito do project owner pra usar so um ("so opus", "so gpt56", "usa so um auditor").

| Auditor | Como e chamado | Gate proprio |
|---|---|---|
| Opus | `harry_opus_audit({ projectPath, objective })` (read-only, environment policy `--tools Read,Grep,Glob`, requiredRole owner). Fallback: `Agent` tool com override `"usa opus"`. | `.builder/opus-gate.json` (`infra/llm/opus-gate.ts`) — `calls_used < max_calls` |
| GPT-5.6 | `gpt56_audit({ projectPath, objective })` (fallback: `<GPT56_AUDIT_COMMAND>`; NUNCA `harry_shell`) | `.builder/gpt56-gate.json` (`infra/llm/gpt56-gate.ts`) — gate SEPARADO |

Checar os 2 gates pelo path absoluto do control plane (nunca relativo ao CWD da sessao):

```bash
cat <LOCAL_PROJECT_PATH> 2>/dev/null \
  || echo "GATE FABLE AUSENTE"
cat <LOCAL_PROJECT_PATH> 2>/dev/null \
  || echo "GATE GPT-5.6-SOL AUSENTE"
```

Gate `.json` valido nao e prova de que o modelo responde — antes de declarar qualquer auditor
ativo, rodar o preflight real (`<GPT56_PING_COMMAND>`; 400/erro = indisponivel).

### Modo dual (default — os 2 cerebros julgam a mesma rodada)

Ambos recebem exatamente as mesmas evidencias do Passo 2 do `pixel-core` (mesmos screenshots/DOM
refs/medicoes/fingerprint) — nunca rodadas de teste separadas. Cada um aplica a lente escolhida
(Comportamental/Visual/Criacao) independentemente, depois reconcilia (secao abaixo).

### Modo single (so quando project owner pedir explicitamente)

project owner diz "so opus", "so gpt56", "usa so um auditor nesta rodada" -> roda so o cerebro pedido,
sem reconciliacao (1 veredito). Declarar no output que foi single por pedido explicito, nao default.

### Fallback (um dos dois indisponivel) — cai pra single com aviso honesto, SO com quota genuina (project owner 2026-07-22)

**Gate com budget de sobra + chamada falhando = bug/instabilidade transitoria do CLI, NAO falta de quota.** Antes de declarar qualquer cerebro indisponivel:
1. Reconferir o gate (`calls_used < max_calls`? se sim, o budget existe).
2. Retry a chamada real (a tool `harry_opus_audit`/`gpt56_audit` inteira, nao so o preflight) pelo menos mais 1-2x.
3. So depois disso, se AINDA falhar:
   - **Gate confirma quota disponivel** (budget existe, so o CLI que falhou) -> reportar como instabilidade transitoria (nome do erro + quantas tentativas), cair pro cerebro que sobrou + declarar explicitamente que e degradacao, nao o modo dual default.
   - **Gate confirma quota genuinamente esgotada** (ausente ou `calls_used >= max_calls`) -> mesma degradacao, motivo = quota mesmo.
- **Nenhum dos dois disponivel** -> avisar project owner; se o teste ja rodou (evidencias coletadas), cair
  no protocolo `/runtime-assistant-claude` (harness local audita honestamente, sem persona Pixel-rian
  emprestada — declarar isso explicitamente).
- **Caveat conhecido (#961):** em servidor MCP long-lived, `gpt56_audit` pode retornar
  `capability_unavailable` mesmo com o modelo vivo. Confirmar com preflight `codex exec` antes de
  declarar indisponivel.

---

## Reconciliacao dos 2 vereditos (so no modo dual)

Identica ao `/runtime-assistant-monster` §"Reconciliacao":

- **Ambos concordam** (mesmo veredito no mesmo achado/severidade) -> veredito final = o veredito.
- **Divergem -> CONSENSO OBRIGATORIO (project owner 2026-07-22, regra chumbada).** O agente NUNCA escolhe
  um lado, NUNCA adjudica por conta propria (nem inspecionando a tela/DOM pra decidir quem tem razao
  — isso e priorizar um auditor), e NUNCA entrega a divergencia crua pro project owner decidir. Roda
  **rodadas de consenso**: leva o argumento completo (com evidencia: screenshot/DOM/heuristica) de um
  auditor pro outro reconsiderar, vai-e-volta, ate os DOIS convergirem no MESMO veredito. Cada um
  re-verifica a evidencia antes de manter/mudar. Um auditor que muda de veredito apos ver a evidencia
  do outro e o mecanismo funcionando. Escalar pro project owner SO se seguirem irredutiveis apos rodadas
  reais (empate genuino de gosto/julgamento, nao de fato) — reportando os 2 lados + o historico.
- **Um caiu no meio** (gate esgotou, quota, timeout DEPOIS de comecar) -> declarar que so o outro
  completou nesta rodada.

---

## Ponte de insights -> Pixel Runtime/Langfuse (PM-3 — implementada)

Reusa `infra/langfuse/ux-audit-finding.ts` (ver `pixel-core` Passo 5). Cada achado **aceito por
project owner** vira `recordLearningWithRecurrence({ error_category: 'UX_BIAS_<VIES>' })` +
`recordAcceptedUxAuditFinding(s)` (evento `ux_audit_finding` metadata-only). Usar o retorno real
(`eventsEmitted`/`total`) no relatorio — nunca assumir que tudo foi emitido.

---

## Output obrigatorio (a cada rodada de auditoria)

**Bloco "dual"** (os 2 cerebros julgaram — caso comum/default):

```
**Pixel-Monster (dual) — [lente] — [tela/feature]**

**Lente:** Comportamental | Visual | Criacao/Direcao
**Plano de teste:** [resumo do Passo 1]
**Evidencias:** [N screenshots + medicoes + fingerprint, modo visual|background]

**Gates:** Opus [OK calls_used X/Y] · GPT-5.6 [OK calls_used X/Y]

**Veredito Opus:**
- [achados no formato da lente — ver pixel-core]

**Veredito GPT-5.6:**
- [achados no formato da lente]

**Reconciliacao:** [concordam -> veredito unico | divergem -> rodadas de consenso ate convergir; escalar pro project owner so em empate irredutivel apos rodadas reais]

**Ponte de insights:** [N de N achados aceitos emitidos via recordAcceptedUxAuditFindings]

**Proximos passos:** [acao concreta ou pergunta pro project owner]
```

**Bloco "single"** (project owner pediu so 1 auditor, ou fallback por indisponibilidade):

```
**Pixel-Monster (single: Opus | GPT-5.6) — [lente] — [tela/feature]**

_Motivo: pedido explicito do project owner | GPT-5.6 indisponivel nesta rodada (nao e default)._

**Veredito [auditor]:**
- [achados no formato da lente]

**Ponte de insights:** [...]
**Proximos passos:** [...]
```

---

## Hard rules

- Dual e o DEFAULT — single so com pedido explicito do project owner ou fallback declarado honestamente.
- Nenhum auditor opera `browser_*` — quem opera e sempre o harness ativo (`pixel-core` Passo 2).
- Nenhum auditor escreve codigo em volume — so julga/dirige (persona/UX Spec/storybook-direcao).
- Passo 0 do `pixel-core` (lente + visual/background) e obrigatorio e repete a cada rodada.
- Achado sem fonte do Brain citavel = `[HYPOTHESIS]`, nunca `[CONFIRMED]`.
- Divergencia entre os 2 vereditos nunca e resolvida pelo agente (nem em silencio, nem adjudicando por conta propria) — consenso obrigatorio via rodadas cross-feed ate convergir (project owner 2026-07-22); escalar pro project owner so em empate irredutivel apos rodadas reais.
- Veredito e insumo para decisao, nunca aplica fix sozinho — fixes viram tasks normais (Nova).
- Escopo apenas projetos do project owner/environment policy (`route-runtime-assistant` §3).
- Nao confundir com `/pixel` (mesmo motor, cerebro = model router normal, 1 so).
