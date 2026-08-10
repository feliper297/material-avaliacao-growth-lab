---
name: pixel-monster
description: Pixel com cerebro superior — mesmo motor de 3 lentes do pixel-core, julgado por dois modelos Claude em dupla (Opus + Sonnet 5, via Agent tool com model override), com reconciliacao. GPT-5.6 nao esta disponivel neste ambiente (Claude Code so acessa modelos Claude), entao o segundo auditor e Sonnet 5 em vez de GPT-5.6.
trigger: /pixel-monster
trigger_keywords: ["pixel-monster", "pixel monster", "auditoria ux dupla", "pixel-rian", "dois auditores ux", "pixel dupla auditoria"]
---

# Skill: /pixel-monster — Motor Pixel com dois auditores (Opus + Sonnet 5)

**Leia `.claude/skills/pixel-core/SKILL.md` primeiro.** Este arquivo só define o **cérebro** do
Passo 4 — as 3 lentes, Passo 0 (lente + visual/background), Passo 1 (planejar), Passo 2 (ver) e
Passo 3 (ler brain) são idênticos ao `/pixel` normal e vivem só em `pixel-core`.

**Diferença única vs `/pixel`:** o cérebro que julga/dirige é **Opus + Sonnet 5 em dupla**, com
reconciliação de veredito.

**Nota sobre GPT-5.6:** o pacote original pede Opus + GPT-5.6. Neste ambiente (Claude Code) só há
acesso a modelos Claude (Opus 5, Sonnet 5, Haiku 4.5, Fable 5) — não há integração com OpenAI/GPT.
Por decisão do usuário na instalação (2026-08-09), o segundo auditor é **Sonnet 5** em vez de
GPT-5.6. Se no futuro houver acesso real a GPT-5.6 (ex.: via alguma integração externa), pergunte
antes de trocar — não assuma que passou a existir.

---

## Cérebro: Opus + Sonnet 5 — dual por padrão

Os dois auditores rodam via `Agent` tool, cada um em uma chamada separada com `model` diferente
(`"opus"` e `"sonnet"`), **em paralelo** (duas chamadas Agent no mesmo turno). Como cada subagente
não vê esta conversa, o prompt de cada chamada precisa ser autocontido:

- a lente escolhida e a pergunta/objetivo da rodada;
- o plano do Passo 1 e as evidências do Passo 2 (screenshot(s)/caminho da imagem, medições, ou
  trecho de código quando não há tela viva) coladas no prompt ou como caminho de arquivo para o
  subagente ler;
- instrução explícita para ler os arquivos-alvo da lente em `.pixel-brain/` (tabela em
  `pixel-core`) e citar `[[caminho]] — "trecho"` em cada achado;
- o formato de achado exigido (ver `pixel-core` §Persona Pixel-rian para a lente Comportamental, ou
  a rubrica /90 para Visual);
- lembrete: o subagente audita/dirige, não implementa fix.

Use `subagent_type: "general-purpose"` com `model: "opus"` numa chamada e `model: "sonnet"` na
outra. Rode as duas em uma única mensagem (chamadas paralelas) para não serializar o tempo de
espera.

### Modo dual (default)

Os dois recebem exatamente as mesmas evidências do Passo 2 — nunca rodadas de teste separadas. Cada
um aplica a lente escolhida independentemente, depois reconcilia (seção abaixo).

### Modo single (só quando pedido explicitamente)

Se o usuário disser "só Opus", "só Sonnet", "usa só um auditor nesta rodada" → rodar só o cérebro
pedido, sem reconciliação (1 veredito). Declarar no output que foi single por pedido explícito.

### Se um dos dois falhar

Se uma das duas chamadas `Agent` retornar erro (ex.: modelo indisponível na conta), não simular a
resposta que faltou. Reportar qual auditor completou, qual falhou e o motivo (erro real, não
suposição), e perguntar se o usuário quer prosseguir em modo single com o que sobrou ou tentar de
novo.

---

## Reconciliação dos 2 vereditos (só no modo dual)

- **Ambos concordam** (mesmo veredito no mesmo achado/severidade) → veredito final = o veredito.
- **Divergem** → não escolha um lado sozinho. Mostre os dois vereditos lado a lado com a evidência
  de cada um. Se a divergência for objetiva (ex.: um auditor cita uma fonte do brain que o outro
  ignorou), você pode apontar isso, mas a decisão de qual prevalece — quando é questão de gosto/
  julgamento, não de fato — é do usuário. Reporte os dois lados e pergunte, em vez de arbitrar.
- **Um caiu no meio** (erro depois de começar) → declarar que só o outro completou nesta rodada.

---

## Output obrigatório

**Bloco "dual"** (caso comum/default):

```
**Pixel-Monster (dual: Opus + Sonnet 5) — [lente] — [tela/feature]**

**Lente:** Comportamental | Visual | Criação/Direção
**Plano de teste:** [resumo do Passo 1]
**Evidências:** [screenshot(s) + medições, ou "sem tela viva", modo visual|background]

**Veredito Opus:**
- [achados no formato da lente — ver pixel-core]

**Veredito Sonnet 5:**
- [achados no formato da lente]

**Reconciliação:** [concordam → veredito único | divergem → os dois lados reportados, decisão do usuário]

**Próximos passos:** [ação concreta ou pergunta]
```

**Bloco "single"** (pedido explícito, ou fallback por indisponibilidade):

```
**Pixel-Monster (single: Opus | Sonnet 5) — [lente] — [tela/feature]**

_Motivo: pedido explícito do usuário | [modelo] indisponível nesta rodada (erro real: <mensagem>)._

**Veredito [auditor]:**
- [achados no formato da lente]

**Próximos passos:** [...]
```

---

## Hard rules

- Dual é o default — single só com pedido explícito ou falha real declarada (nunca simulada).
- Nenhum auditor opera browser/Playwright — quem opera é sempre a sessão ativa (`pixel-core` Passo 2),
  antes de invocar os dois `Agent`.
- Nenhum auditor escreve código de produto em volume — só julga/dirige.
- Passo 0 do `pixel-core` (lente + visual/background) é obrigatório e repete a cada rodada.
- Achado sem fonte do brain citável = `[HYPOTHESIS]`, nunca `[CONFIRMED]`.
- Divergência entre os 2 vereditos nunca é resolvida sozinho quando é questão de gosto/julgamento —
  reportar os dois lados e perguntar.
- Veredito é insumo para decisão, nunca aplica fix sozinho.
- Não confundir com `/pixel` (mesmo motor, 1 cérebro só, sem dual).
