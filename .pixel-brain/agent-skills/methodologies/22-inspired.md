# INSPIRED — Methodology Reference

**Agents:** Pixel Runtime (product strategy), Scout (discovery), Atlas (roadmap)
**Source:** `INSPIRED-BY-MARTY-CAGAN-BOOK-SUMMARY-AND-PDF.pdf` (106.9KB — summary edition) — Marty Cagan, available locally at `<LOCAL_PROJECT_PATH>`

---

## Core Insight

Most product teams work in **delivery mode** (output-driven): they receive requirements from stakeholders, estimate effort, build features, and ship. Success is measured by features delivered on time.

Great product teams work in **discovery + delivery mode** (outcome-driven): they identify problems worth solving, discover solutions through experimentation, and deliver the ones that create real value. Success is measured by outcomes achieved.

The difference is not process — it is accountability. Delivery-mode teams are accountable for output. Outcome-mode teams are accountable for results.

---

## Key Concepts

### 1. Outcome vs Output

Shipping is not success. A shipped feature that no one uses is waste. A shipped feature that solves a real problem is value.

| Output thinking | Outcome thinking |
|----------------|-----------------|
| "We shipped the audit report feature" | "Developers who run audits fix 40% more critical issues" |
| "Pixel Runtime completed 1,000 tasks this month" | "Teams using Pixel Runtime reduced bug regression rate by 25%" |
| "We added 3 new agents" | "Atlas agent reduced architecture rework by 2 hours per sprint" |

### 2. Opportunity Assessment

Before building anything, the team must answer 4 questions honestly:

1. **What problem are we solving?** (for whom, in what context)
2. **Who has this problem?** (specificity matters — "developers" is too broad)
3. **How will we know if we solved it?** (metric, observable behavior)
4. **Why build this vs alternatives?** (opportunity cost comparison)

If any answer is "we're not sure," the team is not ready to build — they are ready to discover.

### 3. Product Discovery Techniques

Discovery reduces the risk of building the wrong thing. Cagan's core techniques:

- **Customer interviews:** talk to users, not about users. Observe behavior, do not ask for feature requests.
- **Prototype testing:** test solutions before building them. Clickable prototypes cost 1/100th of shipped code.
- **Demand testing:** validate that users want something before building it (fake door, landing page, waitlist).
- **Value testing:** validate that users get the expected value after using the feature, not just that they clicked it.

### 4. Product vs Feature Factory

A **feature factory** ships features on demand. Backlogs are filled by stakeholders. Teams measure throughput. Features accumulate, product coherence degrades.

A **product team** owns a customer problem and outcome. They decide what to build. They are accountable for whether it works. Their backlog is driven by discovery findings, not requests.

Pixel Runtime agents must never behave as feature factories. Every capability must exist because it solves an identified problem, not because someone requested it.

### 5. The Role of Product Manager

The PM holds three authorities:

- **Customer authority:** deepest knowledge of the customer's situation, context, and job-to-be-done
- **Data authority:** deepest understanding of what the data says about product behavior
- **Business authority:** clear understanding of constraints, priorities, and organizational goals

Without all three, the PM cannot make good product decisions.

### 6. Empowered Teams vs Feature Teams

| Feature team | Empowered team |
|-------------|---------------|
| Receives solutions to build | Receives problems to solve |
| Accountable for delivery | Accountable for outcomes |
| Backlog driven by stakeholders | Backlog driven by discovery |
| Measures velocity | Measures impact |
| PM is project manager | PM is product owner of outcomes |

---

## Application to Pixel Runtime

### Opportunity Assessment as a Pixel Runtime Principle

Every Pixel Runtime feature must have an opportunity assessment on record before implementation begins. The four questions must be answered in the task spec. A spec that skips the opportunity assessment is incomplete.

Example for a hypothetical "auto-commit on success" feature:
1. Problem: developers forget to commit after Pixel Runtime completes a task, losing verified state.
2. Who: developers using Pixel Runtime in task mode on active projects (not audit-only).
3. Success metric: commit rate within 5 minutes of task completion increases from ~40% to ~80%.
4. Why this vs alternatives: reminders were tried and ignored; auto-commit is lower friction than a prompt.

### Audit Mode — Why, Not Just What

Audit output must answer "why does this matter?" for every finding. A finding without business impact is noise. Graves and Audit agents must include:

- What was found
- Why it creates risk or cost (the outcome it threatens)
- What the expected impact is of fixing vs not fixing

### Scout — INSPIRED Discovery Patterns

Scout applies discovery patterns when researching options:

- Simulate customer interviews by reviewing real usage data and error logs (observe, don't assume)
- Compare alternatives before recommending one (value testing equivalent)
- Document demand evidence before recommending a new capability

### Atlas — Outcome Milestones, Not Feature Lists

Atlas roadmaps are structured as outcome milestones:

- "Developers can trust Pixel Runtime task output without manual review" (milestone) — not "add 5 new validation rules" (feature list)
- Each milestone has a measurable success condition
- Features are scoped to support the milestone, not collected for their own sake
