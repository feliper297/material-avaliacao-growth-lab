# Methodology 36 — Visual Perception and Typography

**Use by:** Pixel
**Purpose:** fundamentar decisões visuais em percepção humana, legibilidade, atenção, memória e tipografia aplicada.

---

## 1. Core idea

Usuários não “leem a tela”; primeiro eles escaneiam. A forma como agrupamos, alinhamos, destacamos e tipografamos define o que será percebido como importante, relacionado, clicável, seguro ou perigoso.

Pixel deve usar percepção e tipografia como critério de produto, não como gosto pessoal.

---

## 2. Perception principles Pixel must apply

### Proximity

Itens próximos são percebidos como relacionados. Usar spacing para criar grupos claros.

### Similarity

Itens parecidos parecem ter a mesma função. Não estilizar ação destrutiva igual a ação comum.

### Uniform connectedness

Elementos dentro da mesma borda/card/surface parecem um grupo. Usar cards e containers com intenção.

### Figure-ground

O usuário deve conseguir distinguir foco e fundo. Evitar baixo contraste e excesso de superfícies competindo.

### Signal-to-noise ratio

Reduzir ruído visual. Cada borda, sombra, ícone e cor precisa servir informação.

### Hierarchy

Tamanho, peso, contraste, cor, posição e espaçamento criam ordem de leitura.

### Recognition over recall

Preferir labels, ícones com texto, estados explícitos e padrões conhecidos a exigir memória.

### Progressive disclosure

Mostrar o necessário agora; esconder detalhe avançado sem bloquear descoberta.

---

## 3. Cognitive checks

Pixel deve perguntar:

- O usuário precisa lembrar informação de outra tela?
- Há mais opções simultâneas do que o necessário?
- O caminho primário está visível?
- O status do sistema está claro?
- A decisão segura é fácil?
- O erro é prevenido antes de acontecer?
- O usuário consegue se recuperar?

---

## 4. Typography applied to UI

Tipografia deve ser tratada como hierarquia funcional.

### Type scale

Definir papéis:

```text
display / page title / section title / body / label / caption / metadata / mono
```

Não criar tamanho novo sem necessidade.

### Weight

- Peso alto para título ou dado principal.
- Peso médio para labels e CTAs.
- Peso normal para corpo.
- Muted para metadata, não para dado crítico.

### Line height

- Corpo precisa de line-height confortável.
- Labels e badges podem ser mais compactos.
- Logs/código precisam preservar legibilidade técnica.

### Line length

- Texto explicativo longo deve ter largura controlada.
- Painel técnico pode ter densidade, mas não deve virar bloco ilegível.

### Alignment

- Esquerda para leitura operacional.
- Centro apenas para empty states, marketing/landing ou componentes curtos.
- Números/dados tabulares precisam de alinhamento que facilite comparação.

### Casing and letter spacing

- Uppercase só para labels curtos.
- Letter spacing leve em uppercase; evitar em texto comum.
- Não gritar com usuário em estados de erro.

---

## 5. Color and perception

Checks:

- Vermelho só para erro/perigo, não decoração.
- Amarelo/laranja para atenção, não status normal.
- Verde para sucesso/ok, com texto complementar.
- Cinza/muted não deve esconder informação que exige decisão.
- Contraste mínimo deve ser validado em texto e controles.
- Considerar daltonismo: estado não pode depender só de hue.

---

## 6. Legibility vs readability

- **Legibility:** consigo distinguir letras/símbolos?
- **Readability:** consigo ler e entender o bloco rapidamente?

Pixel deve bloquear/alertar quando:

- texto pequeno demais para contexto;
- contraste baixo;
- line-height apertado;
- excesso de uppercase;
- parágrafos muito largos;
- ícones sem label quando reconhecimento não é óbvio.

---

## 7. Spec output required

```markdown
## Perception and Typography
- Ordem visual esperada:
- Grupo visual principal:
- Elementos a de-emphasize:
- Type scale usada:
- Line-height/largura de texto:
- Risco de ruído visual:
- Como reduzir recall e aumentar recognition:
```

---

## 8. Review issue IDs

```text
PX-PERCEPTION-GROUPING-###
PX-PERCEPTION-HIERARCHY-###
PX-PERCEPTION-NOISE-###
PX-TYPE-SCALE-###
PX-TYPE-READABILITY-###
PX-COLOR-PERCEPTION-###
```

---

## 9. Source

Síntese conceitual de *Designing with the Mind in Mind* (Jeff Johnson), *Thinking with Type* (Ellen Lupton) e *Universal Principles of Design / UX*. Não reproduz trechos dos livros; converte princípios de percepção (Gestalt, figure-ground, signal-to-noise) e tipografia aplicada em checks operacionais para o Pixel. Ver `docs/agent-skills/00-source-inventory.md`.
