# WCAG 2.1 AA — Accessibility Reference for Pixel Runtime Agents

> Primary agents: **Pixel**, **Nova**  
> Standard: Web Content Accessibility Guidelines 2.1, Level AA

---

## The Four Principles (POUR)

| Principle | Meaning | Pixel Priority |
|---|---|---|
| **Perceivable** | Users can perceive all content | Critical |
| **Operable** | All interactions work via keyboard | Critical |
| **Understandable** | Content and UI behavior are clear | High |
| **Robust** | Works with assistive technologies | High |

---

## Critical Checks (block WRITE if violated)

### 1.4.3 Contrast (Minimum) — Level AA
Text contrast ratio must be ≥ 4.5:1 (normal text) or ≥ 3:1 (large text ≥ 18px or ≥ 14px bold).

Pixel Runtime design tokens:
- `--color-text-primary` on `--color-bg-base`: must pass at all theme variants
- Icons used as interactive elements: same contrast rules

```tsx
// Correct: high-contrast text
<span className="text-zinc-100 bg-zinc-900">Passing — ~15:1</span>

// Incorrect: insufficient contrast
<span className="text-zinc-400 bg-zinc-600">Failing — ~2.5:1</span>
```

### 2.1.1 Keyboard — Level A
All functionality must be operable via keyboard alone. Tab order must be logical.

```tsx
// Required: visible focus styles
<button className="focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary">
  Action
</button>
```

### 4.1.2 Name, Role, Value — Level A
Every UI component must have an accessible name, role, and state.

```tsx
// Correct
<button aria-label="Fechar modal" aria-expanded={isOpen} onClick={onClose}>
  <XIcon aria-hidden="true" />
</button>

// Incorrect — icon-only button with no label
<button onClick={onClose}>
  <XIcon />
</button>
```

### 1.1.1 Non-text Content — Level A
All images and icons that convey meaning need alt text or `aria-label`.

```tsx
// Correct: meaningful icon
<AlertCircle aria-label="Aviso: operação pode demorar" />

// Correct: decorative icon
<CheckCircle aria-hidden="true" />
```

---

## High Priority Checks (warning if violated)

### 2.5.5 Target Size — Level AAA (treated as AA warning)
Touch targets minimum 44×44px (mobile). Desktop minimum 32×32px with hitbox.

```tsx
// Correct: small icon with expanded hitbox
<button className="p-2" aria-label="Deletar"> {/* p-2 = 8px padding each side → total ≥ 44px */}
  <TrashIcon className="h-4 w-4" />
</button>
```

### 1.3.1 Info and Relationships — Level A
Relationships conveyed visually must be in the DOM.

```tsx
// Correct: error associated with input
<input id="email" aria-describedby="email-error" aria-invalid={!!error} />
<p id="email-error" role="alert">{error}</p>
```

### 2.4.7 Focus Visible — Level AA
Focus indicator must be visible. Never `outline: none` without a replacement.

---

## Pixel Severity Matrix

| Violation | WCAG Criterion | Pixel Severity |
|---|---|---|
| Missing alt text | 1.1.1 | **critical** |
| Contrast failure | 1.4.3 | **critical** |
| Keyboard inaccessible | 2.1.1 | **critical** |
| Missing role/name | 4.1.2 | **critical** |
| Target < 44px (mobile) | 2.5.5 | warning |
| Focus not visible | 2.4.7 | **critical** |
| Error not programmatic | 1.3.1 | warning |
| Language not declared | 3.1.1 | warning |

---

## Testing Tools

- `axe-core` / `@axe-core/react` — automated checks in Storybook
- `eslint-plugin-jsx-a11y` — lint-time checks
- `Tab` key navigation — manual smoke test
- Screen reader: macOS VoiceOver (`Cmd+F5`)

---

## Pixel Runtime Panel Accessibility Findings (from ux-audit)

Known issues from `docs/experience/ux-reviews/panel-ux-audit.md`:
1. Several icon-only buttons in ModelRouterPage lack `aria-label`
2. Focus management on modal open/close not implemented
3. Live regions (`aria-live`) missing on model router status updates
4. Color-only state indication in model badges (no text fallback)
