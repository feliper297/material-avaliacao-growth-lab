# Guia do executor — estudos, entregas e avanço esperado

Autor: Bruno Liberato Girardi

## Como funciona

O Growth Lab é um onboarding técnico e profissional que se constrói enquanto é usado. Em cada semana, o executor deve:

1. estudar dois conteúdos obrigatórios e um conteúdo variável;
2. conversar com a IA e testar o entendimento;
3. aplicar o conceito em uma decisão ou demanda real;
4. construir ou melhorar o sistema;
5. registrar evidência;
6. receber feedback;
7. transformar o feedback em próxima ação.

Conteúdo consumido sem aplicação não é evolução. Código produzido sem entendimento, teste e evidência também não.

## Como marcar avanço

- `[ ]` não iniciado;
- `[~]` em andamento;
- `[x]` atingiu com evidência;
- `[!]` parcial ou bloqueado;
- `[→]` adiado conscientemente.

Toda marcação `[x]` precisa ter um link para código, teste, decisão, vídeo, preview ou registro.

---

## Fase 1 — Semana 1

### Tema

Clareza do problema, arquitetura e sistema mínimo auditável.

### Estude

#### Obrigatório 1 — Client-server e fluxo de dados

[Client-server overview — MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/First_steps/Client-Server_overview)

Aprenda a explicar cliente, servidor, request, response e onde uma falha pode aparecer.

Prática: desenhe o caminho de “registrar uma evidência” desde o clique até o retorno visual.

#### Obrigatório 2 — BFF e contratos

[Backends for Frontends — Microsoft Learn](https://learn.microsoft.com/en-us/azure/architecture/patterns/backends-for-frontends)

Aprenda quando o BFF adapta a API para uma experiência específica e por que ele não deve virar um segundo back-end com todas as regras de negócio.

Prática: compare front-end chamando domínio, front-end chamando BFF e MVP local sem BFF.

#### Variável — Design system e Storybook

[Why Storybook](https://storybook.js.org/docs/get-started/why-storybook)

Use se a primeira fatia depender de componentes, estados e documentação visual.

### Faça

- [ ] Rode o projeto-base e registre o estado inicial.
- [ ] Defina usuário, problema, objetivo âncora e escopo IN/OUT.
- [ ] Crie baseline com critérios observáveis.
- [ ] Decida front-end, BFF, back-end, banco, agentes e hospedagem.
- [ ] Modele ciclo, critério, evidência, check-in, feedback e avaliação.
- [ ] Construa o walking skeleton do sistema.
- [ ] Inclua tutor inicial com perguntas guiadas.
- [ ] Peça uma auditoria visual do Pixel quando houver preview.

### Avanço esperado

Ao final da semana, você consegue explicar em cinco minutos:

- qual problema está resolvendo;
- o que ficou fora do escopo;
- por que cada camada existe;
- como uma evidência vira dado e feedback;
- o que já funciona e o que ainda é mock ou hipótese.

### Atingiu?

- [ ] Sim: sistema mínimo permite ciclo, baseline, próxima ação, estudo, evidência, check-in, nota, feedback e histórico.
- [ ] Parcial: há fluxo navegável, mas existe bloqueio documentado em um ponto.
- [ ] Não: há apenas documentação, telas ou intenção sem fluxo auditável.

### Feedback da semana

- Evidência conferida:
- Ponto forte:
- Correção prioritária:
- Próxima ação:
- Critério de aceite:

---

## Fase 2 — Semana 2

### Tema

Dados, persistência, jornadas e comportamento confiável.

### Estude

#### Obrigatório 1 — HTTP e estados de resposta

[HTTP response status codes — MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status)

Aprenda a diferenciar sucesso, validação, conflito, erro do cliente e erro do servidor.

Prática: associe cada falha do sistema a uma resposta, mensagem e recuperação adequadas.

#### Obrigatório 2 — Testes de UI

[How to test UIs with Storybook](https://storybook.js.org/docs/writing-tests)

Aprenda a testar componentes isolados, interação, acessibilidade e regressões visuais.

Prática: teste um componente nos estados vazio, loading, sucesso e erro.

#### Variável — Visibilidade do estado

[Visibility of System Status — NN/g](https://www.nngroup.com/articles/visibility-system-status/)

Use para revisar feedback, salvamento, carregamento e confiança.

### Faça

- [ ] Revisite o feedback da Semana 1.
- [ ] Diferencie baseline, check-in semanal e avaliação final no modelo de dados.
- [ ] Siga um dado desde a interface até a persistência e o retorno.
- [ ] Preserve histórico após recarregar.
- [ ] Trate dado vazio, rede indisponível, salvamento interrompido e conflito.
- [ ] Teste as jornadas de primeiro uso, evidência e feedback.
- [ ] Mostre no painel o que mudou desde a Semana 1.

### Avanço esperado

Você consegue explicar o ciclo completo de um dado e demonstrar o que acontece quando uma dependência falha. O sistema não confunde conteúdo visto com evolução.

### Atingiu?

- [ ] Sim: persistência, histórico, estados e jornada principal estão comprovados.
- [ ] Parcial: fluxo funciona, mas existe falha conhecida com recuperação registrada.
- [ ] Não: o sistema perde dados, não possui estados ou não permite reproduzir a jornada.

### Feedback da semana

- Evidência conferida:
- Ponto forte:
- Correção prioritária:
- Próxima ação:
- Critério de aceite:

---

## Fase 3 — Semana 3

### Tema

IA, vibecoding, agentes, guardrails e correção baseada em evidência.

### Estude

#### Obrigatório 1 — Agentes

[Agents — OpenAI Agents SDK](https://openai.github.io/openai-agents-python/agents/)

Aprenda a diferenciar agente, instruções, ferramenta, handoff, sessão, saída estruturada e intervenção humana.

Prática: escreva a especificação do tutor do Growth Lab e defina o que ele pode e não pode fazer.

#### Obrigatório 2 — Guardrails

[Guardrails — OpenAI Agents SDK](https://openai.github.io/openai-agents-js/guides/guardrails/)

Aprenda a validar entradas, saídas e uso de ferramentas antes de aceitar uma ação.

Prática: crie um caso em que o tutor deve recusar, pedir confirmação ou marcar uma hipótese.

#### Variável — Aprendizagem socrática

[Study Mode — OpenAI Help](https://help.openai.com/en/articles/11780217-using-study-mode-in-chatgpt)

Use para testar se a IA está ensinando e verificando entendimento, em vez de apenas entregar respostas.

### Faça

- [ ] Registre pelo menos três usos relevantes de IA.
- [ ] Revise cada diff produzido pela IA.
- [ ] Identifique uma sugestão errada, exagerada ou sem evidência.
- [ ] Corrija o problema e prove a correção.
- [ ] Diferencie prompt, workflow, ferramenta e agente.
- [ ] Defina contexto, memória, limites, guardrails, logs e aprovação.
- [ ] Mostre no sistema o status de uma execução ou falha do tutor.
- [ ] Adicione testes de componente e de jornada.

### Avanço esperado

Você consegue explicar o que a IA sugeriu, o que rejeitou, como verificou e como impediria a repetição do erro. O tutor guia sem substituir sua decisão.

### Atingiu?

- [ ] Sim: uso de IA é rastreável, corrigido e testado.
- [ ] Parcial: houve uso e correção, mas faltam guardrails, logs ou teste.
- [ ] Não: código foi aceito sem leitura, teste ou compreensão.

### Feedback da semana

- Evidência conferida:
- Ponto forte:
- Correção prioritária:
- Próxima ação:
- Critério de aceite:

---

## Fase 4 — Semana 4

### Tema

Design system, consistência, CI/CD, deploy, operação e checkup.

### Estude

#### Obrigatório 1 — Design system e Storybook

[Why Storybook](https://storybook.js.org/docs/get-started/why-storybook)

Aprenda a documentar componentes e estados em isolamento para acelerar revisão e reduzir regressões.

Prática: documente três componentes nos estados default, focus, loading, vazio, sucesso e erro.

#### Obrigatório 2 — Integração contínua

[Continuous integration — GitHub Docs](https://docs.github.com/en/actions/get-started/continuous-integration)

Aprenda a conectar alteração, revisão, checks, build, teste e resultado de pull request.

Prática: defina quais checks bloqueiam uma publicação.

#### Variável — Internet e operação

[How Does The Internet Work? — Cloudflare Developers](https://www.youtube.com/watch?v=hHAJeD1Vc1A)

Use para conectar interface, rede, servidor, latência e falhas de comunicação.

### Faça

- [ ] Documente tokens e componentes principais.
- [ ] Cubra estados importantes e acessibilidade.
- [ ] Execute lint, typecheck, testes e build.
- [ ] Configure CI ou declare o limite do recorte.
- [ ] Faça deploy ou declare o limite local.
- [ ] Execute smoke test.
- [ ] Documente rollback ou recuperação.
- [ ] Compare baseline, semanas e checkup final.
- [ ] Registre aprendizados e próximo ciclo.

### Avanço esperado

Você consegue provar o caminho entre mudança, revisão, teste, pipeline, deploy e comportamento observado. O checkup final mostra melhora, bloqueio ou ausência de dados por critério.

### Atingiu?

- [ ] Sim: produto, pipeline/deploy e checkup têm evidências.
- [ ] Parcial: produto está consistente, mas há limite operacional declarado.
- [ ] Não: só há screenshot, build local ou nota sem comparação.

### Feedback final

- Evidência conferida:
- Evolução comprovada:
- Bloqueio restante:
- Próximo ciclo:

---

## Prompt de estudo com IA

```text
Você será meu tutor socrático para a trilha Growth Lab.

Tema: [tema]
Fonte: [link]
Demanda real: [demanda]

Faça uma pergunta por vez. Peça que eu explique o conceito com minhas palavras. Apresente um caso ligado à demanda, peça uma decisão, questione o trade-off e teste um cenário de falha. Não aceite “a IA sugeriu” como justificativa. No final, registre três aprendizados, uma aplicação, uma evidência, uma dúvida e uma próxima ação.
```

## Regra de conclusão

Um conteúdo ou fase só é concluído quando existe estudo, conversa, teste, aplicação, evidência e feedback. A qualidade é medida pela evolução em relação ao baseline, não pela quantidade de telas, horas, links ou prompts.

