# Hooked — Ethical Behavior Reference

**Agents:** Pixel Runtime (product), Pixel (UX ethics), Scout (research)
**Source:** `Hooked-How-to-Build-Habit-Forming-Products-_Nir-Eyal_.pdf` (2.1MB) — Nir Eyal, available locally at `<LOCAL_PROJECT_PATH>`

---

## The Hooked Model

A four-phase loop that builds habits in product users. Each phase increases the probability of the user returning without requiring external prompting.

```
Trigger → Action → Variable Reward → Investment → (next Trigger)
```

### Phase 1: Trigger

The actuator of behavior. Every cycle begins with a trigger.

**External trigger:** An explicit cue from the product.
- Notification ("Your task completed")
- Email summary ("Pixel Runtime finished 3 tasks")
- UI cue (badge, indicator, status change)
- Call-to-action button

**Internal trigger:** An emotional state or habitual context that becomes associated with the product over time.
- Anxiety about code quality → open Audit
- Starting a new feature → open Pixel Runtime
- Uncertainty about architecture → ask Atlas

The goal of product design is to connect product entry points to internal triggers. External triggers are training wheels; internal triggers are the habit.

### Phase 2: Action

The simplest behavior in anticipation of reward.

Governed by the **Fogg Behavior Model**: `B = MAT`
- **Motivation** (M): does the user want the reward enough?
- **Ability** (A): is the action easy enough to take?
- **Trigger** (T): is the prompt present at the moment?

If behavior doesn't happen, check which of the three is missing first.

Design implication: reduce friction on the path to value. Each extra step, form field, or decision is a potential abort point.

### Phase 3: Variable Reward

Reward must be variable to sustain engagement. Fixed rewards produce satiation; variable rewards produce seeking behavior.

Three types:

| Type | Description | Example in Pixel Runtime |
|------|-------------|---------------------|
| **Rewards of the Tribe** | Social validation, belonging | Peer review pass; team quality score |
| **Rewards of the Hunt** | Search and find, variable outcome | model router accepting on first model vs needing fallback |
| **Rewards of the Self** | Mastery, completion, control | Quality score improving; task accepted with 0 corrections |

### Phase 4: Investment

The user puts something in — time, data, social capital, effort, reputation. Investment increases the probability of returning because:
- It loads the next trigger (notifications configured, preferences set)
- It improves the product for the user (Pixel Runtime learns from feedback)
- It creates stored value (task history, project context, routing preferences)
- Cognitive consistency: "I put effort in, so it must be valuable"

---

## Ethical Filter (CRITICAL)

The Hooked Model is a neutral mechanism. The same loop can build beneficial habits (exercise apps, learning tools) or exploit users (slot machines, dark patterns). Pixel Runtime must apply the ethical filter before any engagement feature is built.

### The Manipulation Matrix

Eyal's framework for evaluating whether a product is a facilitator or an exploiter:

|  | High user benefit (materially improves life) | Low user benefit (does not improve life) |
|--|---------------------------------------------|------------------------------------------|
| **Uses the Hooked Model** | **Facilitator** — acceptable, build it | **Exploiter** — dark pattern, never build |
| **Does not use the Hooked Model** | Vitamin (still useful, less sticky) | Dealer (harmful without engagement) |

**Two questions every developer must honestly answer:**

1. "Would I use this myself?" — If not, why are you building it for others?
2. "Does this genuinely help users accomplish their goals, or does it hijack their attention for product metrics?"

If either answer is no, the feature fails the ethical filter.

---

## Application to Pixel Runtime Panel

### Acceptable: Facilitator Patterns

These patterns pass the ethical filter because they reinforce genuine productive behavior:

- **Task success feedback:** showing "Task accepted — 0 corrections required" rewards real quality improvement, not vanity.
- **Quality score trends:** showing a project's quality score improving over time rewards effort with evidence.
- **model router timing metrics:** showing how fast a task completed vs the baseline creates useful comparison for developers calibrating model choice.
- **Investment — user feedback loop:** users marking a task result as "needs improvement" teaches Pixel Runtime, improving future results. The investment is real and returns value.
- **Routing improvement through usage:** model router preset adaptation based on past task acceptance is transparent stored value.

### Forbidden: Exploiter Patterns

These patterns fail the ethical filter and must never be built:

- **False urgency:** "Your project has 3 unresolved issues — act now" when none are critical.
- **FOMO notifications:** pinging users about inactivity ("You haven't run an audit in 3 days").
- **Gamification that exploits:** streaks, points, or leaderboards disconnected from genuine quality outcomes.
- **Variable reward manipulation:** hiding task results to create artificial suspense.
- **Social pressure:** showing other users' stats to induce anxiety rather than inspiration.

---

## Dark Pattern Boundary

Pixel uses this rule when reviewing any engagement or notification feature:

```
Hooked Model + no genuine user benefit = dark pattern → Pixel blocks (severity: critical)
Hooked Model + genuine user benefit  = product design → Pixel approves
```

When in doubt, Pixel escalates to Pixel Runtime for product-level judgment using the two-question test above. Scout can be tasked to gather evidence on whether a feature produces genuine user benefit before Pixel gives a verdict.
