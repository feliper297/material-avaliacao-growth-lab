# Pixel — Code-Inferred Context Guide

**Version:** 1.0  
**Created:** 2026-04-29  
**Owner:** pixel  
**Related:** pixel-context-acquisition-modes.md, pixel-behavioral-psychology-layer.md

---

## Purpose

When no PxBrief is provided, Pixel reads the codebase artifacts to infer user context. This guide defines the inference rules — what signals map to what behavioral assessments.

---

## Signal Catalogue

### 1. Component Name Signals

| Pattern | Inferred user state | Bias risks to check |
|---|---|---|
| `*Modal`, `*Dialog` | Interrupted flow; user mid-task | Choice overload (if modal has >3 options); Status quo (if modal is dismissible with background click) |
| `*Confirm*`, `*Delete*` | Anxiety; high stakes | Loss aversion (irreversible action); Confirmshaming risk |
| `*Checkout*`, `*Purchase*`, `*Upgrade*` | Commitment moment; evaluative | Anchoring (price display order); Loss aversion (FoMO); Cashless effect |
| `*Onboarding*`, `*Welcome*`, `*Setup*` | Excited / anxious; first impression | Anchoring (first value shown sets expectations); Sunk cost (progress bar investment) |
| `*Pricing*`, `*Plan*`, `*Tier*` | Comparison-mode; rational but biased | Anchoring (column order); Framing (what's highlighted); Choice overload (>4 plans) |
| `*Empty*`, `*Blank*` | Frustrated; feels failure | Loss aversion (emphasize what they'll gain, not what they lack) |
| `*Error*`, `*Retry*`, `*Fail*` | Frustrated; trust damaged | Framing (recovery language matters enormously) |
| `*Settings*`, `*Config*`, `*Preferences*` | Deliberate; goal-oriented | Status quo (default values heavily influence outcomes) |
| `*Dashboard*`, `*Overview*` | Scanning; pattern recognition | Information density; anchoring (first metric sets emotional tone for rest) |
| `*Notification*`, `*Alert*`, `*Banner*` | Context-interrupted | Framing (urgency language); False urgency dark pattern risk |

### 2. Prop Name Signals

| Prop pattern | Inferred context | Action |
|---|---|---|
| `price`, `cost`, `amount`, `total` | Financial decision | Check anchoring, cashless effect, framing; confirm loss-aversion-safe copy |
| `deadline`, `expiresAt`, `dueDate`, `endsIn` | Time-pressure context | Flag false urgency risk; verify deadline is real |
| `trialEndsAt`, `daysRemaining` | Transition anxiety (loss) | Check loss aversion copy — frame as "what you'll keep" not "what you'll lose" |
| `isDestructive`, `confirmDelete` | High stakes irreversible | Require confirmation pattern; check confirmshaming |
| `isLoading`, `isEmpty`, `isError` | Known states | Verify all are handled in UI |
| `steps`, `currentStep`, `totalSteps` | Multi-step flow | Check chunking, progress visibility (sunk cost lever — use ethically) |
| `recommendations`, `suggested` | Guided choice | Check anticipatory design quality; avoid false scarcity |
| `plan`, `tier`, `subscription` | Commitment decision | Full behavioral review required |

### 3. Copy String Signals

Pixel scans string literals, aria-labels, placeholder text, and button labels:

| Copy signal | Flag | Action |
|---|---|---|
| Urgency words: "agora", "última chance", "expira em", "só hoje" | Possible false urgency | Verify the deadline is real; flag if manufactured |
| Shame-based decline: "não quero X", "prefiro perder" | Confirmshaming (critical) | Block — replace with neutral decline label |
| Negative framing: "não perca", "evite perder", "risco de" | Loss aversion trigger | Audit: is this ethical (real risk) or manipulative? |
| Social proof: "X pessoas usaram", "mais popular" | Anchoring / social pressure | Verify accuracy; flag if fabricated |
| Pre-selected options in form | Status quo bias (check) | Verify the default serves user interest, not business interest unilaterally |
| Long scroll with many checkboxes | Choice overload risk | Audit for decision fatigue — consider chunking |
| "Grátis", "free" in pricing context | Cashless / zero price effect | Fine ethically — just ensure hidden costs are visible |

### 4. File Structure Signals

| File pattern | Inferred domain | Behavioral risk tier |
|---|---|---|
| `pages/Checkout*`, `pages/Purchase*` | Commerce flow | HIGH — full behavioral review |
| `pages/Pricing*`, `pages/Plans*` | Comparison + commitment | HIGH |
| `pages/Onboarding*`, `pages/Welcome*` | First impression | HIGH |
| `components/Modal*`, `components/Dialog*` | Decision interrupt | MEDIUM |
| `components/Card*` | Scan-mode display | MEDIUM — check information hierarchy |
| `components/Form*`, `components/Input*` | Data entry | MEDIUM — check cognitive load |
| `pages/Dashboard*`, `pages/Overview*` | Analytics display | LOW-MEDIUM |
| `components/Button*`, `components/Badge*` | Atomic elements | LOW — check copy/framing only |

### 5. Route/Navigation Context Signals

| Route pattern | Inferred journey position | Specific check |
|---|---|---|
| `/onboarding/*` | Pre-activation | Sunk cost setup (progress bars); anchoring (first feature shown) |
| `/checkout/*`, `/payment/*` | Transaction moment | Cashless effect; anchoring; loss aversion |
| `/settings/*` | Deliberate configuration | Status quo defaults; choice architecture |
| `/upgrade/*`, `/plans/*` | Upgrade pressure point | All biases active — require full PxBrief |
| `/cancel/*`, `/churn/*` | Retention moment | Loss aversion ethics; confirmshaming risk critical |

---

## Confidence Scoring Algorithm

Pixel computes inference confidence based on signal count:

| Signal sources available | Confidence |
|---|---|
| Component name + prop names + copy strings + file path | **high** |
| Component name + prop names + file path | **medium** |
| Component name only | **low** |
| Screenshot/mockup without code | **low** (triggers rubric-only mode) |

When confidence is `low`, Pixel outputs a recommendation to provide a PxBrief and lists what behavioral dimensions were skipped.

---

## Output Format for Inferred Context

```
## Inferred Context (Mode 2)

context_mode: inferred
confidence: medium

inferred_jtbd: "When reviewing upgrade options, user wants to compare plans quickly so they can commit to the right tier."
inferred_emotional_state: evaluative / mildly anxious
inferred_decision_stakes: high (payment commitment)
inferred_cognitive_load_budget: medium

behavioral_risks_detected:
  - anchoring: plan column order may set price expectations
  - choice_overload: 5 plan tiers detected — verify this is intentional
  - framing: "Most Popular" badge creates social pressure signal

behavioral_dimensions_skipped:
  - audience demographics (no brief provided)
  - anti-goals (unknown business constraints)

recommendation: provide a PxBrief to enable full behavioral review
```
