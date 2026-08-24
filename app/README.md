# Growth Lab App

Aplicação React do desafio — trilha de Product Design, evidências e painel do avaliador.

> **Estado atual (mock vs real, deploy, o que funciona):** leia [ESTADO-DO-SISTEMA.md](./ESTADO-DO-SISTEMA.md) — documento canônico.  
> Este README cobre apenas instalação e comandos.

## Stack

| Camada | Tecnologia |
|--------|------------|
| Front-end | Vite + React + TypeScript + Ant Design |
| Persistência **ativa** | Supabase (Auth + Postgres) |
| Persistência **legada** | BFF Express + `server/data/store.json` (Semana 1, não usada pelo front) |
| PDF | jspdf (exportação de relatório) |

## Pré-requisitos

Crie `app/.env.local` com:

```
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon
```

Sem isso a app autentica mas não persiste trilha/evidências.

## Rodar

```bash
cd app
npm install
npm run dev
```

- Front-end: http://127.0.0.1:5173/
- BFF legado (opcional, paralelo): http://127.0.0.1:3001/api/health

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Vite + BFF legado em paralelo |
| `npm run dev:client` | Só Vite |
| `npm run validate` | Lint + testes + build |
| `npm run test` | Vitest (domínio) |
| `npm run build` | Build de produção |

## Deploy

- **Produção:** https://app-zeta-tan-38.vercel.app
- **Comando:** `npx vercel deploy --prod --cwd app`
- CI/CD remoto: **não configurado** (deploy manual)

## Documentação relacionada

- [SEGURANCA.md](./SEGURANCA.md) — postura de segurança (status AMARELO, RLS, riscos abertos)
- [ESTADO-DO-SISTEMA.md](./ESTADO-DO-SISTEMA.md) — protótipo vs publicado vs mock vs Supabase; feito vs planejado
- [VALIDACAO-LOCAL.md](./VALIDACAO-LOCAL.md) — última execução de lint/test/build/audit
