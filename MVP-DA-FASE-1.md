# MVP da Fase 1 — sistema mínimo auditável

Autor: Bruno Liberato Girardi

## Objetivo

Ao final da primeira semana, deve existir uma primeira versão utilizável do Growth Lab. Ela não precisa estar completa, bonita ou pronta para produção. Precisa ser suficientemente real para que o avaliador consiga usá-la para acompanhar, registrar, auditar e dar feedback.

O nome desta entrega é **walking skeleton**: o fluxo inteiro existe de forma pequena, mesmo que algumas integrações ainda sejam locais, mockadas ou simplificadas.

## Fluxo mínimo obrigatório

```text
iniciar ciclo
  -> definir objetivo e data
  -> registrar baseline dos critérios
  -> visualizar fase atual e próxima ação
  -> estudar um conteúdo e registrar aplicação
  -> registrar evidência
  -> preencher check-in semanal
  -> avaliador registra nota e feedback
  -> sistema gera ou registra a próxima ação
  -> histórico mostra o que mudou
```

O executor pode propor outra forma de organizar a experiência, mas não pode remover o ciclo de evidência e feedback.

## Critérios de pronto da primeira semana

### Produto

- [ ] O sistema inicia um ciclo de 30 dias.
- [ ] O usuário define objetivo, demanda âncora e data.
- [ ] Existe baseline com critérios observáveis e justificativa.
- [ ] A tela principal mostra fase atual, próxima ação e motivo da ação.
- [ ] Existe um tutor inicial, guiado ou mockado com honestidade, que faz perguntas sobre as decisões e registra as respostas.
- [ ] É possível registrar conteúdo estudado, prática e definição de concluído.
- [ ] É possível registrar uma evidência vinculada a um critério.
- [ ] É possível registrar check-in semanal.
- [ ] Existe uma forma de o avaliador lançar nota, feedback e próxima ação.
- [ ] O histórico mostra pelo menos o baseline e o registro da primeira semana.

### Técnica

- [ ] O projeto roda com instruções claras.
- [ ] A stack escolhida está documentada.
- [ ] As responsabilidades de front-end, BFF, back-end, banco e agentes estão explicadas, inclusive quando alguma camada ainda não existe.
- [ ] O modelo de dados suporta ciclo, critérios, evidência, feedback, avaliação e histórico.
- [ ] Existe pelo menos uma fatia de ponta a ponta funcionando.
- [ ] O tutor pergunta ou encaminha decisões sobre stack, front-end, BFF, back-end, banco, design system, hospedagem e CI/CD.
- [ ] Mock, persistência local e integração real estão diferenciados.
- [ ] Existe pelo menos um teste de jornada ou smoke test reproduzível.

### Estados e confiança

- [ ] Há estado vazio.
- [ ] Há estado de salvamento ou processamento.
- [ ] Há sucesso visível.
- [ ] Há erro recuperável.
- [ ] Há confirmação de que o dado foi persistido ou uma declaração explícita de que não foi.
- [ ] O usuário não perde silenciosamente um registro importante.

### Evidência da entrega

- [ ] Preview, vídeo curto ou execução reproduzível.
- [ ] Commit, tag ou versão identificável.
- [ ] Documento com decisões, limites e pendências.
- [ ] Registro de uso da IA e correções.
- [ ] Demonstração do fluxo completo em até cinco minutos.

## O que não é obrigatório na Fase 1

Não bloquear a primeira semana por causa de:

- agente autônomo completo;
- autenticação multiusuário;
- banco de produção;
- pipeline sofisticado;
- Storybook completo;
- design system final;
- deploy definitivo;
- todas as telas ou todas as semanas.

Esses itens entram como evolução nas fases seguintes. O que é obrigatório é a arquitetura estar consciente e o limite estar declarado.

Na Fase 1, o tutor pode ser uma sequência guiada de perguntas, um workflow ou uma integração mockada. Na Fase 3, a expectativa é evoluí-lo para um agente com ferramentas, guardrails, logs e aprovação humana.

## Regra de avaliação

Se o sistema estiver visualmente simples, mas permitir que o avaliador inicie um ciclo, registre baseline, veja evidência, dê feedback e acompanhe a próxima ação, a Fase 1 pode ser considerada forte.

Se estiver visualmente bonito, mas não permitir registrar e auditar a evolução, a Fase 1 não está pronta.
