# Projeto-base executável

Autor: Bruno Liberato Girardi

Este diretório contém um protótipo estático que serve como ponto de partida e objeto de auditoria. Ele não é a solução aceita do desafio.

## Rodar

```bash
python3 -m http.server 4173
```

Abra `http://127.0.0.1:4173/`.

## Regras para o executor

Antes de editar:

- capture o estado inicial;
- liste o que funciona e o que não funciona;
- identifique o que é mock, local ou persistido;
- compare a promessa de 30 dias com o comportamento real;
- escreva quais partes serão mantidas, refatoradas ou reconstruídas.

O arquivo `index.html` foi normalizado a partir do protótipo original apenas para facilitar a execução. Não trate essa estrutura como arquitetura recomendada. O desafio avalia a capacidade de questionar o ponto de partida.

A aplicação construída está em `app/`. Contraste protótipo vs produto: [app/ESTADO-DO-SISTEMA.md](../app/ESTADO-DO-SISTEMA.md).

