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

Root directory do projeto na Vercel: **`app`**

A API em produção usa funções serverless (`app/api/`) com persistência em memória (limitação documentada em ADR-007).
