# Growth Lab App — Semana 1

Walking skeleton da trilha de Product Design (ADR-001 a ADR-014).

## Stack

- **Front-end:** Vite + React + TypeScript + Tailwind (ADR-003, ADR-004, ADR-008)
- **BFF:** Express na porta 3001 (ADR-005)
- **Domínio:** `shared/domain/` — funções puras (ADR-006)
- **Persistência:** `server/data/store.json` — mock local honesto (ADR-007)

## Rodar

```bash
cd app
npm install
npm run dev
```

Abre:

- Front-end: http://127.0.0.1:5173/
- BFF: http://127.0.0.1:3001/api/health

## Scripts

| Comando | Descrição |
|---|---|
| `npm run dev` | Front + BFF em paralelo |
| `npm run dev:client` | Só Vite |
| `npm run dev:server` | Só Express BFF |
| `npm run test` | Vitest (domínio) |
| `npm run build` | Build de produção |
| `npm run lint` | oxlint |

## Rollback (ADR-014)

1. Parar servidores
2. Restaurar `server/data/store.json` a partir de backup ou `server/data/store.example.json`
3. Reiniciar `npm run dev`

## Limites declarados

- Sem Storybook (ADR-009) — Fase 4
- Sem CI/CD remoto (ADR-012) — Fase 4
- Sem deploy (ADR-010) — local dev
- Recorte B: trilha + checklist; gate auditável completo do MVP `[→]` Semana 2 se evoluir para híbrido

## Evidência

- Testes: `npm run test`
- Smoke BFF: `GET /api/health` → `{ ok: true, persistence: "json-file" }`
