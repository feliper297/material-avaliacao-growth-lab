# Pixel Brain — Índice

Brain local do Pixel para este projeto (`material-avaliacao-growth-lab-master`). Copiado de
`pixel-standalone/docs/` em 2026-08-09 durante a instalação (ver `pixel-standalone/pixel-package-manifest.md`
para a lista original completa gerada pelo exportador).

Regra de citação: um achado só é `[CONFIRMED]` quando uma das fontes abaixo foi lida nesta sessão e
citada como `[[caminho/relativo/arquivo.md]] — "trecho"`. Sem fonte lida = `[HYPOTHESIS]`.

## Taste profile e rubricas (lente Visual)

- `experience/pixel-taste-profile.md` — gosto visual do **Pixel Runtime Panel** (produto de origem
  do pacote). Este projeto (Growth Lab) ainda não tem taste-profile próprio — usar este como
  baseline e **registrar a lacuna** em todo achado que dependa dele (ver regra em
  `.claude/skills/pixel-core/SKILL.md`).
- `experience/pixel-visual-review-rubric.md` — rubrica /90, 18 critérios (hierarquia, contraste,
  tipografia, acessibilidade, etc.). As notas "Pixel Runtime hoje: X/5" no arquivo são exemplos do
  produto de origem — não aplicáveis a este projeto sem reavaliação.
- `experience/pixel-domain-aware-review-rubric.md`
- `experience/pixel-visual-qa-checklist.md`

## Lente Comportamental

- `agent-skills/methodologies/14-nielsen-heuristics.md` — 10 heurísticas de Nielsen
- `agent-skills/methodologies/04-wcag.md` — WCAG 2.1 AA
- `agent-skills/methodologies/15-cognitive-load.md`
- `agent-skills/methodologies/20-dont-make-me-think.md`
- `agent-skills/methodologies/21-hooked-ethical-behavior.md`
- `agent-skills/methodologies/29-behavioral-psychology.md`
- `experience/pixel-behavioral-psychology-layer.md`
- `agent-skills/agents/pixel-rian.md` + `memory/methodology/KSRC-2026-0041-enviesados-rian-dutra/`
  (persona de viés cognitivo — livro *Enviesados*, Rian Dutra; `source.md` + `chunks/` + `applications/pixel.md`)

## Lente Criação/Direção

- `agent-skills/methodologies/03-atomic-design.md`
- `agent-skills/methodologies/22-inspired.md` (Marty Cagan)
- `memory/methodology/KSRC-2026-0065-inspired-cagan-product-discovery/`
- `memory/methodology/KSRC-2026-0019-atomic-design/`

## Craft visual

- `agent-skills/methodologies/33-refactoring-ui-visual-craft.md`
- `agent-skills/methodologies/36-visual-perception-typography.md`

## Outras fontes por KSRC (livro completo + aplicação Pixel)

Ver `memory/methodology/<KSRC-id>/source.md` (+ `chunks/` quando o livro foi fatiado) e
`memory/methodology/<KSRC-id>/applications/pixel.md` (leitura já filtrada para o Pixel). Lista
completa de KSRCs incluídos: ver `pixel-standalone/pixel-package-manifest.md`.

## Como buscar

Não há RAG/embeddings neste ambiente. Busca é por `Grep`/`Glob` direto nesta pasta, ex.:

```
Grep "contraste" .pixel-brain/experience .pixel-brain/agent-skills -r
```
