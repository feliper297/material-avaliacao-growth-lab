# Estado do sistema — Growth Lab App

**Fonte única de verdade** sobre o que existe hoje na pasta `app/`.  
Use este arquivo para reproduzir, avaliar ou auditar o software — não o README do pacote de avaliação na raiz.

Última atualização: 2026-08-24

---

## 1. Protótipo local (referência histórica)

| Item | Detalhe |
|------|---------|
| **Onde** | `projeto-base/` |
| **O que é** | HTML estático do desafio original — ponto de partida para crítica, não a app atual |
| **Como rodar** | `cd projeto-base && python3 -m http.server 4173` |
| **Persistência** | Nenhuma (estado só na sessão do navegador) |
| **Autenticação** | Nenhuma |

O executor registrou o baseline em `projeto-base/STATUS-INICIAL-ESPERADO.md`. A app em `app/` **substitui** esse protótipo como produto construído.

---

## 2. Versão publicada

| Item | Detalhe |
|------|---------|
| **URL** | https://app-zeta-tan-38.vercel.app |
| **Hospedagem** | Vercel (root directory: `app`) |
| **Deploy** | `npx vercel deploy --prod --cwd app` |
| **Build** | `npm run build` (Vite + TypeScript) |
| **CI/CD remoto** | **Não configurado** — deploy manual via CLI; sem GitHub Actions neste repositório |

A versão publicada é a mesma codebase de `app/`, com variáveis de ambiente Supabase configuradas no painel Vercel.

---

## 3. Mock (legado — não usado em produção)

Camadas mantidas no repositório por histórico da Semana 1 (ADR-007), **sem ser o caminho ativo** da app publicada:

| Camada | Arquivo / pasta | Comportamento |
|--------|-----------------|---------------|
| BFF Express | `server/index.ts`, `server/data/store.json` | JSON local na porta 3001 |
| Cliente BFF | `src/services/api.ts` | `fetch` para `/api/*` |
| API Vercel | `app/api/*.ts` | Serverless legado (não chamado pelo front atual) |

**Quem usa hoje:** ninguém no fluxo principal. `useStore` importa `supabaseApi`, não `api.ts`.

Para testar o mock JSON localmente (opcional): `npm run dev:server` + trocar manualmente o import em `useStore` — não documentado como caminho oficial.

---

## 4. Persistência real (produção e dev com `.env`)

| Item | Detalhe |
|------|---------|
| **Provedor** | Supabase (Postgres + Auth + Storage) |
| **Cliente** | `src/lib/supabase.ts`, `src/services/supabaseApi.ts`, `src/services/evaluationApi.ts` |
| **Variáveis** | `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` (arquivo `.env` local; secrets na Vercel) |
| **Tabelas usadas** | `user_state`, `evidences`, `evaluations`, `profiles` (+ storage para prints de avaliação) |
| **Segurança** | Apenas chave **anon** no front; RLS no Supabase — ver [SEGURANCA.md](./SEGURANCA.md) (status **AMARELO**, não aprovado) |

Sem `.env` configurado, `npm run dev` abre a UI mas **falha ao carregar dados** após login.

> **Nota sobre ADR-007:** a decisão original era JSON via BFF. A evolução para Supabase está documentada aqui; o ADR histórico em `anexos/ADR.md` não foi reescrito para preservar o registro da decisão inicial.

---

## 5. Funcionalidades concluídas

Comportamento verificável na versão publicada e no build local (2026-08-24):

- [x] Login/logout (Supabase Auth)
- [x] Trilha de 4 semanas — conteúdos, marcar concluído, mini testes (quiz)
- [x] Evidências — criar, editar, excluir (participante)
- [x] Avaliação semanal e final — admin edita; participante lê
- [x] Prints na avaliação — upload, visualização, exclusão (admin)
- [x] Back Office — usuários, progresso, indicadores (admin)
- [x] Exportar relatório PDF (participante e admin)
- [x] Layout responsivo mobile
- [x] Testes de domínio (`npm run test` — 6 testes)
- [x] Build de produção (`npm run build`)
- [x] Gate local `npm run validate` (lint + test + build)

---

## 6. Funcionalidades planejadas (ainda não entregues)

Escopo do desafio completo que **não** está na app atual:

- [ ] Ciclo de 30 dias com onboarding, objetivo âncora e datas
- [ ] Avaliação inicial (baseline) comparável ao dia 30
- [ ] Check-ins semanais formais dentro do produto (além da trilha atual)
- [ ] Registro de uso de IA / agent runs no sistema
- [ ] Storybook e design system documentado (ADR-009)
- [ ] CI/CD com GitHub Actions (ADR-012)
- [ ] Testes E2E automatizados (Playwright existe só para script de screenshot)
- [ ] BFF como camada de produção (se mantido, precisa de decisão explícita)

---

## Rodar localmente (caminho oficial)

```bash
cd app
# criar .env.local com VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY
npm install
npm run dev            # Vite :5173 + BFF legado :3001 (BFF ignorado pelo front)
```

Abra http://127.0.0.1:5173/

Validação: `npm run validate` — detalhes em [VALIDACAO-LOCAL.md](./VALIDACAO-LOCAL.md).

---

## Mapa rápido: qual doc ler?

| Pergunta | Documento |
|----------|-----------|
| O que o software faz **hoje**? | **Este arquivo** |
| Postura de segurança (honesta) | [SEGURANCA.md](./SEGURANCA.md) |
| Como instalar e rodar? | [README.md](./README.md) |
| Contrato do desafio de avaliação | [../README.md](../README.md) |
| Protótipo HTML inicial | [../projeto-base/README.md](../projeto-base/README.md) |
| Rubricas e checklists do avaliador | [../RUBRICA-DO-AVALIADOR.md](../RUBRICA-DO-AVALIADOR.md) — processo, não estado do código |
| Decisões arquiteturais históricas | [../anexos/ADR.md](../anexos/ADR.md) |
