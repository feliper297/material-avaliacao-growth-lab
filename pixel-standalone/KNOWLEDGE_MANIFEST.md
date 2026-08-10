# Pixel Brain Manifest

Este manifesto descreve o conhecimento que o exportador tenta incluir no pacote standalone.
A lista exata de arquivos copiados e gerada em `pixel-package-manifest.md` dentro do zip.

## Core

- `.claude/skills/pixel-core/SKILL.md`: motor de 3 lentes, regra de ver a tela real, RAG e citacao.
- `.claude/skills/pixel/SKILL.md`: Pixel normal.
- `.claude/skills/pixel-monster/SKILL.md`: Pixel com auditoria dupla, adaptado no export para Opus
  + GPT-5.6 quando disponiveis.
- `.claude/skills/pixel-test/SKILL.md`: teste real no browser.
- `.claude/skills/pixel-audit/SKILL.md`: alias comportamental.

## Taste profile e rubricas

- `docs/experience/pixel-taste-profile.md`
- `docs/experience/pixel-visual-review-rubric.md`
- `docs/experience/pixel-domain-aware-review-rubric.md`
- `docs/experience/pixel-visual-qa-checklist.md`
- `docs/experience/pixel-brief-template.md`
- `docs/experience/pixel-context-acquisition-modes.md`
- `docs/experience/pixel-code-inferred-context-guide.md`
- `docs/experience/pixel-clarifying-questions.md`
- `docs/experience/pixel-behavioral-psychology-layer.md`

## Persona Pixel-rian

- `docs/agent-skills/agents/pixel-rian.md`
- `docs/memory/methodology/KSRC-2026-0041-enviesados-rian-dutra/source.md`
- `docs/memory/methodology/KSRC-2026-0041-enviesados-rian-dutra/source-manifest.json`
- `docs/memory/methodology/KSRC-2026-0041-enviesados-rian-dutra/applications/pixel.md`
- `docs/memory/methodology/KSRC-2026-0041-enviesados-rian-dutra/chunks/*.md`, se presentes.

## Materiais de UX/produto usados pelo Pixel

O exportador inclui `source.md`, `source-manifest.json` e `applications/pixel.md` de fontes com
aplicacao Pixel quando existem:

- Nielsen 10 heuristics;
- O Paradoxo da Escolha;
- Atomic Design;
- UX Design / Casa do Codigo;
- Inspired / Marty Cagan;
- Usability Engineering;
- Hooked;
- Don't Make Me Think;
- Heuristic Evaluation Workbook;
- Octalysis / gamification, se marcado para Pixel;
- Kano Model, se marcado para Pixel;
- Product Design Psychology;
- outras fontes `docs/memory/methodology/*/applications/pixel.md` detectadas no repo.

## Hooks

- `scripts/runtime-assistant-hooks/pixel-visual-ask.sh`
- `scripts/runtime-assistant-hooks/secret-scan-gate.sh`

No zip eles ficam em `hooks/`, sem depender do runtime original.

## Sanitizacao

O exportador substitui:

- nome pessoal do proprietario por `project owner`;
- email pessoal por `<EMAIL>`;
- paths locais por `<LOCAL_PROJECT_PATH>`;
- paths/hosts de servidor por `<REMOTE_PROJECT_PATH>` e `<HOST>`;
- tokens por placeholders;
- referencias ao roteador interno por `model router`;
- referencias ao runtime original por `Pixel Runtime`.

Depois de gerar o zip, rode a verificacao indicada pelo script antes de compartilhar.
