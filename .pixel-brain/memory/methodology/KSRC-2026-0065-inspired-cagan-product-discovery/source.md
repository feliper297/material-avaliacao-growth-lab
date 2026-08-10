---
id: KSRC-2026-0065
slug: inspired-cagan-product-discovery
title: "Inspirado (Inspired) — Marty Cagan — Discovery de Produto e Times Empoderados"
source_type: book
origin_url: null
origin_owner: "Marty Cagan (SVPG) — ed. brasileira Alta Books, ISBN 9788550816159"
license: proprietary-synthesis-only
date_added: 2026-07-01
last_reviewed: 2026-07-01
namespace: methodology
domain: product,discovery,product-management,okr,prototyping,team-topology
project: pixel-runtime
agents: ["pixel", "quill", "scout", "atlas"]
status: active
authority: 7
freshness: stable
conflict_policy: merge-with-decision
# Registro de promoção (SOP-27 / §5.7). Regularização retroativa: a entrada foi
# criada direto como `active` na sprint, pulando o fluxo normativo
# PROPOSED → VALIDATED → ACTIVE. Mantida `active` (conteúdo já em produção; fonte
# pública consolidada — reverter não traria ganho), com o registro de promoção
# formalizado a posteriori na revisão de processo da sprint.
promotion:
  regularized_retroactively: true
  final_status: active
  lifecycle: "PROPOSED → VALIDATED → ACTIVE (formalizado a posteriori)"
  source_origin: "Livro público — Marty Cagan, \"Inspired: How to Create Tech Products Customers Love\" (2ª ed.; ed. brasileira \"Inspirado\", Alta Books, ISBN 9788550816159)."
  validation_evidence: "Obra de referência amplamente citada em product management (Silicon Valley Product Group / SVPG); base canônica de discovery contínuo e times empoderados, adotada como leitura de referência na indústria. Síntese própria em PT-BR (sem cópia literal), 12 chunks, hash versionado."
  approval: "Aprovação expressa de project owner Girardi em sessão interativa supervisionada; decisão registrada nesta task de revisão de processo."
  promoted_by: "project owner"
  promoted_at: 2026-07-02
  validity: "stable — sem prazo de expiração; revisar no review_trigger (nova edição de Cagan ou novas tools de review do Pixel)."
  deprecation: "n/a — supersede/deprecar somente se surgir síntese consolidada de Empowered/Transformed que cubra o mesmo escopo."
  note: "Registro identificado na revisão de processo da sprint (entrada tinha sido criada direto como active, sem o fluxo PROPOSED→VALIDATED→ACTIVE de SOP-27). Regularização documental — não altera o conteúdo dos chunks."
usage_policy: "Consultar em decisões de produto/UX: priorização, auditoria de valor vs output, planejamento de discovery, estrutura de times. Ignorar para detalhes de implementação técnica."
summary: "Síntese própria em português da 2ª edição de Inspired (Marty Cagan): por que a maioria das iniciativas de produto fracassa (cascata disfarçada de Agile, roadmap como compromisso), e como as melhores empresas operam — times empoderados de missionários, discovery contínuo em paralelo à entrega, os 4 riscos (valor, usabilidade, viabilidade técnica, viabilidade de negócio) atacados ANTES de construir, protótipos como ferramenta de aprendizado, visão de produto no lugar de roadmap, OKRs focados em resultado e não em entrega."
key_takeaways:
  - "Pelo menos metade das ideias de produto não funciona; as que funcionam exigem várias iterações — discovery existe para descobrir isso barato, antes da entrega."
  - "4 riscos a endereçar antes de construir: valor, usabilidade, viabilidade técnica, viabilidade de negócio (+ ética como pergunta adicional: devemos construir?)."
  - "Protótipo ≠ produto: MVP deveria ser um protótipo; times fortes testam 10-20 iterações de discovery por semana."
  - "Roadmap tradicional vira compromisso implícito; a alternativa é visão de produto + OKRs de time focados em resultado de negócio, não em output."
  - "Times empoderados (missionários) recebem problemas para resolver; feature teams (mercenários) recebem soluções para implementar."
risks:
  - "Síntese própria — não substitui a leitura do livro; nuances e exemplos completos estão apenas na obra original."
  - "Contexto do livro é empresa de produto com PM dedicado; adaptar com julgamento para agentes/projetos solo do project owner."
related_sources:
  - KSRC-2026-0022
  - KSRC-2026-0027
  - KSRC-2026-0028
  - KSRC-2026-0049
review_trigger: "revisar se Cagan publicar edição nova (Empowered/Transformed já cobrem partes) ou se o Pixel ganhar novas tools de review"
ingestion:
  source_hash: "sha256:42a310ae12dfda61b09f8afa56169fc3adedd88e550fcb1a09976c58743db835"
  chunks_count: 12
  embedding_model: Xenova/multilingual-e5-small
  embedding_dims: 384
  ingested_at: "2026-07-01T00:00:00.000Z"
  ingester_version: manual-synthesis@1.0.0
---

# Inspirado (Inspired) — Marty Cagan

Síntese própria, em português, dos conceitos centrais da 2ª edição de *Inspired: How to Create Tech Products Customers Love* (ed. brasileira: *Inspirado*). Todos os chunks são paráfrase autoral — nenhum parágrafo do livro foi copiado. Por isso esta entrada **não possui pasta `raw/`**: o texto integral da obra é protegido por direitos autorais e não é versionado.

Foco da síntese: discovery contínuo, os 4 riscos de produto, protótipos como ferramenta de aprendizado, times empoderados, visão de produto vs roadmap, OKRs orientados a resultado, topologia de times e cultura de inovação — o repertório que o Pixel usa em auditorias de UX/produto (ver `applications/pixel.md`).
