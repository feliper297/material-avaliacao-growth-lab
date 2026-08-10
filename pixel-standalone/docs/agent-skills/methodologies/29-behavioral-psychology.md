# 29 — Behavioral Psychology in UX

**Agents:** Pixel (primary), Pixel Runtime (product ethics)
**Sources:**
- ENVIESADOS — Rian Dutra (PDF available locally, 7.3MB, PT-BR) — cognitive biases
- O Paradoxo da Escolha — Barry Schwartz (PDF available locally, 2.5MB, PT-BR) — decision overload

**Category:** Methodology / UX Psychology

---

## Overview

Behavioral psychology provides the scientific foundation for understanding why users make the decisions they do — often contrary to what they say they want, and often contrary to their own best interest. For Pixel Runtime's panel, this matters in two directions: applying these principles to make the UI clearer and less frustrating, and flagging when design choices unintentionally (or intentionally) exploit these biases against the user.

Pixel applies this methodology in two modes: constructive (use bias-awareness to reduce friction and cognitive load) and protective (flag dark patterns or unintentional anchoring/framing that harms operator experience).

---

## Core Concepts — ENVIESADOS (Cognitive Biases)

### 1. Anchoring Bias

The first number or reference point shown influences all subsequent comparisons. Users anchor to the first value they see and adjust insufficiently from it.

**UX implication:** The first option shown in a list, the first price displayed, the first metric shown in a dashboard — all become the reference against which everything else is judged. Position the "recommended" or "default" option first, and users will evaluate alternatives relative to it.

**Pixel Runtime panel:** When showing model router route options, list the primary route first. Users will treat it as the baseline. A fallback that costs 2x a clearly-labeled primary will be perceived as expensive; unlabeled, it may seem normal.

---

### 2. Availability Heuristic

Events that come to mind easily feel more common or more important than they are. Recency and vividness both increase availability.

**UX implication:** The most recently visible status dominates the user's perception of system health. If the last thing the operator saw was a failure, they will perceive the system as more unreliable than statistics warrant.

**Pixel Runtime panel:** Show aggregate success rates alongside recent events. A single visible failure after 50 successes should not dominate the dashboard. Provide historical context (e.g., "1 failure in last 20 tasks") so recent events are calibrated.

---

### 3. Confirmation Bias

People seek, interpret, and remember information that confirms their existing beliefs. They discount contradicting evidence.

**UX implication:** Operators who believe a particular LLM provider is unreliable will notice its failures disproportionately and explain away its successes. Error messages that reinforce existing beliefs ("as expected, Groq timed out again") are counterproductive.

**Pixel Runtime panel:** Error messages should be neutral and data-driven. Avoid language that reinforces narratives. Provide actual statistics on provider reliability rather than only surfacing individual failure events.

---

### 4. Status Quo Bias

Default options are chosen disproportionately. Changing from the default requires effort; not changing requires none. The default is not neutral — it is a design choice that nudges the vast majority of users.

**UX implication:** Every default in Pixel Runtime is a policy decision. Whatever the default model router preset is, that is what most operators will use. Whatever the default model is for a task type, that is what most tasks will use. Design defaults as if they were mandatory for 90% of users.

**Pixel Runtime panel:** Default to the safest/most reliable preset, not the cheapest or fastest. Allow override, but make the default defensible. Settings that are blank by default require the user to make a decision; settings with smart defaults require only a rejection.

---

### 5. Framing Effect

Identical information presented differently produces different decisions. "90% success rate" and "10% failure rate" are mathematically identical; psychologically, they are not.

**UX implication:** The words chosen in status messages, metric labels, and error descriptions directly affect how operators perceive system health and make decisions.

**Pixel Runtime panel examples:**
- "Task completed with 1 warning" vs. "Task failed with partial output" — same event, different perception
- "Fallback route used" vs. "Primary route unavailable — fallback activated" — the second frames resilience as a feature, not a failure
- Success rate vs. failure rate: show success rate by default; offer failure rate as a secondary view for debugging

---

### 6. Loss Aversion

Losses feel approximately twice as powerful as equivalent gains. Users are more motivated to avoid a loss than to acquire an equivalent gain.

**UX implication:** Error messages that imply loss ("your task failed and data may be lost") cause disproportionate anxiety. Recovery paths reduce the perceived loss — make them immediately visible.

**Pixel Runtime panel:**
- Every error state must include an immediate recovery action (retry button, manual override, contact info)
- Never show a failure message without a next step
- Frame cancellation as "stop task" (neutral) not "lose progress" (loss-framing)
- Pixel flags: any destructive action without a recovery path triggers a UX review

---

## Core Concepts — O Paradoxo da Escolha (Paradox of Choice)

### 1. More Options = More Cognitive Load = Decision Paralysis

Schwartz's central finding: beyond a certain threshold, adding more options does not increase satisfaction — it decreases it. The effort of evaluating each option accumulates, and at some point, people defer the decision or choose nothing.

**UX implication:** Every additional setting, option, or configuration field in the Pixel Runtime panel is a potential paralysis trigger. Maximize the number of decisions Pixel Runtime makes automatically; minimize the number exposed to operators.

---

### 2. Satisficing Beats Maximizing

Satisficers accept the first "good enough" option. Maximizers evaluate all options before deciding. Maximizers report lower satisfaction even when they make objectively better choices, because they carry the cognitive cost of the evaluation.

**UX implication:** Design the Pixel Runtime panel for satisficers. The goal is not to give operators all possible information to make the optimal decision — it is to make the obvious path so clear that most operators can act without deliberation.

**Pixel Runtime panel:** One recommended preset, prominently labeled. Advanced options in a collapsed section. The operator who takes the default should feel good about it, not like they missed something.

---

### 3. The Tyranny of Small Decisions

When every interaction requires a decision, even small ones, the accumulated cognitive load is exhausting. Users who must make 30 micro-decisions before a task starts will be less satisfied than users who made 3 decisions.

**UX implication:** Reduce mandatory decisions to the minimum. Batch related decisions. Use sensible defaults that eliminate entire decision categories.

**Pixel Runtime panel:** The operator should need to make exactly two decisions to start a task: (1) what is the task description, (2) which project path. Everything else is configurable but not required.

---

### 4. Post-Choice Regret Increases with Number of Alternatives

The more alternatives were available, the more the user will wonder "what if I had chosen differently." More options available increases regret even when the chosen option is good.

**UX implication:** Hiding advanced options behind a toggle does not just reduce cognitive load during decision — it reduces regret after the decision. The operator who chose from 3 options is more satisfied with their choice than the operator who chose from 30.

**Pixel Runtime panel:** Default views show the recommended configuration. Advanced configuration is available but requires explicit navigation to find. This is not hiding information — it is protecting post-decision satisfaction.

---

## Application to Pixel Runtime Panel

### Model Selection UI

- Show the recommended preset prominently, labeled as "recommended"
- Show a 2-3 line description of what the preset does (not just a name)
- Collapse advanced provider configuration behind an "Advanced" toggle
- Never show a blank configuration that requires the user to configure every field

### Status Indicators

- Frame as "working on X" (positive, ongoing) not "not yet done" (negative, incomplete)
- Show success counts alongside failure counts to prevent availability heuristic distortion
- Use consistent color semantics: green = good, amber = attention needed, red = action required

### Error Messages

- Always include: what happened, what it means, what to do next
- Loss aversion rule: every error includes a recovery path, never a dead end
- Framing rule: "model router used fallback route (Groq)" not "primary route failed"
- Never imply data loss unless data was actually lost

### Route Configuration

- Default to the proven-stable preset, not blank
- Label defaults clearly ("this is what most tasks use")
- Show impact of non-default choices ("faster but less reliable")

### Pixel Flags — Trigger List

Pixel raises a UX review flag when detecting:
- Anchoring: unlabeled first options that may be interpreted as "best" when they are not
- Framing: success/failure language that misrepresents system health
- Loss aversion: error states without recovery path
- Choice overload: more than 5 ungrouped options in a single decision context
- Blank-slate forms that require the user to configure everything before proceeding
- Destructive actions without confirmation and undo path

---

## Product Ethics Note

These patterns are tools for understanding human cognition, not a manipulation playbook. Pixel Runtime is an operator tool for experienced developers — not a consumer product. The standard here is: use these principles to reduce cognitive friction and improve operator experience, not to drive engagement or retention through psychological exploitation.

Pixel Runtime (orchestrator) and Pixel co-own the product ethics check. Any use of these principles that works against operator interests (dark patterns, deliberate confusion, manufactured urgency) must be flagged and removed.

---

## Further Reading

- Dutra, Rian. *ENVIESADOS* (PT-BR) — available locally, 7.3MB
- Schwartz, Barry. *The Paradox of Choice: Why More Is Less* (2004) — PT-BR version available locally, 2.5MB
- Kahneman, Daniel. *Thinking, Fast and Slow* (2011) — foundational cognitive bias science
- Thaler, Richard & Sunstein, Cass. *Nudge* (2008) — default design and choice architecture
- Norman, Don. *The Design of Everyday Things* (1988) — see `31-design-of-everyday-things.md`
