# 02 — BFF e contratos

## Objetivo

Decidir se um Backend for Frontend é necessário, qual adaptação pertence a ele e qual regra deve permanecer no domínio.

## Estude

- [Backends for Frontends — Microsoft Learn](https://learn.microsoft.com/en-us/azure/architecture/patterns/backends-for-frontends) — 10 min.

## Prática

Escolha uma tela do Growth Lab e desenhe o contrato que ela precisa. Compare três opções:

1. front-end chamando diretamente o domínio;
2. front-end chamando um BFF;
3. front-end usando uma camada de dados local no MVP.

Explique o custo, o benefício e o risco de cada alternativa.

## Concluído quando

O BFF tem uma responsabilidade concreta, contrato testável e motivo de existir. Se não for necessário, a decisão de não criá-lo também está documentada.

