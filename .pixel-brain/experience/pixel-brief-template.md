# PxBrief — Pixel Context Brief Template

**Version:** 1.0  
**Created:** 2026-04-29  
**Owner:** pixel  
**Related:** pixel-context-acquisition-modes.md, pixel-behavioral-psychology-layer.md

---

## What Is a PxBrief?

A PxBrief is the structured input that unlocks Pixel's full Behavior-Aware review capability. Without it, Pixel runs in inferred or rubric-only mode. With it, Pixel can evaluate not just *what the interface does* but *whether it guides users well given who they are and what they feel*.

Provide a PxBrief whenever the task touches a conversion moment, emotional decision, or first impression.

---

## Template (copy this block)

```yaml
# px-brief.yaml — fill and include in task or pass as endpoint body field
brief:
  screen_name: ""               # e.g. "Checkout confirmation", "Upgrade modal"
  context_mode: explicit        # always "explicit" when providing a brief

  audience:
    archetype: ""               # e.g. "Tech lead evaluating devtools"
    technical_literacy: ""      # low / medium / high
    familiarity_with_product: "" # first-session / returning / power-user

  jtbd:
    situation: ""               # "When I am [context/trigger]..."
    motivation: ""              # "...I want to [action]..."
    outcome: ""                 # "...so I can [expected result]."

  emotional_state_at_arrival:
    dominant: ""                # e.g. anxious / curious / skeptical / hopeful / frustrated
    secondary: ""               # optional
    source: ""                  # what caused this state — e.g. "just saw error page", "referred from pricing page"

  cognitive_load_budget:
    level: ""                   # low / medium / high
    rationale: ""               # why — e.g. "decision involves money", "arrives after long form flow"

  decision_type:
    category: ""                # commitment / exploration / configuration / confirmation / onboarding
    is_reversible: true         # or false — irreversible decisions need stronger confirmation patterns
    stakes: ""                  # low / medium / high — affects urgency of behavioral safeguards

  business_context:
    primary_metric: ""          # e.g. "upgrade conversion rate", "onboarding completion rate"
    anti_goals:                 # what must NOT be exploited — Pixel enforces this as a hard constraint
      - ""

  known_biases_applicable:
    # List biases Pixel should actively watch for. Pixel will flag if patterns in the UI
    # accidentally trigger these against user interest.
    - bias: ""                  # e.g. "loss_aversion", "status_quo", "choice_overload"
      context: ""               # why this bias is relevant for this user/screen
```

---

## Filled Example — Pixel Runtime Panel: model router Mode Switch

```yaml
brief:
  screen_name: "ModelRouterPage — mode selector"
  context_mode: explicit

  audience:
    archetype: "AI crew operator (project owner profile) — owns the team, deep technical context"
    technical_literacy: high
    familiarity_with_product: power-user

  jtbd:
    situation: "When I notice tasks are consuming too many tokens or running slowly"
    motivation: "I want to switch model router mode and immediately see how the model priority order changes"
    outcome: "so I can trust the crew is now optimizing for cost/quality as I intended."

  emotional_state_at_arrival:
    dominant: "focused-analytical"
    secondary: "mildly anxious about cost"
    source: "probably arrived from build failure or high-cost run notification"

  cognitive_load_budget:
    level: medium
    rationale: "operator knows the system well but mode differences aren't always obvious"

  decision_type:
    category: configuration
    is_reversible: true
    stakes: medium

  business_context:
    primary_metric: "model cost per task (visible in ModelRouterStats)"
    anti_goals:
      - "Do not use urgency language about costs in a way that feels alarmist"
      - "Do not auto-switch mode without explicit confirmation"

  known_biases_applicable:
    - bias: "status_quo"
      context: "operators rarely change mode once set — UI should make the current state clear so change feels intentional, not accidental"
    - bias: "anchoring"
      context: "the first model shown in the list anchors expected quality — must match what the mode label promises"
    - bias: "framing"
      context: "\"Auto · Custo\" framing implies saving money — make sure the cost savings signal is visible immediately after switch"
```

---

## How Pixel Uses the Brief

1. **Emotional state** → Pixel evaluates copy register: does the tone match where the user is emotionally?
2. **Cognitive load budget** → Pixel flags information density violations proportional to stated budget
3. **Decision type + stakes** → Pixel checks confirmation patterns, reversibility signals, and CTA weight
4. **Known biases** → Pixel actively hunts for unintentional bias triggers and flags dark pattern adjacents
5. **Anti-goals** → Pixel treats anti-goals as hard constraints equivalent to dark pattern rules
6. **Business metric** → Pixel evaluates whether the primary CTA is visually dominant and friction-optimized

---

## Minimalist Brief (Quick-Start)

For simpler cases, a four-field brief is sufficient:

```yaml
brief:
  screen_name: "..."
  audience_archetype: "..."
  emotional_state: "..."        # one word: anxious / curious / hurried / etc.
  decision_stakes: low | medium | high
```

Pixel will infer the rest but will flag that full context was unavailable.
