# 08 — CI/CD, deploy e operação

## Objetivo

Conectar alteração, revisão, teste, publicação, smoke test e recuperação.

## Estude

- [Continuous integration — GitHub Docs](https://docs.github.com/en/actions/get-started/continuous-integration) — 8 min.
- [HTTP response status codes — MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status) — revisão de sinais de saúde e falha.

## Prática

Defina o caminho de uma mudança:

1. branch ou alteração local;
2. revisão;
3. lint, typecheck, testes e build;
4. publicação;
5. smoke test;
6. observação;
7. rollback ou recuperação.

Se o recorte for local, diga exatamente o que não foi provado. Não chame uma build local de CI/CD.

## Concluído quando

Existe uma evidência verificável do pipeline ou uma declaração honesta do limite. Outra pessoa sabe como identificar e recuperar uma publicação quebrada.

