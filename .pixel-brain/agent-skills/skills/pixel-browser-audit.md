# Skill — Pixel Browser Audit

**Owner:** Pixel agent
**Critério project owner (2026-05-14 #7):** "Pixel conseguir auditar [UI], fazer pesquisa, benchmark... olhar telas, analisar imagem, navegar nas telas, fazer testes."

## Quando usar

Pixel ativa esta skill quando a task envolve:
- Validar mudança em página `apps/panel/`
- Auditar PR que toca `apps/panel/src/**`
- Smoke visual periódico (rotina semanal)
- Verificar contraste WCAG após mudança de design tokens
- Comparar tela atual vs design ref no Brain visual

## Stack disponível

Pixel Runtime já tem MCP browser tools (Playwright wrapper) — Pixel chama via:

```
browser_navigate(url)
browser_screenshot()
browser_get_text(selector?)
browser_snapshot()      // accessibility tree
browser_click(selector)
browser_fill(selector, value)
browser_eval(js)
browser_save_session()  // cookies/localStorage
```

Tools listadas no runtime assistant MCP server. Pixel chama na sequência abaixo.

## Pipeline canonical (6 fases)

```
NAVIGATE → CAPTURE → ANALYZE → AUDIT → REPORT → COMPARE
```

### 1. NAVIGATE
- `browser_navigate(targetUrl)`
- Espera `domcontentloaded` (default Playwright)
- Se rota autenticada: `browser_open_visible(loginUrl)` + `browser_save_session()` na primeira corrida (sessão re-uso depois)

### 2. CAPTURE
- `browser_screenshot()` em **3 viewports**: 1440×900 (desktop), 768×1024 (tablet), 375×812 (mobile)
- `browser_snapshot()` → accessibility tree (ARIA roles, names, descrições)
- `browser_get_text('main')` → text content pra grep de copy

### 3. ANALYZE (LLM-vision)
Para cada screenshot, prompt ao LLM (claude-opus-4-7 ou gemini-flash-2):

```
Audite esta screenshot como Pixel agent. Reporte:
1. Hierarquia visual (heading levels, primary CTA óbvio?)
2. Contraste cor (texto cinza claro em fundo claro?)
3. Density (Hick's law — muitos elementos competindo por atenção?)
4. Mobile-friendly (tap targets ≥44px, scroll lock issues, viewport responsive?)
5. Loading/empty states visíveis ou ausentes?
6. Erros de copy (texto cortado, lorem ipsum, traduzido errado)
7. Brand consistency (cores fora do token system?)

Output: JSON estruturado com {issue, severity: critical|high|medium|low, suggestion}.
```

### 4. AUDIT (WCAG 2.1 AA)
Sobre o `snapshot()` accessibility tree:
- Heading hierarchy (não pular níveis H2→H4)
- Buttons sem `name` acessível
- Imagens sem `alt`
- Form inputs sem `<label>`
- Cor não usada como única indicação de status (semantic + emoji)
- Tab order razoável (snapshot sequence vs visual layout)
- Contraste programático: `browser_eval('getComputedStyle(el).color')` por elemento textual chave

### 5. REPORT
Markdown estruturado, salvo em `docs/ux/pixel-audit-<sha-curto>.md`:

```markdown
# Pixel Audit — <route> — <YYYY-MM-DD>

**Severity geral:** Critical | Warning | OK
**Tela:** ![screenshot](.builder/visual-runs/<run-id>/desktop.png)

## Findings

### 🔴 Critical
- [WCAG 1.4.3] Contraste 2.1:1 em `<button.primary>` (precisa ≥4.5:1)

### 🟡 Warning
- [Nielsen #2 Match between system and real world] Botão "Submit" em UI PT-BR

### 📊 Métricas
- Tap targets <44px: 3 (botões `.toolbar-icon`)
- Headings: H1 ausente; H2 × 3; H3 × 7 (OK)
- Imagens sem alt: 2

## Suggestion
Concentrar correção em contraste primeiro. Tap targets em segundo passo.
```

### 6. COMPARE (opcional, se Brain visual tem ref)
- `browser_screenshot()` atual
- `browser_eval()` lê design tokens (`getComputedStyle(document.body).getPropertyValue('--color-primary')`)
- Compara com ref armazenado em `pixel-runtime-brain/visual/<slug>/full.png`
- Reporta diferenças tipográficas, espaciais, de cor

## Output canonical

Pixel grava report em **3 lugares**:
1. `docs/ux/pixel-audit-<sha>.md` (canonical, committed se project owner aprovar)
2. `.builder/visual-runs/<run-id>/` (screenshots + JSON findings — TTL 7 dias via builder-cleanup #124)
3. PR comment se rodando dentro de PR (Auto-PR Queue tag `pixel-audit`)

## Skill check (CI)

Quando rodando dentro de PR que tocou `apps/panel/`:
- Pixel skill **OBRIGATÓRIA** antes do merge (gate)
- Severity `critical` bloqueia (Auto-PR Queue não mergea)
- Severity `warning` permite merge mas comenta no PR

## Anti-patterns

❌ Audit puro de console output sem screenshot — não é browser audit
❌ Reportar todos os 138 nielsen items sem priorizar — fadiga = ignore
❌ Comparar tela atual com Figma se Figma não foi atualizado pós-deploy
❌ Falsos positivos de contraste em dark mode quando dark mode não existe

## Trigger (futuro automation)

- PR open + diff toca `apps/panel/**.tsx` → auto-rodar via webhook
- Cron weekly 2026-XX (sprint pendente) → audit semanal das rotas principais
- Manual via CLI: `runtime-assistant pixel-audit --url <route>` (próximo PR após este)

## Taste memory por projeto (F3c, Issue #808, 2026-07-08)

O fingerprint de design (`design-fingerprint.ts`, F3/F3b) e a analise LLM-vision
(`pixel-audit.service.ts`, F1) rodam a cada audit mas nao persistiam por conta
propria — cada run comecava do zero. `runtime-assistant pixel-taste-profile` fecha esse
gap: extrai o fingerprint real de um projeto (tokens de cor, escala de
espacamento/tipografia, grid) + deteca Storybook (presenca/contagem — MVP,
sem parse de props/variants) e persiste em
`docs/memory/project/<slug>/design-system/<slug>.md`. Runs futuros de
`runtime-assistant pixel-audit --url <mesma-url> --slug <mesmo-slug>` passam a citar essa
memoria especificamente pelo slug do projeto auditado, nao pelo slug do
proprio Pixel Runtime (gap real corrigido em `loadAgentContextAsync`).

```
runtime-assistant pixel-taste-profile --url <https://...> --slug <projeto> [--path <checkout-local>] [--session <name>]
```

Rodar de novo com o mesmo `--slug` faz refresh (sobrescreve, nao acumula
duplicata) — util quando o design system do projeto evolui.

---

*Skill canonical Pixel. Última revisão: 2026-07-08 (F3c, taste memory por projeto).*
