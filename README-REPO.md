# Growth Lab — avaliação dupla

Pacote de avaliação + app React (`app/`).

## Repositório

- Documentação e materiais na raiz
- **`app/`** — aplicação deployável (Vite + React + BFF/API)

## Rodar localmente

```bash
cd app
npm install
npm run dev
```

- Front: http://127.0.0.1:5173/
- BFF local: http://127.0.0.1:3001/

## Deploy Vercel

- **Produção:** https://app-zeta-tan-38.vercel.app
- **Projeto:** `feliper297s-projects/app`
- **Root directory na Vercel:** `app` (deploy via `npx vercel deploy --prod --cwd app`)

A API em produção usa funções serverless (`app/api/`) com persistência em memória — dados podem resetar em cold start.
