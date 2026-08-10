---
id: KSRC-2026-0066
slug: product-design-psychology-de-bres
title: "Product Design Psychology (Wouter de Bres) — Psicologia Comportamental Aplicada a Design de Produto"
source_type: website
origin_url: "https://productdesignpsychology.com/"
origin_owner: "Wouter de Bres — productdesignpsychology.com (40 capítulos em 4 seções)"
license: proprietary-synthesis-only
date_added: 2026-07-03
last_reviewed: 2026-07-03
namespace: methodology
domain: ux,design-psychology,cognitive-bias,behavioral-design,usability,dark-patterns
project: pixel-runtime
agents: ["pixel", "nova", "quill"]
status: proposed
authority: 6
freshness: stable
conflict_policy: merge-with-decision
# Fluxo normativo SOP-27 (§5.7): entrada criada como `proposed` (NÃO `active` direto).
# Promoção proposed → validated → active pendente de validação de evidência (Graves)
# e aprovação (Pixel Runtime/project owner). Registro de proposição abaixo.
promotion:
  lifecycle: "PROPOSED (aguarda VALIDATED → ACTIVE)"
  proposed_status: proposed
  source_origin: "Site público Product Design Psychology, de Wouter de Bres (https://productdesignpsychology.com/) — 40 capítulos em 4 seções: The Designer's Mind, Minding the Design, The User's Mind, The Organization's Mind."
  synthesis_method: "Síntese própria em PT-BR (paráfrase, zero cópia literal), 12 chunks temáticos (3 por seção) produzidos a partir de fetch capítulo a capítulo. Nomes de vieses/leis preservados como âncoras de busca. Sem pasta raw/ por direitos autorais."
  proposed_by: "project owner"
  proposed_at: 2026-07-03
  validation_pending: "Graves valida força da evidência e ausência de cópia literal; Pixel Runtime promove a active conforme SOP-27 após reindex e confirmação de recall via memory:search."
  note: "Adicionado como proposed deliberadamente (correção do desvio identificado na sprint, em que o KSRC-2026-0065 foi criado active direto). Reindex + validação searchMemory registrados no PR."
usage_policy: "Consultar em auditoria de UX/UI: vieses do próprio avaliador, percepção da interface (affordance, carga cognitiva, pico-fim), comportamento real do usuário (hábito, atenção, aversão à perda), e fatores organizacionais que corrompem decisões de design. Complementa [[KSRC-2026-0065]] (produto/valor) com a camada comportamental."
summary: "Síntese própria em português do site Product Design Psychology (Wouter de Bres): design é uma aposta sobre como pessoas pensam, sentem e agem, e a maioria dos erros vem de entender mal as pessoas — não de estética. Cobre quatro planos: (1) os vieses do próprio designer/avaliador (falso consenso, maldição do conhecimento, viés de confirmação, fixação, mera exposição); (2) a interface (impressão em 50ms, Gestalt, affordances vs significantes, Lei de Jakob, carga cognitiva, pico-fim, progresso dotado); (3) o usuário real (jobs-to-be-done, desconto hiperbólico, gap discurso-ação, primazia afetiva, aversão à perda, hábito, banner blindness, cognição cultural, desamparo aprendido); (4) a organização (HiPPO, morte em reunião, redesign como fuga, custo afundado, teatro de métricas, problema mal enquadrado, pesquisa-álibi)."
key_takeaways:
  - "Toda decisão de design é uma aposta sobre comportamento humano; o avaliador precisa primeiro neutralizar os próprios vieses (nunca usar o próprio conforto como evidência; dar peso à reação de primeira exposição)."
  - "A interface é julgada em 50ms e comunica por Gestalt antes da leitura; o que é clicável precisa parecer clicável (significantes, não só affordances); consistência (Lei de Jakob) reduz recalibração."
  - "Cortar só a carga cognitiva estranha (a UI), nunca a intrínseca (a tarefa); preferir reconhecimento a recordação; projetar o último momento primeiro (pico-fim)."
  - "O usuário real diverge do ideal: quer resultado agora (desconto hiperbólico), diz uma coisa e faz outra, resiste a mudança (aversão à perda + hábito), ignora o que grita (banner blindness) e aprende a desistir com falha sem saída."
  - "Boas decisões morrem por dinâmica organizacional (HiPPO, reunião, custo afundado, teatro de métrica, pesquisa-álibi); o auditor nomeia o mecanismo e cobra o problema real por trás do pedido."
risks:
  - "Síntese própria — não substitui a leitura do site original; exemplos e nuances completos estão apenas na fonte."
  - "Fonte é web (autor individual), não obra acadêmica revisada por pares; authority 6 (um degrau abaixo do Cagan/0065). Nomes de leis/vieses citados são de literatura estabelecida, mas as recomendações práticas refletem a curadoria do autor do site."
related_sources:
  - KSRC-2026-0011
  - KSRC-2026-0065
review_trigger: "revisar se o site publicar novos capítulos/edição, ou se o Pixel ganhar visão real de tela (hoje audita código como texto)"
ingestion:
  source_hash: "sha256:23803183f8b38d76f2356064e19ebf5dd6c4b8838a8b5a3a3f97915fdfe5c0af"
  chunks_count: 12
  embedding_model: Xenova/multilingual-e5-small
  embedding_dims: 384
  ingested_at: "2026-07-03T00:00:00.000Z"
  ingester_version: manual-synthesis@1.0.0
---

# Product Design Psychology — Wouter de Bres

Síntese própria, em português, dos conceitos centrais do site *Product Design Psychology* (Wouter de Bres, 40 capítulos em 4 seções). Todos os chunks são paráfrase autoral — nenhum parágrafo do site foi copiado. Por isso esta entrada **não possui pasta `raw/`**: o texto integral é do autor e não é versionado.

A tese central: **design é uma aposta sobre como uma pessoa vai pensar, sentir ou agir**, e a maioria dos erros de design vem de entender mal as pessoas, não de estética ruim. A síntese cobre quatro planos, na ordem em que os vieses aparecem — a mente do designer, a interface, o usuário e a organização — o repertório de psicologia comportamental que o Pixel usa em auditorias de UX (ver `applications/pixel.md`).

Complementa o [[KSRC-2026-0065]] (Cagan/Inspirado, camada de produto e valor) com a camada comportamental que explica *por que* as heurísticas de usabilidade funcionam.
