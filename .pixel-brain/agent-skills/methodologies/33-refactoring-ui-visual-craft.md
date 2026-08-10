# Methodology 33 — Refactoring UI / Visual Craft

**Use by:** Pixel
**Purpose:** transformar princípios de polimento visual em checks e prescrições aplicáveis para interfaces do Pixel Runtime.

---

## 1. Core idea

A interface boa não nasce de decoração; ela nasce de decisões pequenas e consistentes sobre hierarquia, spacing, tipografia, cor, borda, radius, sombra, profundidade e estados.

Pixel deve usar esta metodologia para sair de “UI funcional” para “UI deliberada”.

---

## 2. Hierarchy is everything

Pixel deve procurar a hierarquia antes de falar de layout.

Checklist:

- Existe uma ação primária clara?
- A ação primária tem mais peso visual que a secundária?
- Dados principais têm mais contraste/tamanho/peso que metadados?
- Títulos de seção não roubam atenção do conteúdo principal?
- Labels são usados apenas quando necessários; quando o valor se explica sozinho, reduzir peso visual do label.
- Semântica HTML não deve prender o estilo visual: `h1` pode ser visualmente discreto se a ação principal é o foco.

Aplicação em Spec:

```markdown
A informação primária é X; use peso/tamanho/contraste maior. Metadados Y/Z devem ficar em muted/caption. CTA primário deve dominar; ações secundárias devem ser outline/ghost/link.
```

Aplicação em Review:

```text
PX-VISUAL-HIERARCHY: CTA secundário compete com primário. Reduzir contraste/peso do secundário e aumentar dominância do primário.
```

---

## 3. Spacing system

Pixel deve rejeitar spacing arbitrário.

Regras:

- Usar escala definida em DESIGN.md/design tokens.
- Espaço interno de um grupo deve ser menor que o espaço entre grupos.
- Evitar spacing ambíguo, especialmente em forms e listas.
- Começar com mais respiro e reduzir quando a densidade operacional exigir.
- Não preencher tela só porque há espaço disponível.

Escala recomendada se DESIGN.md não especificar:

```text
4, 8, 12, 16, 20, 24, 32, 40, 48
```

Para Pixel Runtime, que é ferramenta operacional, densidade pode ser alta, mas deve preservar agrupamento e scanning.

---

## 4. Typography

Pixel deve tratar tipografia como sistema de leitura, não como decoração.

Checks:

- Existe escala tipográfica clara?
- Título, corpo, label e metadata têm pesos/tamanhos diferentes?
- Texto longo não ultrapassa largura confortável.
- Line-height é proporcional ao tamanho.
- IDs, hashes, paths, comandos e logs usam monospace.
- Letter spacing só entra para uppercase/labels curtos, não para corpo.
- Alinhamento favorece leitura; evitar centralizar textos operacionais longos.

---

## 5. Color

Pixel deve usar cor com função.

Regras:

- Cor primária guia ação.
- Cores semânticas comunicam estado: sucesso, alerta, erro, andamento, pendente.
- Brand colors não devem virar cores de estado.
- Nunca depender só de cor para status: sempre parear com texto, ícone ou label.
- Acessível não significa feio: ajustar contraste, peso e saturação sem destruir estética.
- Preferir escalas/shades definidas a hex solto.

---

## 6. Surface, border, radius, shadow and depth

Pixel deve entender superfície como linguagem.

Checks:

- Background, panel, card, inset e raised têm papéis diferentes?
- Card tem borda/sombra/radius coerentes com o DS?
- Shadow comunica elevação real ou é decoração?
- Border resolve separação sem criar ruído?
- Radius é consistente por tipo de componente?
- Elementos sobrepostos têm lógica de camada.

Regra prática:

- `border` sutil para estrutura estática;
- `shadow` leve para elementos elevados/interativos;
- `inset` para áreas de código/log/dados técnicos;
- `raised` para popover/dropdown/modal.

---

## 7. Common visual smells

Pixel deve sinalizar warning quando encontrar:

- tudo tem o mesmo peso visual;
- CTA primário parece link comum;
- label mais forte que valor;
- cards grudados ou separados demais;
- padding interno inconsistente;
- radius diferente sem motivo;
- sombra pesada em layout denso;
- cor usada para decorar, não comunicar;
- empty state sem orientação;
- loading que muda layout final;
- erro mostrado como texto genérico sem ação.

---

## 8. Review issue IDs

Usar prefixos:

```text
PX-VISUAL-HIERARCHY-###
PX-VISUAL-SPACING-###
PX-VISUAL-TYPOGRAPHY-###
PX-VISUAL-COLOR-###
PX-VISUAL-SURFACE-###
PX-VISUAL-STATE-###
```

---

## 9. Done criteria

Pixel só considera visual craft aceitável quando:

- usuário entende a tela em até 3 segundos;
- ação principal é inequívoca;
- agrupamento visual é claro;
- tokens são usados ou lacuna é documentada;
- estados essenciais foram desenhados;
- a tela parece produto, não CRUD cru.

---

## 10. Source

Síntese conceitual de *Refactoring UI* (Adam Wathan & Steve Schoger). Não reproduz trechos do livro; converte princípios de visual craft em checks operacionais para o Pixel. Ver `docs/agent-skills/00-source-inventory.md`.
