# 01 — limites de arquitetura

## Objetivo

Entender que arquitetura é distribuição de responsabilidades, contratos e consequências — não quantidade de pastas ou serviços.

## Estude

- [Client-server overview — MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/First_steps/Client-Server_overview) — leitura seletiva, 15 min.
- [How Does The Internet Work? — Cloudflare Developers](https://www.youtube.com/watch?v=hHAJeD1Vc1A) — vídeo curto, 6 min.

## Prática

Desenhe o caminho de uma ação do Growth Lab: usuário salva uma evidência, a interface envia a requisição, uma camada valida, o domínio decide, os dados são persistidos e o resultado volta para a tela.

Para cada etapa, escreva:

- responsabilidade;
- entrada e saída;
- falha possível;
- teste que provaria o comportamento.

## Concluído quando

Você consegue explicar o fluxo sem usar “backend” ou “API” como caixa-preta e consegue apontar onde uma falha seria observada.

