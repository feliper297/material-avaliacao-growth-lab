# Pixel Visual Review Rubric — v1.0

> Escala de 0 a 5. Cada critério inclui o que caracteriza cada ponto da escala e um exemplo aplicado ao Pixel Runtime Panel.

---

## Escala de Severidade

| Nível | Nome | Definição |
|-------|------|-----------|
| **P0** | Critical UX | Impede uso, quebra fluxo, ação destrutiva sem confirmação, acessibilidade bloqueante (sem label, sem contraste mínimo 3:1) |
| **P1** | Major UX | Tela confusa, hierarquia ruim, ação principal não óbvia, layout quebrado em mobile, usuário perde contexto |
| **P2** | Polish | Espaçamento inconsistente, copy ambíguo, alinhamento leve, badges redundantes |
| **P3** | Nice-to-have | Melhorias futuras, micro-animações, personalização |

---

## Critérios

### 1. Visual Hierarchy (Hierarquia Visual)

| Nota | Descrição |
|------|-----------|
| 0 | Todos os elementos têm o mesmo peso. Impossível identificar o que é primário. |
| 1 | Há títulos, mas tamanhos e cores competem. Difícil saber por onde começar. |
| 2 | Hierarquia existe mas é inconsistente — alguns cards mais pesados do que deveriam. |
| 3 | Hierarquia clara na maioria das seções. Alguns elementos fora de lugar. |
| 4 | Hierarquia bem definida. Primary action ou informação mais importante se destaca com facilidade. |
| 5 | Escaneamento instantâneo. Olho vai direto para o que importa em cada contexto. |

**Pixel Runtime hoje:** 2/5 — Cards de projeto e cards de agente têm o mesmo peso visual independente do status. "0 runs" parece igual a "103 runs".

---

### 2. Layout Clarity (Clareza de Layout)

| Nota | Descrição |
|------|-----------|
| 0 | Elementos sobrepostos, layout quebrado. |
| 1 | Layout funciona mas é denso demais ou esparso demais. |
| 2 | Layout compreensível mas sem ritmo. Seções não demarcadas. |
| 3 | Layout organizado com seções claras. Alguns gaps ou sobreposições. |
| 4 | Cada região tem uma função clara. Usuário sabe onde estão as ações. |
| 5 | Layout autoexplicativo. Zero ambiguidade sobre regiões funcionais. |

**Pixel Runtime hoje:** 3/5 — Seções existem (header, grid, launcher), mas a página de model router empilha muitas seções de peso similar.

---

### 3. Alignment (Alinhamento)

| Nota | Descrição |
|------|-----------|
| 0 | Elementos desalinhados visivelmente. |
| 1 | Alinhamento inconsistente dentro do mesmo componente. |
| 2 | Maioria alinhada, mas bordas e textos às vezes não batem. |
| 3 | Alinhamento consistente. Pequenas inconsistências em edge cases. |
| 4 | Grid e baseline alinhados. Apenas pixels em casos específicos. |
| 5 | Pixel-perfect. Cada elemento respeita o grid visual. |

**Pixel Runtime hoje:** 3/5 — Alinhamento sólido no geral, mas algumas rows de badges com diferentes heights causam inconsistências.

---

### 4. Spacing Rhythm (Ritmo de Espaçamento)

| Nota | Descrição |
|------|-----------|
| 0 | Sem espaçamento consistente. Elementos colados ou espaçados ao acaso. |
| 1 | Espaçamento existe mas parece acidental. |
| 2 | Espaçamento dentro dos cards é consistente, mas entre seções não. |
| 3 | Ritmo geral existe. Algumas seções usam `gap-4` onde deveriam usar `gap-2`. |
| 4 | Espaçamento segue sistema claro. `gap-2` para items, `gap-4` para seções. |
| 5 | Ritmo perfeito. Cada distância comunica o nível de relação entre elementos. |

**Pixel Runtime hoje:** 3/5 — `gap-4` entre todas as seções é uniforme demais. PresetSelector na ModelRouterPage ocupa altura excessiva.

---

### 5. Information Density (Densidade de Informação)

| Nota | Descrição |
|------|-----------|
| 0 | Densidade extrema — impossível absorver. Ou vazia — sem informação útil. |
| 1 | Muito densa ou muito esparsa. Não calibrada para o usuário. |
| 2 | Densidade geral ok mas seções específicas ultrapassam o limite. |
| 3 | A maioria das seções é legível. Alguns blocos precisam de simplificação. |
| 4 | Informação prioritizada. Dados avançados escondidos atrás de `<details>`. |
| 5 | Densidade ótima. Cada elemento tem razão de estar visível por padrão. |

**Pixel Runtime hoje:** 2/5 — Live Activity expõe erros repetitivos sem agrupamento. AuditFeed mostra muita linha de output sem filtragem.

---

### 6. Contrast (Contraste)

| Nota | Descrição |
|------|-----------|
| 0 | Texto inlegível. Contraste abaixo de 2:1. |
| 1 | Texto legível apenas em condições ideais. Contraste 2-3:1. |
| 2 | Texto principal legível, mas `text-text-muted` e `text-text-ghost` difíceis em telas brilhantes. |
| 3 | Contraste WCAG AA para texto principal. Elementos secundários borderline. |
| 4 | WCAG AA em todo texto de ação. Texto decorativo pode ser mais suave. |
| 5 | WCAG AA completo. Nenhum texto abaixo de 4.5:1. |

**Pixel Runtime hoje:** 3/5 — `text-3xs text-text-ghost` em fundos bege frequentemente cai abaixo de 3:1. Labels de seção uppercase em `text-text-tertiary` precisam de revisão.

---

### 7. Typography (Tipografia)

| Nota | Descrição |
|------|-----------|
| 0 | Múltiplas fontes sem critério. Tamanhos erráticos. |
| 1 | Fonte única mas tamanhos inconsistentes. |
| 2 | Sistema de tamanhos existe mas nem sempre respeitado. |
| 3 | Hierarquia tipográfica clara: `text-sm` para títulos, `text-2xs` para corpo, `text-3xs` para meta. |
| 4 | Tipografia consistente e intencional. Peso (semibold/bold) usado para hierarquia. |
| 5 | Tipografia como design system. Cada combinação de tamanho+peso+cor tem um papel específico. |

**Pixel Runtime hoje:** 3/5 — O projeto usa Georgia serif (intencional, retro), mas mistura inglês/português no mesmo bloco sem critério. `text-3xs uppercase tracking-widest` para seções é boa, mas overused.

---

### 8. Button / Action Clarity (Clareza das Ações)

| Nota | Descrição |
|------|-----------|
| 0 | Botões não identificáveis visualmente. |
| 1 | Botões existem mas têm baixo contraste com o fundo. |
| 2 | Ações primárias não se distinguem das secundárias. |
| 3 | Hierarquia de ações existe. Primário mais destacado que secundário. |
| 4 | Primary action sempre visível e clara. Secondary discreta. Destructive com cor de perigo. |
| 5 | Affordance imediata. Botões comunica o que acontece, são táteis, têm estados hover/focus/disabled claros. |

**Pixel Runtime hoje:** 2/5 — "Run rápido" e "Run deep" têm tamanho pequeno (`text-2xs`, `px-2 py-1`) e ficam perdidos abaixo do header. Input "Adicionar projeto" não tem CTA visível acima da dobra.

---

### 9. Card Structure (Estrutura de Cards)

| Nota | Descrição |
|------|-----------|
| 0 | Cards sem estrutura. Conteúdo variável sem padrão. |
| 1 | Cards têm header mas conteúdo interno sem hierarquia. |
| 2 | Cards consistentes dentro de cada tipo, mas diferentes tipos com peso similar. |
| 3 | Cards com header claro, corpo organizado, footer opcional. |
| 4 | Cards expressam sua função e estado no primeiro olhar. |
| 5 | Cards são tokens de informação — cada um conta uma história completa em uma linha. |

**Pixel Runtime hoje:** 2/5 — `AgentCard` com `0 runs` parece idêntico a um com `103 runs`. `ProjectCard` não diferencia visualmente projeto com auditoria vs sem.

---

### 10. Empty States (Estados Vazios)

| Nota | Descrição |
|------|-----------|
| 0 | Tela em branco ou erro genérico quando não há dados. |
| 1 | Texto genérico: "Nenhum dado encontrado." Sem orientação. |
| 2 | Mensagem de vazio existe mas não orienta o próximo passo. |
| 3 | Empty state com mensagem clara e dica de ação. |
| 4 | Empty state contextual: diferente para "primeira vez" vs "filtro sem resultado". |
| 5 | Empty state como oportunidade de onboarding. Mostra o que o usuário pode fazer. |

**Pixel Runtime hoje:** 1/5 — ChatPage: emoji + "Fala, parceiro!" sem sugestões de prompts. AgentCard com 0 runs não comunica que o agente nunca foi ativado.

---

### 11. Error States (Estados de Erro)

| Nota | Descrição |
|------|-----------|
| 0 | Nenhum tratamento de erro. Tela quebra ou congela. |
| 1 | "Error" genérico sem mensagem ou contexto. |
| 2 | Mensagem de erro presente mas técnica (stack trace, código de status). |
| 3 | Erro humanizado com o que aconteceu. Sem orientação de recovery. |
| 4 | Erro + causa provável + ação para recuperação. |
| 5 | Erro contextual + recovery automático onde possível + log acessível para debug. |

**Pixel Runtime hoje:** 3/5 — Erros de fetch são humanizados ("Failed to load agents"). Live Activity mostra stack trace bruto sem agrupamento ou deduplicação.

---

### 12. Feedback States (Estados de Feedback)

| Nota | Descrição |
|------|-----------|
| 0 | Sem feedback após ações do usuário. |
| 1 | Feedback só em casos de erro. Sucesso silencioso. |
| 2 | Loading states existem mas inconsistentes (alguns botões sem spinner). |
| 3 | Loading + success + error para a maioria das ações críticas. |
| 4 | Todos os estados cobertos. Optimistic UI onde apropriado. |
| 5 | Feedback instantâneo, preciso e contextual. Usuário nunca se pergunta "isso funcionou?". |

**Pixel Runtime hoje:** 3/5 — Audit launcher tem bom feedback (pulse badge, stop button). ModelRouterPage tem banner de mudanças pendentes. ChatPage não tem feedback de "mensagem enviada" além do spinner.

---

### 13. Accessibility (Acessibilidade)

| Nota | Descrição |
|------|-----------|
| 0 | Sem atributos ARIA. Navegação por teclado impossível. |
| 1 | Alguns aria-labels mas incompleto. Foco não visível. |
| 2 | Elementos interativos com labels. Focus ring fraco ou inconsistente. |
| 3 | WCAG AA no texto principal. Navegação por teclado funcional. |
| 4 | Roles corretas, labels descritivos, skip-links, foco gerenciado em modais. |
| 5 | WCAG AA completo. Screen reader experience testada. Reduced-motion respeitado. |

**Pixel Runtime hoje:** 2/5 — AgentCard usa `<article>` com `onClick` mas sem `role="button"` ou `tabIndex`. Muitos elementos interativos sem `aria-label`. Contraste de `text-text-ghost` abaixo do mínimo.

---

### 14. Cognitive Load (Carga Cognitiva)

| Nota | Descrição |
|------|-----------|
| 0 | Sobrecarga total. Usuário não sabe por onde começar. |
| 1 | Muitas opções visíveis simultaneamente sem hierarquia. |
| 2 | Carga gerenciável mas algumas seções exigem esforço. |
| 3 | Informação priorizada. Detalhes avançados colapsados. |
| 4 | Fluxo de atenção guiado. Usuário sabe sempre o que fazer a seguir. |
| 5 | Zero cognitive friction. Cada tela tem uma tarefa primária óbvia. |

**Pixel Runtime hoje:** 2/5 — ModelRouterPage tem 7+ seções visíveis simultaneamente: ModeSelector + Banner + AdaptiveStatus + PresetSelector + ReviewerRoutes + TaskRoutes + ModelRouterConfig + Stats + Changelog. Sobrecarga real para novos operadores.

---

### 15. Microcopy (Textos de Interface)

| Nota | Descrição |
|------|-----------|
| 0 | Labels genéricos: "Submit", "Click here", "Error". |
| 1 | Copy funcional mas sem personalidade ou clareza contextual. |
| 2 | Copy mistura idiomas sem critério ou usa jargão técnico desnecessário. |
| 3 | Copy claro na maioria dos contextos. Alguns labels ambíguos. |
| 4 | Copy contextual e consistente. Idioma (PT-BR) respeitado na maior parte. |
| 5 | Copy que orienta, ensina e tem voz própria. Zero ambiguidade. |

**Pixel Runtime hoje:** 2/5 — Mix inglês/português sem critério: "Run rápido" ao lado de "Run deep (arch + sec + perf)". Labels como "Live output" e "Last run output" em inglês; headers internos em PT. "Fala, parceiro!" no chat, mas "Model Performance" e "Task Routes avançadas" na mesma tela.

---

### 16. Design Consistency (Consistência de Design)

| Nota | Descrição |
|------|-----------|
| 0 | Cada seção parece de um produto diferente. |
| 1 | Tokens de cor usados, mas componentes com shapes inconsistentes. |
| 2 | Consistência dentro de páginas, mas cross-page inconsistente. |
| 3 | Design system respeitado. Algumas variações locais não-padronizadas. |
| 4 | Todos os componentes seguem os mesmos tokens. Variações são intencionais. |
| 5 | Uma tela qualquer do produto parece familiar imediatamente. |

**Pixel Runtime hoje:** 3/5 — Tokens usados consistentemente (`border-border`, `bg-bg-card`, etc.). Mas bordas internas em cards de model router criam ruído visual que não aparece em AgentsPage.

---

### 17. Product Usefulness (Utilidade do Produto)

| Nota | Descrição |
|------|-----------|
| 0 | Nenhum job-to-be-done endereçado. Produto não tem razão de existir visualmente. |
| 1 | Produto existe mas não é evidente o que o usuário consegue com ele. |
| 2 | Funções existem mas o produto não conecta com o objetivo do operador. |
| 3 | JTBD claros na maioria das telas. Algumas seções informativas sem call-to-action. |
| 4 | Cada tela serve um job claro. Operador sai com algo feito. |
| 5 | Produto aumenta agência do operador. Cada sessão tem valor imediato. |

**Pixel Runtime hoje:** 3/5 — ProjectsPage é clara (auditar projeto). AgentsPage é clara (inspecionar agente). ModelRouterPage é funcional mas o JTBD ("configurar prioridade de modelos") é obscuro para novos operadores.

---

### 18. Overall Polish (Acabamento Geral)

| Nota | Descrição |
|------|-----------|
| 0 | Produto parece protótipo ou debug UI. |
| 1 | Funciona mas parece inacabado. |
| 2 | Sólido mas com "rough edges" visíveis. |
| 3 | Produto coeso com algumas imperfeições. |
| 4 | Produto com acabamento profissional. Detalhes cuidados. |
| 5 | Produto que transmite confiança e competência. Cada pixel é intencional. |

**Pixel Runtime hoje:** 3/5 — Identidade retro/beige é coerente e diferenciada. Mas badges decorativos em excesso e copy inconsistente reduzem a percepção de acabamento.

---

## Score Sheet — Template de Aplicação Rápida

| # | Critério | Nota | P | Observação |
|---|----------|------|---|------------|
| 1 | Visual hierarchy | /5 | | |
| 2 | Layout clarity | /5 | | |
| 3 | Alignment | /5 | | |
| 4 | Spacing rhythm | /5 | | |
| 5 | Information density | /5 | | |
| 6 | Contrast | /5 | | |
| 7 | Typography | /5 | | |
| 8 | Button/action clarity | /5 | | |
| 9 | Card structure | /5 | | |
| 10 | Empty states | /5 | | |
| 11 | Error states | /5 | | |
| 12 | Feedback states | /5 | | |
| 13 | Accessibility | /5 | | |
| 14 | Cognitive load | /5 | | |
| 15 | Microcopy | /5 | | |
| 16 | Design consistency | /5 | | |
| 17 | Product usefulness | /5 | | |
| 18 | Overall polish | /5 | | |
| **Total** | | **/90** | | |
