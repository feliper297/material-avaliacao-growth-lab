# Pixel Visual QA Checklist

**Owner:** Pixel — Product Experience Architect
**Use:** antes de aprovar UX Spec, UX Review ou handoff para Nova.

---

## 1. 3-second test

- [ ] Em 3 segundos fica claro qual é o objetivo da tela.
- [ ] Em 3 segundos fica claro qual ação principal o usuário deve tomar.
- [ ] O status do sistema é visível sem ler logs ou procurar em outro lugar.
- [ ] Informação crítica não está escondida em metadata/frase longa.

---

## 2. Hierarchy

- [ ] Ação primária domina visualmente.
- [ ] Ações secundárias/terciárias são claras, mas subordinadas.
- [ ] Títulos não competem com conteúdo principal.
- [ ] Labels não têm mais peso que valores.
- [ ] Badges/status têm significado claro.
- [ ] Não há múltiplos focos visuais brigando.

---

## 3. Spacing and grouping

- [ ] Spacing interno < spacing entre grupos.
- [ ] Form groups não têm spacing ambíguo.
- [ ] Cards/seções têm padding consistente.
- [ ] Gaps seguem escala do design system.
- [ ] Não há valores arbitrários sem justificativa.
- [ ] A densidade é operacional sem parecer bagunçada.

---

## 4. Alignment

- [ ] Elementos seguem eixos claros.
- [ ] Ícones, textos e inputs alinham por baseline/centro conforme contexto.
- [ ] Tabelas/listas facilitam comparação.
- [ ] Nada parece deslocado por 1-4px sem intenção.

---

## 5. Typography

- [ ] Type scale é consistente.
- [ ] Pesos diferenciam título, corpo, label e metadata.
- [ ] Texto longo tem largura/line-height legível.
- [ ] IDs, paths, hashes e comandos usam monospace.
- [ ] Uppercase é usado com moderação.
- [ ] Metadata muted ainda é legível.

---

## 6. Color

- [ ] Cor primária guia ação, não decoração.
- [ ] Estado usa token semântico correto.
- [ ] Brand color não é reutilizada como estado.
- [ ] Status nunca depende só de cor.
- [ ] Contraste é suficiente.
- [ ] Danger/destructive é visualmente distinto.

---

## 7. Surfaces, borders, radius and shadow

- [ ] Background, panel, card, inset e raised têm papéis claros.
- [ ] Border é sutil e consistente.
- [ ] Radius segue escala por componente.
- [ ] Shadow comunica elevação real.
- [ ] Modal/popover/dropdown parecem acima do plano base.
- [ ] Não há excesso de caixas/bordas gerando ruído.

---

## 8. Interaction states

- [ ] Default.
- [ ] Hover.
- [ ] Focus-visible.
- [ ] Active/pressed.
- [ ] Disabled.
- [ ] Loading/skeleton.
- [ ] Empty.
- [ ] Error.
- [ ] Success/confirmation.
- [ ] Partial/stale/offline quando aplicável.
- [ ] Permission/read-only quando aplicável.

---

## 9. Microinteractions

- [ ] Toda ação assíncrona tem feedback imediato.
- [ ] Loading preserva estrutura do layout final.
- [ ] Empty state explica próximo passo.
- [ ] Error state explica o que aconteceu e como recuperar.
- [ ] Success state confirma ação concluída.
- [ ] Mudança de estado é perceptível.
- [ ] Undo/retry existe quando necessário.

---

## 10. Motion

- [ ] Motion tem propósito: orientar, focar, explicar causa/efeito, dar feedback, demonstrar ou expressar marca.
- [ ] Duração é curta para fluxo operacional.
- [ ] Não há animação que atrase trabalho.
- [ ] Reduced motion é respeitado.
- [ ] Motion não esconde erro, delay ou dark pattern.

---

## 11. Accessibility visual

- [ ] Contraste normal text ≥ 4.5:1.
- [ ] Contraste large text ≥ 3:1.
- [ ] Contraste de componente/borda essencial ≥ 3:1 quando aplicável.
- [ ] Focus visível.
- [ ] Icon-only action tem nome acessível.
- [ ] Status tem texto além de cor.
- [ ] Touch target mobile ≥ 44px; desktop operacional ≥ 32px quando contexto permitir.

---

## 12. Review output template

```markdown
## Pixel Visual QA Result

### Status
- Overall: ok | warning | critical
- Blocks WRITE: yes | no

### Findings
1. [PX-VISUAL-...] severity — problema
   - Evidence:
   - Fix:

### Craft summary
- Hierarchy:
- Spacing:
- Typography:
- Color:
- Surface/depth:
- Microinteraction/motion:

### Recommendation for Nova
- ...
```

---

## 13. One-line decision rule

```text
Se a tela funciona mas parece CRUD cru, Pixel deve gerar warnings acionáveis. Se a falha visual induz erro, bloqueia acessibilidade, manipula decisão ou esconde estado crítico, Pixel deve bloquear WRITE.
```

---

## 14. Relação com as metodologias

Este checklist é a forma curta de aplicar:

- `docs/agent-skills/methodologies/33-refactoring-ui-visual-craft.md` (hierarquia, spacing, cor, superfície)
- `docs/agent-skills/methodologies/34-designing-interfaces-patterns.md` (padrões de tela, forms, listas, dashboards)
- `docs/agent-skills/methodologies/35-microinteractions-and-interface-motion.md` (estados, feedback, motion)
- `docs/agent-skills/methodologies/36-visual-perception-typography.md` (percepção, legibilidade, tipografia)

Detalhamento do modelo operacional: `docs/agent-skills/agents/pixel-design-eye-addendum.md`.
