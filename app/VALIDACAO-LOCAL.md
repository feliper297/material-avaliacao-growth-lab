# Validação local — Growth Lab

Registro técnico de lint, testes, build e audit.  
Para **mock vs real, deploy e escopo funcional**, use [ESTADO-DO-SISTEMA.md](./ESTADO-DO-SISTEMA.md).

## Comando único

```bash
npm run validate
```

Na raiz do repositório ou em `app/` — executa **lint → test → build** em sequência.

## Mapa de dependências (`app/package.json`)

| Pacote | Papel | Usado em runtime? |
|--------|-------|-------------------|
| **@supabase/supabase-js** | Persistência (auth + dados) | Sim — `supabaseApi.ts`, `useStore.ts` |
| **express + cors** | BFF local (legado) | Só com `npm run dev:server` / `dev` |
| **antd + @ant-design/icons** | UI | Sim — componentes React |
| **jspdf + jspdf-autotable** | Exportação PDF | Sim — `progressReport.ts` (import dinâmico no export) |
| **@playwright/test** | Screenshots de auditoria | Não no bundle — `scripts/pixel-screenshot.mjs` |
| **@vercel/node** | Deploy serverless (se usado) | Dev/build tooling |

**Nota:** o frontend em produção fala direto com Supabase. O BFF (`server/index.ts`) e `src/services/api.ts` existem para desenvolvimento local legado; `useStore` usa `supabaseApi`, não o BFF.

## Segurança — checklist

| Item | Status |
|------|--------|
| Chave anon Supabase no frontend (`VITE_SUPABASE_*`) | OK — `src/lib/supabase.ts` exige anon, não `service_role` |
| Secrets no repositório | OK — variáveis via `.env` (não commitadas) |
| RLS no Supabase | Manual — validar no projeto remoto |
| `npm audit --omit=dev` (dependências de produção) | **0 vulnerabilidades** |
| `npm audit` (inclui dev) | 11 avisos em cadeia `@vercel/node` (dev only) |

Avisos de dev não entram no bundle Vite de produção. Atualizar `@vercel/node` exige `npm audit fix --force` (breaking change) — pendente se o deploy serverless for mantido.

## Resultado — 2026-08-24

```
Lint:  OK (2 warnings pré-existentes)
       - server/index.ts: import DEFAULT_STORE não usado
       - src/utils/progressReport.ts: no-control-regex

Test:  OK — 2 arquivos, 6 testes (Vitest)
       - shared/domain/evidence.test.ts
       - shared/domain/progress.test.ts

Build: OK — tsc -b + vite build
       Bundle: index-D50FuTq8.js, index-Ya9HHuJt.css
       Aviso: chunk principal > 500 kB (jspdf/html2canvas no export PDF)

Audit prod: 0 vulnerabilities
Audit dev:  11 vulnerabilities (moderate/high, @vercel/node)
```

## Como repetir

```bash
cd app
npm run validate
npm audit --omit=dev
npm audit
```
