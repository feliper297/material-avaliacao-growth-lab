# Nielsen's 10 Heuristics — Reference for Pixel Runtime Agents

> Primary agents: **Pixel**  
> Source: Jakob Nielsen, 10 Usability Heuristics for User Interface Design (1994, updated 2020)

---

## The 10 Heuristics

### 1. Visibility of System Status
The system should always keep users informed about what is going on.

**Pixel checks:**
- Loading states present for every async operation
- Progress indicators for operations > 1 second
- Real-time feedback on form submission

```tsx
// Required: status visible during model router operations
{isRunning && <span className="text-sm text-zinc-400" aria-live="polite">Auditoria em andamento...</span>}
```

### 2. Match Between System and the Real World
Use words, phrases, and concepts familiar to the user, not system-oriented terms.

**Pixel checks:**
- No technical jargon in user-facing copy
- PT-BR as primary language (not EN)
- Date/number formats follow pt-BR locale

### 3. User Control and Freedom
Support undo, redo, and easy exits.

**Pixel checks:**
- Destructive actions (delete, cancel) require confirmation dialog
- Modals have explicit close button AND Escape key
- Navigation doesn't trap users

### 4. Consistency and Standards
Users should not have to wonder whether different words, situations, or actions mean the same thing.

**Pixel checks:**
- Same action always uses same label ("Cancelar" vs "Fechar" — pick one and stick to it)
- Color coding consistent (red = danger, green = success throughout)
- Button hierarchy consistent (primary/secondary/ghost variants)

### 5. Error Prevention
Design that prevents problems from occurring in the first place.

**Pixel checks:**
- Destructive button is not the first/most prominent option
- Form validation before submit (not after)
- Irreversible actions clearly labeled as such

### 6. Recognition Rather Than Recall
Minimize user's memory load. Make objects, actions, and options visible.

**Pixel checks:**
- Current state always visible in UI (active preset, selected mode)
- Breadcrumbs or context shown for deep navigation
- Recent items or common actions surfaced

### 7. Flexibility and Efficiency of Use
Allow users to tailor frequent actions.

**Pixel checks:**
- Keyboard shortcuts for power users documented
- Most frequent actions accessible in ≤ 2 clicks
- No forced multi-step flows for simple tasks

### 8. Aesthetic and Minimalist Design
Dialogues should not contain irrelevant or rarely needed information.

**Pixel checks:**
- No copy that isn't actionable or informative
- Empty states suggest next action (not just "No data")
- Dense tables have visual hierarchy

### 9. Help Users Recognize, Diagnose, and Recover from Errors
Error messages should be expressed in plain language, precisely indicate the problem, and constructively suggest a solution.

**Pixel checks:**
- Error messages explain what happened + what to do
- Never "An error occurred" alone
- Suggested recovery action present

```tsx
// Correct error message format
<Alert variant="error">
  <p>Não foi possível iniciar a auditoria.</p>
  <p>Verifique se o caminho do projeto existe e tente novamente.</p>
</Alert>
```

### 10. Help and Documentation
Even though it is better if the system can be used without documentation, it may be necessary to provide help.

**Pixel checks:**
- Tooltips on non-obvious actions
- Empty states explain how to get started
- Complex settings have `?` info icon with explanation

---

## Pixel Runtime Panel Heuristic Scores (from ux-audit)

| Heuristic | Score | Main Issue |
|---|---|---|
| 1. Visibility | 7/10 | Some async ops lack feedback |
| 2. Real World Match | 8/10 | Technical jargon in route names |
| 3. User Control | 6/10 | No undo for model router mutations |
| 4. Consistency | 8/10 | Minor label inconsistencies |
| 5. Error Prevention | 7/10 | Destructive actions not confirmed |
| 6. Recognition | 8/10 | Active state visible in most places |
| 7. Flexibility | 6/10 | No keyboard shortcuts |
| 8. Minimalism | 7/10 | Route table dense without hierarchy |
| 9. Error Recovery | 5/10 | Generic error messages |
| 10. Documentation | 7/10 | Tooltips on some actions only |
