# Pixel — Context Acquisition Modes

**Version:** 1.0  
**Created:** 2026-04-29  
**Owner:** pixel  
**Related:** pixel-brief-template.md, pixel-code-inferred-context-guide.md

---

## Overview

Pixel cannot perform a high-quality review without understanding *who the user is, what they are trying to accomplish, and in what emotional/cognitive state they arrive at the screen.* This document defines the three modes by which Pixel acquires this context, in order of reliability.

---

## Mode 1 — Explicit Brief (Highest Reliability)

The operator or calling agent provides a structured `PxBrief` object alongside the task. This is the preferred mode for any non-trivial UI task.

**When to use:** New screens, major redesigns, conversion-critical flows, any interaction that involves emotion-laden decisions (purchases, confirmations, onboarding).

**What it contains:**
- Target user archetype
- Primary JTBD (situation → motivation → outcome)
- Dominant emotional state at arrival
- Cognitive load budget (low / medium / high tolerance)
- Business outcome metric this screen affects
- Known behavioral biases applicable to this audience
- Anti-goals (what must NOT be influenced in dark-pattern direction)

**Template:** See `pixel-brief-template.md`

---

## Mode 2 — Code-Inferred Context (Medium Reliability)

When no brief is provided, Pixel reads the component structure, prop names, copy strings, and surrounding task files to infer context. This is the default mode for automated pipeline runs.

**What Pixel looks for:**
- Component name → domain category (form, card, modal, list, confirmation...)
- Prop names → data types and user-facing concerns (e.g., `price`, `dueDate`, `deleteConfirm`)
- Copy strings → intent signals, emotional register, user state
- Route context → where in the flow this component lives
- Adjacent components → what the user saw before and will see after

**Confidence signal output:**
```
context_mode: inferred
confidence: high | medium | low
inferred_jtbd: "..."
inferred_bias_risks: [...]
```

**Limitation:** Inferred context misses business intent, audience demographics, and campaign context. Pixel flags medium/low confidence inference so operators can supplement.

**Guide:** See `pixel-code-inferred-context-guide.md`

---

## Mode 3 — Rubric-Only (Lowest Reliability — Technical Review)

When neither brief nor meaningful code context is available (e.g., reviewing a screenshot or static mockup), Pixel falls back to pure heuristic evaluation against the visual review rubric.

**What is evaluated:**
- Visual hierarchy
- Spacing and rhythm
- Typography scale compliance
- Contrast and accessibility signals
- Information density
- CTA clarity and verb usage
- Dark pattern surface-level detection

**What is NOT evaluated in this mode:**
- Behavioral bias risk (requires knowing user intent and emotional state)
- Framing effectiveness (requires knowing what decision is being facilitated)
- Choice architecture quality (requires knowing the full option set)

**Confidence signal output:**
```
context_mode: rubric_only
confidence: low
behavioral_review: skipped (no user context)
```

---

## Mode Selection Logic

```
IF PxBrief provided                 → Mode 1 (Explicit)
ELSE IF task has code artifacts      → Mode 2 (Inferred)
ELSE IF screenshot/mockup only       → Mode 3 (Rubric-only)
```

Pixel announces which mode is active at the start of every review output.

---

## Escalation: When to Request a Brief

Pixel MUST request a brief (and MAY pause the review) when:
1. The component facilitates a **commitment decision** (purchase, delete, subscribe, enable/disable)
2. The screen is a **onboarding or activation moment** (first impression, trust-building)
3. The task description contains behavioral keywords: `conversion`, `retention`, `churn`, `engagement`, `sign-up`, `upgrade`, `pricing`, `checkout`
4. Inferred confidence is `low` and the task is not purely cosmetic

Pixel does NOT request a brief for:
- Pure refactors with no copy/interaction changes
- Internal dashboard panels with known expert users
- Cosmetic fixes (spacing, color token corrections)
