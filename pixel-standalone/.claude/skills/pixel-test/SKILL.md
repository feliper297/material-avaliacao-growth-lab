---
name: pixel-test
description: Teste real no browser como usuario real — Pixel planeja, o harness ativo opera browser_*, Pixel audita. Pergunta visual/background antes de comecar. Reusada como Passo 1 (planejar) + Passo 2 (ver) do motor .claude/skills/pixel-core/SKILL.md (/pixel, /pixel-monster). Compartilhada entre Claude Code e Cursor (symlink).
trigger: /pixel-test
trigger_keywords: ["pixel-test", "testar browser", "teste real", "testar como usuario", "pixel testa", "teste browser"]
---

# Skill: /pixel-test — Teste Real no Browser

**Regra:** Pixel define o plano. O harness ativo (Claude/Cursor, etc — via `browser_*`) opera o browser. Pixel audita os resultados.
SEMPRE perguntar visual ou background antes de comecar.

**Relacao com `/pixel` e `/pixel-monster`:** os Steps 1/1.5/2 (plano) e 3 (operar) desta skill sao
o Passo 1 (PLANEJAR) e Passo 2 (VER) do motor `.claude/skills/pixel-core/SKILL.md`, reusados sem
modificacao. Quando chamada via `/pixel`/`/pixel-monster`, o Step 4 (auditoria) deste arquivo e
substituido pelo motor completo de 3 lentes (Comportamental/Visual/Criacao-Direcao) + RAG por lente
— este `/pixel-test` isolado continua valido como teste rapido com auditoria Nielsen 10 + WCAG 2.1
AA + cognitive load simples (sem escolher lente, sem RAG por query dedicada).

---

## Step 0 — Perguntar modo (obrigatorio, sem excecao)

```
"Quer ver o teste ao vivo (screenshots em tempo real no chat)
 ou prefere que eu rode em background e entrego o relatorio no final?"
```

Aguardar resposta antes de qualquer outra acao.

---

## Step 1 — Coletar contexto (se nao fornecido)

Perguntar project owner:
- Qual URL testar?
- Qual fluxo testar? (ex: "fluxo de cadastro", "fazer uma compra", "agendar servico")
- Ha login necessario? (pedir credenciais de teste se sim)
- O que deve funcionar ao final?

---

## Step 1.5 — Doc-grounding (OBRIGATORIO antes do plano)

Carregue o doc canonical da feature e cite um trecho ANTES de montar o plano:

    pnpm tsx scripts/load-docs.ts --feature <slug>

Leia PRD + jornada + ISO; cite cada um (caminho — trecho). Sem PRD, registre "sem doc
canonical" e siga. Regra: docs/methodology/iso-doc-grounding.md (HRN-45).

---

## Step 2 — Plano de teste (Pixel define)

```markdown
## Plano de Teste Pixel — <feature/pagina>

### Escopo
O que esta sendo testado e por que (como usuario real, nao como dev)

### Persona do usuario
"Sou project owner, acesso pela primeira vez, quero agendar um servico..."

### Fluxo (passos como usuario)
1. Navegar para <URL>
2. Clicar em <elemento>
3. Preencher <campo> com <valor>
4. ...

### Criterios de aceitacao (perspectiva usuario)
- [ ] Consegui completar o objetivo sem confusao
- [ ] Mensagens de erro foram claras
- [ ] Tempo de resposta foi aceitavel (< 3s)
- [ ] Mobile funcionou (375px)

### Fora do escopo
O que nao vamos testar aqui
```

---

## Step 3 — Executar (harness ativo opera browser)

```
Modo Visual:
  browser_open_visible = true
  Cada acao → screenshot compartilhado no chat
  Pixel comenta ao vivo: "H1 — visibilidade: OK", "H3 — inconsistencia aqui"

Modo Background:
  Execucao silenciosa
  Capturar screenshots em pontos criticos
  Entregar relatorio ao final
```

Se precisar de login → pedir credenciais de teste para project owner e continuar.

---

## Step 4 — Relatorio Pixel (obrigatorio)

**Vocabulario de status (6 estados)** — distingue "ambiente quebrou o teste" de "feature quebrada",
e "passou limpo" de "passou só na segunda tentativa". Adotado 18/07 a partir de uma auditoria de
documentacao externa (achado real: o 3-estados anterior nao distinguia essas duas coisas):

| Status | Quando usar |
|---|---|
| `PASS` | Passou limpo, sem ressalva, sem retry. |
| `PARTIAL_PLUS` | Passou no essencial, achou algo menor (nao bloqueia ship). |
| `PARTIAL` | Funcionou parcialmente — lacuna real, mas nao é blocker total. |
| `FAIL` | Feature quebrada — o fluxo nao funciona como deveria. |
| `BLOCKED` | Ambiente impediu o teste (login indisponivel, servico fora do ar, dado de teste faltando) — nao é veredito sobre a feature. |
| `FLAKY` | Falhou na 1a tentativa e passou no retry — sinal de instabilidade, mesmo que o resultado final seja verde. |

```markdown
## Relatorio Pixel — <feature> — <data>

### Resumo executivo
Status: PASS / PARTIAL_PLUS / PARTIAL / FAIL / BLOCKED / FLAKY

### Evidencias por passo
| Passo       | Screenshot | Status | Observacao          |
|-------------|-----------|--------|---------------------|
| 1. Acesso   | [img]     | OK     | load 1.2s           |
| 2. Login    | [img]     | OK     | feedback claro      |
| 3. Formulario | [img]   | FAIL   | CTA sem contraste   |

### Bugs encontrados
- [P1] <descricao> → /bug vai criar a Issue automaticamente

### Recomendacoes UX (Pixel)
- H1: ...
- WCAG: ...

### Proximos passos
1. <acao concreta>
```

---

## Hard rules

- SEMPRE perguntar visual/background primeiro
- Pixel audita usando Nielsen 10 + WCAG 2.1 AA + cognitive load em CADA screenshot
- Bugs encontrados → /bug e chamado automaticamente para criar Issues
- Nunca testar em producao real com dados de usuarios reais sem autorizacao de project owner
- Resumo executivo do Step 4 usa sempre os 6 estados (PASS/PARTIAL_PLUS/PARTIAL/FAIL/BLOCKED/FLAKY)
  — nunca reduzir de volta pra um binario aprovado/reprovado, senão "ambiente quebrou" e "feature
  quebrada" viram indistinguiveis de novo
