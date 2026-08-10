# Pixel — Domain-Aware Review Rubric

**Version:** 1.0  
**Created:** 2026-04-29  
**Owner:** pixel  
**Related:** pixel-visual-review-rubric.md, pixel-behavioral-psychology-layer.md

---

## Purpose

The visual rubric (`pixel-visual-review-rubric.md`) evaluates *how the interface looks*. This domain-aware rubric evaluates *how the interface guides decisions* — factoring in user intent, emotional state, behavioral psychology, and domain-specific risks.

Both rubrics run in parallel. The domain-aware rubric adds scoring dimensions that are invisible to pure visual inspection.

---

## Scoring Scale

| Score | Label | Meaning |
|---|---|---|
| 5 | Excellent | Actively supports the user's goal and emotional state; ethical, clear, low friction |
| 4 | Good | Meets expectations; minor improvements possible |
| 3 | Acceptable | Works but misses opportunity to better serve the user |
| 2 | Concern | Pattern present that could mislead, overload, or disadvantage the user |
| 1 | Problem | Clear user harm, manipulation risk, or blocking friction |
| 0 | Critical | Dark pattern, deceptive design, or severe decision quality failure |

Score < 2 on any dimension triggers a **warning**. Score 0 on any dimension triggers a **critical block**.

---

## Dimension 1 — Choice Architecture

*Does the interface help the user make good decisions without overwhelming them?*

| Sub-dimension | What to evaluate |
|---|---|
| Option count | Is the number of options appropriate? (> 7 options: likely choice overload) |
| Option distinctiveness | Can the user meaningfully differentiate options without deep reading? |
| Default selection | Is the default set to serve user interest (not just business interest)? |
| Progressive disclosure | Are secondary options hidden until needed (chunking)? |
| Anticipatory guidance | Does the UI suggest a recommended path? (reduces satisficing) |

**References:** ENVIESADOS Ch.7 (Fadiga de Decisão), Steve Krug "satisficing", Barry Schwartz Paradox of Choice

---

## Dimension 2 — Framing Quality

*Is information presented in a way that supports honest comprehension?*

| Sub-dimension | What to evaluate |
|---|---|
| Gain vs loss framing | Is framing aligned with user interest, not just persuasion? |
| Statistical presentation | Are percentages/numbers presented without misleading emphasis? |
| Label tone | Do labels accurately describe the action (not shame or manipulate)? |
| Negative option labeling | Decline buttons use neutral language (not "No thanks, I don't want to save money") |
| Benefit vs risk balance | Are risks as visible as benefits for consequential decisions? |

**References:** ENVIESADOS Ch.6 (Viés do Enquadramento), Prospect Theory (Kahneman/Tversky)

**Critical flag:** Any confirmshaming (shame-based decline) → score 0 → block

---

## Dimension 3 — Urgency and Scarcity Integrity

*Is any urgency or scarcity signal real and proportional?*

| Sub-dimension | What to evaluate |
|---|---|
| Deadline accuracy | Is countdown/expiry timer based on a real constraint? |
| Stock/seat count | Is scarcity signal genuine or manufactured? |
| FoMO language | "Others are viewing this" — is it accurate and non-manipulative? |
| Time-pressure copy | Does urgent language reflect actual urgency? |

**References:** ENVIESADOS Ch.2 (Aversão à Perda — FoMO section), dark pattern catalogue

**Critical flag:** Manufactured deadline or false scarcity → score 0 → block  
**Warning flag:** Real deadline presented in unnecessarily alarming language → score 2

---

## Dimension 4 — Loss Aversion Ethics

*Is the fear of loss used ethically to protect user interest, or exploitatively to override rational judgment?*

| Sub-dimension | What to evaluate |
|---|---|
| Trial-end messaging | Does cancellation flow show what the user will lose? (ethical if accurate) |
| Churn prevention | Does cancellation flow use honest value reminders vs emotional manipulation? |
| Sunk cost leverage | Does the UI reference user's past investment honestly, not to trap them? |
| FoMO trigger | Is "what you'll miss" framing based on genuine product value? |

**References:** ENVIESADOS Ch.2 (Aversão à Perda), LinkedIn/Adobe examples

**Distinction:** Loss aversion used to help users appreciate real value = ethical.  
Loss aversion used to override a rational decision = dark pattern.

---

## Dimension 5 — Cognitive Load Balance

*Is the mental effort required proportional to the stakes of the decision?*

| Sub-dimension | What to evaluate |
|---|---|
| Information density | Is all shown information necessary at this step? |
| Decision sequence | Are decisions broken into digestible steps (chunking)? |
| Instruction clarity | Can the user understand what to do without reading explanatory text? |
| Satisficing trap | Will the user pick the first reasonable option due to fatigue? (critical for high-stakes decisions) |
| Context loading | Does the user need to remember information from previous screens? |

**References:** ENVIESADOS Ch.7 (Fadiga de Decisão), Don't Make Me Think (Krug), cognitive load theory

---

## Dimension 6 — Anchoring Awareness

*Does the first piece of information shown set fair expectations?*

| Sub-dimension | What to evaluate |
|---|---|
| Price presentation order | Is the highest price shown first? (Anchoring is ethical if done transparently) |
| Recommendation prominence | Does a highlighted "recommended" option reflect genuine quality match? |
| Default value | Does a pre-filled number/option anchor users appropriately? |
| Social proof order | Is the most impressive stat shown first? |

**References:** ENVIESADOS Ch.1 (Viés da Ancoragem), Dan Ariely SSN experiment, MailChimp pricing

**Note:** Anchoring is not inherently unethical. Showing the Premium plan first is fine. Anchoring users to a false expectation of value is a dark pattern.

---

## Dimension 7 — Status Quo and Default Ethics

*Do defaults serve users, or just the business?*

| Sub-dimension | What to evaluate |
|---|---|
| Pre-selected checkboxes | Does the default checkbox state serve user interest? |
| Auto-renewal clarity | Is auto-renewal communicated clearly before commitment? |
| Opt-out visibility | Can users easily opt out of things they may not want? |
| Position bias | Are important choices buried below less important ones? |

**References:** ENVIESADOS Ch.5 (Viés do Status Quo), GoDaddy/Zara examples, 401k auto-enrollment

**Critical flag:** Pre-checked consent or auto-renewal without clear disclosure → score 0 → block

---

## Dimension 8 — Emotional Stimulus Quality

*Does the visual/copy presentation create positive emotional associations that are genuine?*

| Sub-dimension | What to evaluate |
|---|---|
| Imagery emotional alignment | Does imagery match the emotional register of the decision moment? |
| Copy tone congruence | Does copy tone match user's likely emotional state at arrival? |
| Empty state emotion | Does empty state evoke agency (invitation) or failure (void)? |
| Error state emotion | Does error state feel like a recovery partner, not an accusation? |
| Success state emotion | Does success state celebrate the user genuinely? |

**References:** ENVIESADOS Ch.8 (Heurística do Afeto), Netflix thumbnail research, Airbnb emotional homepage

---

## Dimension 9 — Payment Friction Ethics (Financial Flows Only)

*Does the payment flow use friction appropriately — enough to prevent accidents, not so much to cause abandonment?*

| Sub-dimension | What to evaluate |
|---|---|
| Cashless effect | Is payment friction proportional? (Too easy → impulsive regret; Too hard → abandonment) |
| Price visibility | Is total cost visible before commit, not just at last step? |
| Hidden fee disclosure | Are any additional costs disclosed at the earliest appropriate moment? |
| 1-click patterns | Is 1-click purchase protected with intent confirmation for high-value items? |

**References:** ENVIESADOS Ch.3 (Efeito Cashless), Amazon 1-Click, Disney MagicBand

---

## Composite Score Calculation

```
domain_score = mean(all 9 dimension scores, weighted by stakes)

stakes_weight:
  commitment decisions:  ×1.5
  onboarding moments:    ×1.3
  configuration:         ×1.0
  informational display: ×0.8
```

| Composite | Assessment |
|---|---|
| ≥ 4.0 | Behavior-Aware: PASS |
| 3.0–3.9 | Acceptable — log warnings |
| 2.0–2.9 | Needs revision — at least one medium-risk pattern |
| < 2.0 | Block — significant behavioral harm risk |

---

## Integration with Visual Rubric

The final Pixel score is:

```
pixel_composite = 0.4 × visual_score + 0.6 × domain_score
```

Domain-aware dimensions are weighted higher because behavioral harm is invisible to visual-only review — and therefore more dangerous.
