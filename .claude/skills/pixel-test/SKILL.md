---
name: pixel-test
description: Teste real no browser (Playwright) como usuario real — Pixel planeja, a sessao ativa opera o browser via script Playwright, Pixel audita. Pergunta visual/background antes de comecar. Reusada como Passo 1 (planejar) + Passo 2 (ver) do motor pixel-core.
trigger: /pixel-test
trigger_keywords: ["pixel-test", "testar browser", "teste real", "testar como usuario", "pixel testa", "teste browser"]
---

# Skill: /pixel-test — Teste real no browser (Playwright)

**Regra:** Pixel define o plano. A sessão ativa opera o browser rodando
`app/scripts/pixel-screenshot.mjs` via `Bash`. Pixel audita o resultado. SEMPRE perguntar
visual ou background antes de começar.

**Relação com `/pixel` e `/pixel-monster`:** os Steps 0-3 daqui são o Passo 1 (planejar) e Passo 2
(ver) do motor `.claude/skills/pixel-core/SKILL.md`. Quando chamada via `/pixel`/`/pixel-monster`,
o Step 4 (auditoria) daqui é substituído pelo motor completo de 3 lentes — `/pixel-test` isolado
continua válido como teste rápido com Nielsen 10 + WCAG 2.1 AA + carga cognitiva simples.

---

## Pré-requisito: Playwright instalado

Este projeto instala Playwright como devDependency de `app/` (`@playwright/test`) e o Chromium via
`npx playwright install chromium`. Se `node app/scripts/pixel-screenshot.mjs` falhar com erro de
browser não encontrado, rode `cd app && npx playwright install chromium` antes de continuar.

O app precisa estar rodando (`npm run dev` na raiz, ou `cd app && npm run dev`) para haver uma URL
para testar — normalmente `http://localhost:5173` (ou a próxima porta livre, o Vite avisa qual).

---

## Step 0 — Perguntar modo (obrigatório, sem exceção)

```
"Quer ver o teste ao vivo (screenshots compartilhados aqui no chat conforme rodam,
 com o browser abrindo visível na sua tela)
 ou prefere que eu rode em background (browser headless) e entrego o relatório no final?"
```

Aguardar resposta antes de qualquer outra ação. Visual = `--headed` no script (janela do Chromium
abre de verdade na tela do usuário) + você compartilha cada screenshot assim que é gerado. Background
= sem `--headed` (headless) + relatório entregue ao final.

---

## Step 1 — Coletar contexto (se não fornecido)

Perguntar:
- Qual URL testar? (ex.: `http://localhost:5173/#week-2`)
- Qual fluxo testar? (ex.: "abrir a semana 2 e ver o card de evidências")
- Há login necessário? (pedir credenciais de teste, nunca reais)
- O que deve funcionar ao final?

---

## Step 2 — Plano de teste

```markdown
## Plano de Teste Pixel — <feature/página>

### Escopo
O que está sendo testado e por quê (como usuário real, não como dev)

### Fluxo (passos como usuário)
1. Navegar para <URL>
2. Observar <elemento/estado>
3. ...

### Critérios de aceitação (perspectiva usuário)
- [ ] Consegui entender o que a tela mostra sem confusão
- [ ] Contraste e tamanho de alvo de toque dentro do esperado
- [ ] Layout funciona em 1280x800 (viewport padrão do script)

### Fora do escopo
O que não vamos testar aqui
```

---

## Step 3 — Executar

```bash
# Background (headless):
cd app && node scripts/pixel-screenshot.mjs "http://localhost:5173/#week-2" ../.pixel-brain/runs

# Visual (janela do Chromium abre na tela do usuário):
cd app && node scripts/pixel-screenshot.mjs "http://localhost:5173/#week-2" ../.pixel-brain/runs --headed
```

O script imprime um JSON com `screenshotPath`, `title`, `smallTargets` (alvos de toque < 44px) e
`lowContrast` (pares texto/fundo com contraste < 4.5:1). Ler o PNG gerado com `Read` para ver a
tela de verdade antes de comentar sobre ela — nunca comentar hierarquia/estética sem ter aberto a
imagem.

Em modo visual, narrar cada passo conforme roda ("carregou, título é X", "vejo Y no header").

---

## Step 4 — Relatório Pixel (obrigatório)

**Vocabulário de status (6 estados)** — distingue "ambiente quebrou o teste" de "feature quebrada",
e "passou limpo" de "passou só na segunda tentativa":

| Status | Quando usar |
|---|---|
| `PASS` | Passou limpo, sem ressalva, sem retry. |
| `PARTIAL_PLUS` | Passou no essencial, achou algo menor (não bloqueia). |
| `PARTIAL` | Funcionou parcialmente — lacuna real, mas não é blocker total. |
| `FAIL` | Feature quebrada — o fluxo não funciona como deveria. |
| `BLOCKED` | Ambiente impediu o teste (dev server fora do ar, URL não resolve, login indisponível) — não é veredito sobre a feature. |
| `FLAKY` | Falhou na 1ª tentativa e passou no retry — sinal de instabilidade. |

```markdown
## Relatório Pixel — <feature> — <data>

### Resumo executivo
Status: PASS / PARTIAL_PLUS / PARTIAL / FAIL / BLOCKED / FLAKY

### Evidências
- Screenshot: <caminho do PNG>
- Alvos de toque < 44px: <N encontrados, listar até 5>
- Contraste < 4.5:1: <N encontrados, listar até 5>

### Achados (Nielsen 10 + WCAG 2.1 AA + carga cognitiva)
- <achado> — fonte: [[.pixel-brain/agent-skills/methodologies/14-nielsen-heuristics.md]] — severidade

### Próximos passos
1. <ação concreta>
```

---

## Hard rules

- SEMPRE perguntar visual/background primeiro.
- Nunca comentar uma tela sem ter lido o screenshot gerado (`Read` no PNG).
- Nunca testar contra produção real com dados de usuários reais sem autorização explícita.
- Resumo executivo sempre usa os 6 estados — nunca reduzir a um binário aprovado/reprovado.
- Se `npx playwright install chromium` nunca rodou neste ambiente, o Step 3 vai falhar — rode a
  instalação antes de tentar de novo, não finja que o teste passou.
