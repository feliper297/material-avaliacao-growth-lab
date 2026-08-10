# Don't Make Me Think — Methodology Reference

**Agents:** Pixel (primary), Nova (secondary)
**Source:** `Dont-Make-Me-Think-Revisited-PDFDrive-.pdf` (14.4MB) — Steve Krug, available locally at `<LOCAL_PROJECT_PATH>`

---

## Core Principle

Users don't read, they scan. Design for scanning, not reading.

**Billboard design rule:** Every page should be self-evident, obvious, and self-explanatory. A user should be able to glance at it and immediately understand: what it is, how to use it, and where they are.

---

## Key Concepts

### 1. Scanning, Not Reading

Users arrive at a page with a task in mind. They don't read sequentially — they scan for the first option that looks like it might work. This behavior is called **satisficing**: choosing the first reasonable option rather than the optimal one.

Design implications:
- Headers and labels carry more weight than body text
- Visual hierarchy must match information hierarchy
- Anything that interrupts the scan path increases cognitive load

### 2. Happy Path Design

Remove anything that makes users stop and think. Every question mark in a user's head is friction. Friction accumulates — it does not average out.

Questions to eliminate:
- "Where am I?"
- "Where should I begin?"
- "What do I do next?"
- "Why did that happen?"

### 3. Navigation Conventions

Users arrive with mental models built from other products. Breaking conventions forces learning — which costs thinking budget.

Required navigation patterns:
- **Breadcrumbs** for hierarchical position
- **Current location indicators** (highlighted nav item, active state)
- **Consistent placement** of global controls across all views

### 4. Trunk Test

A page passes the trunk test if a user, blindfolded, dropped anywhere on the site can answer in 5 seconds:

1. What site is this?
2. What page am I on?
3. What are the major sections?
4. What are my options at this level?
5. Where am I in the hierarchy?
6. How do I search?

If any answer requires reading more than a glance, the design fails the trunk test.

### 5. Usability Testing

Krug's rule: small, cheap, frequent is better than large, expensive, rare.

- **3–5 users per round** reveal most usability problems
- Test early (paper prototypes work)
- Fix the worst problem first; re-test
- Avoid debating what users want — watch what users do

### 6. Omit Needless Words

Get rid of half the words. Then get rid of half of those.

Eliminating words:
- Reduces noise
- Makes useful content more prominent
- Reduces page weight for scanning

Forbidden patterns: happy talk ("Welcome to our..."), instructions that explain what is already obvious, redundant labels.

---

## Application to Pixel Runtime Panel

| UI Element | Krug Rule | Required Behavior |
|-----------|----------|-------------------|
| Task status | Scanning, not reading | Color + text label + icon simultaneously (never icon alone) |
| Agent names | Convention | Always in the same position across all task cards |
| Task IDs | Scanning | Truncated with tooltip, not wrapped |
| Model names | Clarity | Full model identifier visible, not hidden in hover |
| Action buttons | Omit words | Labeled with verbs: "Run Task", "Stop", "View Output" — never "OK", "Submit", "Go" |
| Primary action | Happy path | Visually dominant (filled, accent color); secondary actions muted |
| Error messages | Think→don't think | Two parts: what happened + what to do next. Example: "Task failed (timeout) — Retry or check model router config" |
| Current view | Trunk test | Highlighted nav, breadcrumb, and page title must agree on where the user is |

---

## Quality Gates for Pixel

When reviewing any panel component, Pixel applies these gates in order:

1. **No label requires context to understand** — a new user reading the label cold must understand its meaning.
2. **Primary action is always visually distinct** from secondary and destructive actions (not just color — also size, weight, or placement).
3. **Current state is always visible without hover** — status, active item, selected option must not require mouse interaction to be seen.
4. **Billboard test passes** — screenshot the component in isolation and verify the user's first 3 questions are answered at a glance.
5. **Trunk test passes** — any page containing the component passes the 6-question trunk test within 5 seconds.

Violations at gates 1–2 are severity: high.
Violations at gates 3–5 are severity: medium.
