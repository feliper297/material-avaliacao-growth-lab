# Pixel Standalone Export

Este diretorio define como gerar um zip instalavel do Pixel para um colaborador externo.
O zip nao e uma copia crua do repo: ele e montado por `scripts/export-pixel-standalone.sh`,
com sanitizacao de paths, hosts, tokens, dados de infra e termos internos.

## Objetivo

Entregar um Pixel portavel para Claude, Cursor ou outra ferramenta com suporte a skills/prompts:

- skills `pixel`, `pixel-core`, `pixel-test`, `pixel-audit`, `pixel-monster`;
- brain de UX/design/produto autorizado para o Pixel;
- taste profile como criterio central de julgamento visual;
- materiais do Pixel-rian e `Enviesados` quando presentes no repo;
- hooks de seguranca e lembrete visual/background;
- tutorial leigo no estilo Notion;
- prompt pronto para instalar no ambiente do colaborador.

## Como gerar

```bash
bash scripts/export-pixel-standalone.sh
```

Saida padrao:

```text
dist/pixel-standalone/pixel-standalone.zip
```

O script cria tambem uma pasta expandida em `dist/pixel-standalone/package/` para inspecao antes
de enviar.

## O que entra

- `.claude/skills/pixel*/SKILL.md` sanitizados.
- `.claude/agents/pixel.md` sanitizado, quando existir.
- `docs/agent-skills/agents/pixel*.md`.
- `docs/experience/pixel-*.md` essenciais: taste profile, rubricas, checklist visual, brief,
  psicologia comportamental, aquisicao de contexto.
- `docs/memory/methodology/*/source.md`, `source-manifest.json` e `applications/pixel.md` para
  fontes com uso Pixel.
- chunks de `KSRC-2026-0041-enviesados-rian-dutra`, quando presentes, porque a persona Pixel-rian
  depende desse material.
- hooks standalone: `pixel-visual-ask.sh` e `secret-scan-gate.sh`.
- tutorial, prompt de instalacao e manifesto de conhecimento.

## O que nao entra

- `.env`, `.env.*`, tokens, chaves, auth, cookies, sessoes e secrets.
- `node_modules`, `dist`, `coverage`, `.git`.
- dados de server, hosts privados, paths locais, emails pessoais e nomes pessoais.
- documentos operacionais de sprint, Notion, cards internos, environment policys privadas e material de
  orquestracao interna que nao faz parte do Pixel standalone.

## Modelo do Pixel Monster

No pacote standalone, Pixel Monster deve ser configurado assim:

- auditor principal: Opus, se disponivel no ambiente do colaborador;
- auditor secundario/upgrade: GPT-5.6, se disponivel;
- se so um existir, rodar single com aviso honesto;
- se nenhum existir, pedir ao colaborador para mapear modelos equivalentes antes de auditar.

Nenhum provider, token ou rota e hardcoded no pacote. O instalador pergunta tudo no destino.
