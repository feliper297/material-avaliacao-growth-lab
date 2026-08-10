# Cognitive Load Theory — Reference for Pixel Runtime Agents

> Primary agents: **Pixel**, **Nova**  
> Source: John Sweller; Don't Make Me Think (Steve Krug)

---

## Three Types of Cognitive Load

| Type | Definition | Design Goal |
|---|---|---|
| **Intrinsic** | Inherent complexity of the task itself | Reduce where possible; accept what's unavoidable |
| **Extraneous** | Complexity added by poor design | Eliminate aggressively |
| **Germane** | Mental effort building useful schemas | Encourage via progressive disclosure |

---

## Krug's First Law of Usability

> "Don't make me think."

Every time a user encounters a question mark in their mind ("What does this do?", "Where does this go?"), you've added extraneous cognitive load.

---

## Practical Checks

### Chunk Information
The human working memory holds ~7 ± 2 items. Group related items visually.

```tsx
// Bad: 15 ungrouped settings
<Settings />

// Good: grouped sections with headers
<SettingsSection title="model router Mode">...</SettingsSection>
<SettingsSection title="Model Selection">...</SettingsSection>
<SettingsSection title="Presets">...</SettingsSection>
```

### Progressive Disclosure
Show only what's needed for the current task. Reveal advanced options on demand.

```tsx
// Good: collapsible advanced section
<Collapsible>
  <CollapsibleTrigger>Configurações avançadas</CollapsibleTrigger>
  <CollapsibleContent>...</CollapsibleContent>
</Collapsible>
```

### Reduce Decision Points
Every decision a user must make is cognitive load. Reduce choices; use smart defaults.

```tsx
// Bad: 6 options with no recommendation
<RadioGroup>
  <Radio value="a" />
  <Radio value="b" />
  <Radio value="c" />
  ...
</RadioGroup>

// Good: default highlighted, others in secondary style
<RadioGroup>
  <Radio value="mixed" label="Mixed (recomendado)" recommended />
  <Radio value="budget" label="Budget" />
  ...
</RadioGroup>
```

---

## Recognition vs. Recall

Users recognize rather than recall. Always:
- Show current state (don't require memory of previous screen)
- Provide labels on all interactive elements
- Show recent/common items in context

From Pixel Runtime panel audit: users must remember which preset they selected because the current value isn't prominently displayed. Pixel flags this as warning (heuristic #6).

---

## Scanning Patterns

Users scan before they read. Ensure:
- Most important information in top-left (F-pattern)
- Headings are meaningful (not "Section 1")
- Actions are visually distinct from information

---

## Dark Pattern Detection (Cognitive Load Exploitation)

Some patterns deliberately increase cognitive load to manipulate users:

| Pattern | How it exploits | Pixel action |
|---|---|---|
| **Misdirection** | Make cancel button look like the main CTA | Critical — block |
| **Confirmshaming** | "No thanks, I don't want to save money" | Critical — block |
| **Roach motel** | Easy to opt in, hard to opt out | Critical — block |
| **Hidden costs** | Reveal fees at checkout | Critical — block |
| **Trick questions** | Double negative opt-out checkboxes | Critical — block |

---

## Pixel's Cognitive Load Checklist

For every screen reviewed:
- [ ] Number of choices per section ≤ 7
- [ ] Primary action visually dominant
- [ ] Secondary/destructive actions visually recessive
- [ ] Form fields grouped logically
- [ ] No information that requires prior context to understand
- [ ] No dark patterns (see table above)
- [ ] Empty states suggest next action
