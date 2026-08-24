# Segurança — Growth Lab App

**Status: AMARELO — gate aberto. Nota provisória: 5/10 → 6/10 após correções de 2026-08-24.**

Não afirmar “sistema seguro” ou “sem riscos”. A separação arquitetural no repositório **não prova** isolamento completo no runtime.

Documento canônico complementar: [ESTADO-DO-SISTEMA.md](./ESTADO-DO-SISTEMA.md).

---

## Modelo de ameaça (produção)

| Camada | Ativa em produção? | Controle de acesso |
|--------|-------------------|-------------------|
| Front-end React (Vercel) | Sim | UI oculta ações — **não é barreira** |
| Supabase (Auth + Postgres + Storage) | Sim | **Autorização real** via RLS + policies |
| BFF Express (`server/`) | Não (só dev local) | Sem auth — mock JSON |
| API Vercel (`app/api/*`) | Rotas legadas **410 Gone** | Desativadas em 2026-08-24 |

Atacante com token anon + JWT de participante chama **PostgREST/Supabase diretamente**, não a UI.

---

## O que foi confirmado (evidência)

- RLS habilitado em `profiles`, `user_state`, `evidences`, `evaluations`.
- Policies existentes restringem leitura/escrita por `auth.uid()` e `is_admin()`.
- Front-end organizado em `src/`; domínio em `shared/`; migrações em `app/supabase/migrations/`.
- Chave exposta no cliente é **anon** (`VITE_SUPABASE_*`), não `service_role`.
- Repositório público, isoladamente, não é falha.
- `npm run validate` executado (lint + test + build) — ver [VALIDACAO-LOCAL.md](./VALIDACAO-LOCAL.md).
- Nenhum secret encontrado commitado em `.env.local` (gitignored).

### RLS resumido (Postgres)

| Tabela | Participante | Admin |
|--------|--------------|-------|
| `user_state` | CRUD próprio | SELECT todos |
| `evidences` | CRUD próprio | SELECT todos |
| `evaluations` | SELECT próprio | INSERT/UPDATE/DELETE |
| `profiles` | SELECT/UPDATE próprio (role fixo) | SELECT/UPDATE todos |
| Storage `evaluation-prints` | SELECT público | INSERT/DELETE admin |

---

## Correções aplicadas (2026-08-24)

1. **Escalada de privilégio em `profiles`** — trigger `enforce_profile_role` + policies separadas; role não vem mais do client (`ensureProfile` só insere email).
2. **Guardas no client** — `shared/domain/authorization.ts` + checagens em `supabaseApi`, `evaluationApi`, `backofficeApi` (defesa em profundidade; RLS continua mandatório).
3. **Testes negativos de autorização** — `shared/domain/authorization.test.ts` (IDOR lógico, admin vs participante).
4. **API legada desativada** — `/api/state`, `/api/evidences` retornam **410**; `/api/health` indica `supabase`.
5. **RPC `is_admin()`** — `REVOKE EXECUTE` para `anon`/`authenticated` (migration).

Migração: `app/supabase/migrations/20260824_fix_profiles_role_escalation.sql`

---

## O que ainda NÃO está provado

- Testes E2E contra Supabase real por perfil (participante tentando RPC/API admin).
- Pentest de IDOR/BOLA com tokens reais em ambiente de staging.
- CORS, rate limiting, CSRF (PostgREST usa JWT Bearer — CSRF de cookie menos crítico).
- Proteção contra senha vazada (Supabase advisor: leaked password protection **desligado**).
- Secret scanning completo do histórico Git.
- Logs de auditoria e alertas na Vercel/Supabase.
- Bucket `evaluation-prints` é **público** para leitura — aceitável para demo, revisar em produção real.

---

## Checklist operacional (pendente)

- [ ] Aplicar migration no projeto Supabase (`growth-lab`) se ainda não aplicada
- [ ] Habilitar leaked password protection no Supabase Auth
- [ ] Adicionar CI com `npm run validate` + secret scanning
- [ ] Testes de integração Supabase com contas participante/admin de teste
- [ ] Revisar hardcode `admin@gmail.com` no trigger (conta de avaliação demo)

---

## Parecer

Há **separação arquitetural** e **RLS como barreira principal**, com correção de escalada de role e API mock desativada. A seguridade **não está aprovada** para produção genérica; status permanece **AMARELO** até testes de integração e hardening operacional.
