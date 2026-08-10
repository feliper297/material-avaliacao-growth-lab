# Pixel Taste Profile — Pixel Runtime Panel

> Este documento define o padrão de gosto visual do Pixel Runtime Panel. É a referência de decisão quando há dúvida: "isso está certo para o Pixel Runtime?"

---

## Identidade Visual

O Pixel Runtime Panel usa uma estética **retro-terminal controlada**: serifado (Georgia), bege quente, bordas finas, monoespaçado para dados. Essa identidade é uma decisão deliberada — o Pixel Runtime é uma ferramenta de engenharia sênior, não um SaaS genérico.

**O que isso significa na prática:**
- Bege e tons quentes são bem-vindos. Não trocar por branco frio ou azul corporativo.
- Serif é aceitável para títulos. Nunca para código ou dados.
- Bordas finas (`border-border`) são parte do vocabulário. Não remover — apenas usar com intenção.
- Monoespaço (`font-mono`) para: paths, IDs, scores numéricos, status técnicos.

---

## O que nunca pode acontecer

| Problema | Por que é bloqueante |
|---------|---------------------|
| Cards com 0 runs parecendo idênticos a cards com 100+ runs | Confunde estado vivo com estado nulo — usuário não sabe onde focar |
| Live Activity mostrando erros repetitivos sem agrupamento | Noise que parece falha crítica quando é um loop esperado |
| Botões de ação primária com `text-2xs` e `px-2 py-1` | Não há affordance — usuário não clica onde deveria |
| Badges decorativos sem hierarquia (5 badges de mesmo peso) | Usuário ignora todos os badges |
| Seções de igual peso empilhadas sem demarcação visual | Página parece scrollar infinitamente sem ponto de entrada |
| Copy misturando PT-BR e inglês no mesmo bloco | Sinal de produto não-terminado. Corrói confiança. |
| Empty state = emoji + frase curta | Não orienta — usuário fica parado |

---

## O que deve existir em toda tela

1. **Um ponto de entrada claro** — a ação ou informação mais importante deve estar visível sem scroll
2. **Hierarquia de peso** — pelo menos 3 níveis: primário, secundário, tertiary/meta
3. **Estado vazio orientado** — empty state deve dizer O QUE FAZER, não apenas "não há dados"
4. **Ação primária acessível** — CTA de pelo menos `px-3 py-1.5 text-xs` com contraste de borda
5. **Labels em PT-BR** como padrão — inglês apenas para termos técnicos sem tradução (model router, model, run)

---

## Exemplos: Ruim vs Bom

### Card de agente com 0 runs

**Ruim:**
```
┌──────────────────────────────┐
│ Pixel                  HIGH  │
│ Product Experience Architect │
│                              │
│ runs     last seen           │
│ 0        never               │
│ ▓░░░░░░░░░░░░░░░░░░░░░░ 0%  │
└──────────────────────────────┘
```
Parece quebrado. O usuário não sabe se o agente existe ou se nunca foi usado.

**Bom:**
```
┌──────────────────────────────┐
│ Pixel                  HIGH  │
│ Product Experience Architect │
│                         ✦ UX │
│ ────────────────────────────  │
│ Ainda não executado           │
│ Clique para ver invoke-preview│
└──────────────────────────────┘
```
Estado nulo é explícito. CTA orienta o próximo passo.

---

### Botão de ação primária

**Ruim:**
```html
<button class="px-2 py-1 text-2xs border border-border">Run rápido</button>
<button class="px-2 py-1 text-2xs border border-brand-claude/40">Run deep</button>
```
Tamanho de texto e padding sub-mínimo. Border fraca. Não parece clicável.

**Bom:**
```html
<button class="px-3 py-1.5 text-xs font-semibold border border-border-strong bg-bg-raise">
  Auditoria rápida
</button>
<button class="px-3 py-1.5 text-xs font-semibold border border-brand-claude bg-brand-claude/10 text-text-primary">
  Auditoria profunda
</button>
```
Hierarquia clara. Ação primária se destaca. Padding adequado para toque.

---

### Empty state de chat

**Ruim:**
```
🎩
Fala, parceiro!
Selecione um projeto acima e manda uma mensagem.
```
Emoji + frase vaga. Não orienta o que dizer.

**Bom:**
```
🎩 Pixel Runtime pronto para o projeto "UNA Auto"

Sugestões para começar:
→ "O que está na fila do Pixel Runtime agora?"
→ "Qual o score atual de segurança?"
→ "Tem algum bug crítico aberto?"
→ "Como está a cobertura de testes?"
```
Sugestões contextual ativam o usuário imediatamente.

---

### Live Activity com erros repetitivos

**Ruim:**
```
[ERRO] rate limit: provider claude exhausted at 14:32:01
[ERRO] rate limit: provider claude exhausted at 14:32:03
[ERRO] rate limit: provider claude exhausted at 14:32:05
[ERRO] rate limit: provider claude exhausted at 14:32:07
```
O usuário acha que o sistema está quebrado.

**Bom:**
```
[WARN] provider claude · rate limit (×4 em 10s) — continuando com fallback groq
```
Agrupado, contextualizado, não-alarmante.

---

### Seções de model router com mesmo peso

**Ruim:**
model router mode → Adaptive status → Preset selector → Reviewer Routes → Task Routes → model router Config → Stats → Changelog → Footer

Todas com o mesmo `gap-4`, mesma `border-border`, mesmo `bg-bg-card`. Scroll infinito.

**Bom:**
- Seções de configuração ativa (mode, preset, model router tiers) em destaque
- Seções informativas (task routes, changelog) colapsadas por padrão
- Seções avançadas (stats, reviewer routes) atrás de accordion
- Separadores visuais entre grupos funcionais

---

## Tokens a usar vs evitar

### Usar com intenção
- `border-brand-claude` — ação primária, selected state
- `border-state-danger` — destructive, stop, crítico
- `bg-bg-raise` — hover state, seleção
- `text-text-primary` — conteúdo principal
- `font-mono` — dados numéricos, paths, IDs

### Evitar como padrão
- `border-border` em todo elemento → cria ruído uniforme
- `text-3xs` para ações → inacessível e invisível
- `px-1.5 py-0.5` em botões de ação → tátil mínimo é `px-3 py-1.5`
- Múltiplos badges de mesmo peso num card → máximo 2 badges por card

---

## Checklist de decisão de design

Antes de commitar uma tela nova ou revisada, responder:

- [ ] Qual é a ação primária desta tela? Ela está visível sem scroll?
- [ ] O que um usuário novo faz quando a tela está vazia?
- [ ] Elementos com 0 dados comunicam "nunca usado" vs "erro"?
- [ ] Copy está em PT-BR? Termos em inglês têm justificativa técnica?
- [ ] Botões de ação têm pelo menos `px-3 py-1.5`?
- [ ] Há mais de 2 badges de mesmo peso num card? Se sim, eliminar ou hierarquizar.
- [ ] Contraste de `text-text-ghost` está acima de 3:1 no fundo usado?
