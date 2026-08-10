# Pixel: guia de instalacao e uso

## O que e o Pixel

Pixel e um agente de auditoria e direcao de experiencia de produto. Ele olha uma tela ou fluxo como
usuario real, junta evidencias visuais, usa um brain de UX/design/produto e devolve achados
acionaveis.

Pixel nao e "um designer que da opiniao". Ele funciona por contrato:

1. escolhe a lente certa;
2. ve a tela real quando houver browser;
3. consulta o brain;
4. julga com rubrica;
5. separa fato confirmado de hipotese;
6. entrega recomendacao etica e concreta.

## Recursos principais

- Auditoria comportamental: usabilidade, vieses, Nielsen, WCAG, carga cognitiva e dark patterns.
- Auditoria visual: hierarquia, espaco, tipografia, contraste, tokens, acabamento e taste profile.
- Criacao/direcao: orienta como uma tela deveria ser antes de alguem implementar.
- Pixel-test: teste real de fluxo no browser.
- Pixel Monster: auditoria mais rigorosa com dois modelos quando disponiveis.
- Brain local: fontes e materiais usados como criterio, nao memoria solta.
- Hooks: pequenas travas/lembretes que impedem erro operacional.

## As 3 lentes

### 1. Comportamental

Use quando a pergunta for sobre clareza, decisao, conversao, friccao, acessibilidade, vieses ou
dark patterns.

Fontes tipicas:

- Nielsen 10;
- WCAG 2.1 AA;
- cognitive load;
- `Enviesados` / Pixel-rian;
- psicologia comportamental;
- product discovery quando o risco e construir algo que ninguem precisa.

### 2. Visual

Use quando a pergunta for sobre beleza, acabamento, hierarquia visual, tipografia, espacamento,
tokens, cor, contraste, consistencia ou Storybook.

Fontes tipicas:

- taste profile;
- visual review rubric;
- Refactoring UI;
- design tokens;
- guias visuais do projeto.

### 3. Criacao / Direcao

Use quando a tela ainda vai ser criada, redesenhada ou reorganizada.

Fontes tipicas:

- Atomic Design;
- Inspired / discovery de produto;
- JTBD;
- UX spec;
- storybook direction.

## Skills instaladas

### `/pixel`

Pixel normal. Usa uma rota/modelo principal configurado no ambiente. Serve para auditorias do dia a
dia.

### `/pixel-monster`

Pixel rigoroso. Deve tentar rodar dois auditores:

- Opus, se disponivel;
- GPT-5.6, se disponivel.

Se so um modelo existir, o relatorio precisa dizer que rodou em modo single. Se nenhum existir,
pergunte qual modelo equivalente usar.

### `/pixel-test`

Fluxo de teste real. Antes de abrir browser, sempre pergunta:

```text
Quer assistir o teste ao vivo (modo visual - screenshots em tempo real) ou posso rodar em background e te entregar o relatorio no final?
```

### `/pixel-audit`

Atalho para `/pixel` com lente comportamental.

### `pixel-core`

Contrato base. Nao e chamado direto. As outras skills leem esse arquivo para manter o mesmo motor.

## Hooks

Hooks sao scripts pequenos executados pela ferramenta antes ou durante a conversa.

### `pixel-visual-ask.sh`

Detecta pedido de Pixel com teste/browser/tela e injeta o lembrete para perguntar modo
visual/background antes de navegar.

### `secret-scan-gate.sh`

Bloqueia escrita de tokens reais, chaves e secrets em arquivos ou docs.

## Brain

O brain e a pasta de conhecimento do Pixel. Ele deve ficar local no ambiente do colaborador. O Pixel
usa esse material por citacao: um achado so e `[CONFIRMED]` quando a fonte foi lida e citada.

### Conhecimento incluido no pacote

Veja `pixel-package-manifest.md` para a lista completa gerada pelo exportador. Os blocos principais
sao:

- Taste profile;
- rubrica visual;
- psicologia comportamental;
- Pixel-rian / Enviesados;
- Nielsen;
- WCAG;
- Atomic Design;
- Inspired / product discovery;
- Don't Make Me Think;
- Paradox of Choice;
- Hooked / comportamento etico;
- materiais de contexto visual e QA.

## Como usar no dia a dia

Exemplos:

```text
/pixel visual audit esta tela e diga se ela esta no taste profile
```

```text
/pixel comportamental teste o fluxo de cadastro em background
```

```text
/pixel-monster visual audite esta tela critica com Opus + GPT-5.6 se disponivel
```

```text
/pixel criacao quero redesenhar esta tela: primeiro veja o estado atual e depois proponha direcao
```

## Formato de resposta esperado

```markdown
**Pixel - Visual - <tela/feature>**

**Lente:** Visual
**Plano de teste:** ...
**Evidencias:** screenshot, DOM, medicoes, fingerprint

**Achados/Direcao:**
- criterio:
- evidencia:
- fonte do brain:
- severidade:
- recomendacao:
- status: [CONFIRMED] ou [HYPOTHESIS]

**Proximos passos:** ...
```

## Regras de seguranca

- Nao cole tokens no chat.
- Nao salve secrets no brain.
- Nao rode testes com dados reais de usuarios sem autorizacao.
- Nao marque achado como confirmado sem fonte.
- Nao use vies cognitivo para manipular usuario; use para reduzir confusao e proteger decisao.
- Nao implemente codigo dentro do Pixel; Pixel audita e dirige.
