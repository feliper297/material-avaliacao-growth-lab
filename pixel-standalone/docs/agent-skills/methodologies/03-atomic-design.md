# Atomic Design — Reference for Pixel Runtime Agents

> Primary agents: **Nova**, **Pixel**  
> Source: Brad Frost, *Atomic Design* (2016)

---

## The Five Levels

```
Tokens → Atoms → Molecules → Organisms → Templates → Pages
```

### Tokens (pre-atomic)
Design decisions expressed as named values: colors, spacing, typography scales.

```css
/* In Pixel Runtime: apps/panel/src/index.css and design-tokens.json */
--color-brand-primary: #4F46E5;
--spacing-4: 1rem;
--font-size-base: 0.875rem; /* 14px */
--radius-md: 0.375rem;
```

### Atoms
Smallest indivisible UI elements. A button, an input, a label, an icon.

```tsx
// atoms/Button.tsx
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', children, ...props }, ref) => (
    <button ref={ref} className={buttonVariants({ variant, size })} {...props}>
      {children}
    </button>
  )
);
Button.displayName = 'Button';
```

**Rules:**
- No business logic
- No data fetching
- Fully controlled via props
- Every atom has a Storybook story

### Molecules
Simple combinations of atoms that together serve one function.

```tsx
// molecules/SearchField.tsx — Label + Input + Button
export function SearchField({ onSearch, placeholder }: SearchFieldProps) {
  const [value, setValue] = useState('');
  return (
    <div role="search" className="flex gap-2">
      <label htmlFor="search" className="sr-only">Buscar</label>
      <Input id="search" value={value} onChange={e => setValue(e.target.value)} placeholder={placeholder} />
      <Button onClick={() => onSearch(value)}>Buscar</Button>
    </div>
  );
}
```

### Organisms
Complex UI sections composed of molecules and atoms. May have local state and data fetching.

```tsx
// organisms/AgentCard.tsx — combines StatusBadge + AgentAvatar + MetricsList + ActionButton
```

### Templates
Page-level layout without real content — pure structural scaffolding.

### Pages
Templates with real data. The component tree's root for a given route.

---

## Pixel Runtime Panel Component Hierarchy

```
Panel (Page)
├── ModelRouterPage (Template + data)
│   ├── ModeSelector (Organism)
│   │   ├── ModeButton[] (Molecule)
│   │   │   ├── Icon (Atom)
│   │   │   └── Label (Atom)
│   ├── TaskRoutesSection (Organism)
│   │   ├── RouteCard[] (Molecule)
│   │   │   ├── ModelBadge[] (Atom)
│   │   │   └── RouteName (Atom)
│   └── ChangelogSection (Organism)
│       └── ChangelogEntry[] (Molecule)
└── AgentsPage (Template + data)
    └── AgentGrid (Organism)
        └── AgentCard[] (Molecule)
```

---

## Rules for Nova

1. One component per file, named after the atom/molecule/organism
2. Atoms have zero side effects (no hooks except `useRef`, `useId`, `useCallback` for event handlers)
3. Organisms can use `useState` and `useEffect`; pages use React Query
4. Export named (not default) exports
5. `displayName` required on `forwardRef` components
6. All interactive atoms accept `aria-label` or `aria-labelledby`

---

## Visual Regression Checklist

For every new component:
- [ ] Desktop (1440px) screenshot
- [ ] Tablet (768px) screenshot  
- [ ] Mobile (375px) screenshot
- [ ] Focus state visible
- [ ] Hover state present
- [ ] Disabled state (if applicable)
- [ ] Error state (if applicable)
- [ ] Empty state (if applicable)
