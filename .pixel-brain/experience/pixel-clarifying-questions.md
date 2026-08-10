# Pixel — Clarifying Questions Catalogue

**Version:** 1.0  
**Created:** 2026-04-29  
**Owner:** pixel  
**Related:** pixel-brief-template.md, pixel-context-acquisition-modes.md

---

## Purpose

When Pixel is running in inferred mode and encounters ambiguity, these questions help surface the context needed for a behavioral review. Pixel asks the minimum set of targeted questions — never a broad questionnaire.

Use case: Pixel Runtime routes a UI task to Pixel without a PxBrief. Before proceeding with limited confidence, Pixel selects 1-3 questions from this catalogue based on the detected signals.

**Rule:** Pixel NEVER asks more than 3 questions at once. Select the highest-leverage questions based on the component type and detected risk signals.

---

## Category A — Decision Stakes

*Ask when: component involves a commitment, payment, or destructive action.*

1. **"This component involves [detected action, e.g. 'purchase confirmation']. Is this reversible? What is the user's ability to undo it?"**

2. **"What does the user typically feel when they arrive at this screen — anxious, excited, confident, hurried? Any context you have helps me calibrate the tone review."**

3. **"Is this a first-time user flow, a returning user flow, or both? The acceptable information density differs significantly between these."**

4. **"What's the business outcome this screen is optimizing for? I want to distinguish between persuasion-toward-genuine-value vs dark-pattern-risk."**

---

## Category B — Choice Architecture

*Ask when: > 5 options visible, or pricing/plan selection detected.*

5. **"How many options does the user realistically need to evaluate to make a good decision here? If the answer is 1-2, I'd recommend hiding the rest behind progressive disclosure."**

6. **"Is there a 'most commonly chosen' or 'recommended for this profile' path? Surfacing this reduces choice fatigue without removing autonomy."**

7. **"Is this feature list exhaustive (every option must be shown) or curated (showing the user what matters most)? This affects how I assess the information density."**

---

## Category C — User Audience

*Ask when: the audience archetype is unclear from code context.*

8. **"Who is the primary user of this screen — a technical expert who wants full control, a first-time user who needs guidance, or a business decision-maker who needs summary information?"**

9. **"Is this screen used frequently (power user patterns apply) or rarely (first-seen cognitive model applies)? This changes my evaluation of icon-only affordances and label verbosity."**

10. **"Are users arriving at this screen from a high-anxiety context (e.g., just saw an error, facing a deadline) or a calm/exploratory context? Emotional state significantly affects how framing reads."**

---

## Category D — Defaults and Pre-Selection

*Ask when: checkboxes, pre-filled fields, or default options detected.*

11. **"I see [pre-selected option/checkbox]. Is this default set to serve the user's most common genuine preference, or primarily for business conversion? I need this to distinguish ethical default from dark pattern."**

12. **"Are there any auto-renewal, opt-out consent, or subscription-enabling defaults in this flow? These require explicit disclosure even if legal compliance has already been reviewed."**

13. **"Who decided these defaults? If they were set by the business team without UX input, I'd recommend reviewing them through the lens of user interest first."**

---

## Category E — Framing and Copy

*Ask when: copy tone is ambiguous, or decline/cancel language is detected.*

14. **"The decline/cancel option currently reads '[text]'. Is this an intentional choice or a placeholder? I'm checking for confirmshaming risk."**

15. **"Are any prices, statistics, or comparisons on this screen currently placeholder values? I need to evaluate framing against real numbers."**

16. **"Is the urgency language on this screen ('limited time', 'expiring soon') based on an actual constraint? I flag fabricated urgency as a critical dark pattern regardless of intent."**

---

## Category F — Emotional and Affective Design

*Ask when: imagery, tone, or emotional design elements are prominent.*

17. **"What emotional state should the user LEAVE this screen in? (vs what state they arrive in) — this helps me evaluate whether the design successfully completes an emotional arc."**

18. **"The imagery/illustration here suggests [inferred mood]. Is this deliberate or a design choice that could be revisited? I want to confirm it matches the intended user experience."**

19. **"Does the brand voice for this product lean reassuring, energetic, authoritative, or playful? This affects my copy tone evaluation."**

---

## Category G — Sunk Cost and Gamification

*Ask when: progress bars, streaks, scores, or achievement patterns detected.*

20. **"The progress indicator currently shows [X]% — does this percentage reflect a genuinely important milestone for the user, or is it artificially constructed to create engagement? I evaluate these differently."**

21. **"Are the gamification elements (streaks, points, levels) tracking behavior that genuinely serves the user's goals, or primarily engagement metrics? The former is ethical; the latter is a potential sunk cost trap."**

---

## Question Selection Logic

| Component type detected | Priority questions |
|---|---|
| Payment / checkout | A2, A3, D12 |
| Pricing / plan selector | B5, B6, C8 |
| Confirmation modal (destructive) | A1, A2, E14 |
| Onboarding / welcome | A3, C8, F17 |
| Settings / preferences | D11, B5, C9 |
| Form with pre-filled fields | D11, D12, D13 |
| Progress / gamification elements | G20, G21, A4 |
| Cancel / churn flow | A1, E14, E16 |
| Dashboard / analytics | C8, F18, B7 |
| Empty state | C10, F17, F19 |

---

## How Pixel Presents Questions

```
## Pixel — Context Clarification Needed

Before completing the behavioral review for [component name], I need context on [category]:

1. [Question from catalogue]
2. [Question from catalogue]

Without this, I'll proceed in inferred mode (confidence: medium) 
and flag the relevant dimensions as unverified.

To skip questions and accept medium confidence: respond "proceed".
```
