# Primeira semana — instruções e avaliação

Autor: Bruno Liberato Girardi

Este documento pode ser enviado diretamente ao executor junto com o ZIP.

## Mensagem para o executor

Você recebeu um desafio duplo:

1. construir um sistema de evolução pessoal de 30 dias;
2. usar esse sistema para demonstrar sua própria evolução semanal.

Na primeira semana, não tente entregar o produto inteiro nem concentre o trabalho em uma tela bonita. O objetivo é provar que você entendeu o problema, fez um recorte, definiu uma baseline, explicou a arquitetura e entregou um walking skeleton utilizável para acompanhar a própria evolução.

Leia o `README.md`, o `DESAFIO-DUPLO.md` e o `CONTRATO-COM-EXECUTOR.md`. Rode o projeto-base e registre o estado inicial antes de editar. Se decidir manter, refatorar ou reconstruir alguma parte, explique por quê.

Use Claude, Cursor ou outra IA como ferramenta, mas registre prompts, respostas, decisões aceitas, sugestões rejeitadas, erros encontrados e verificações humanas. Não aceite uma arquitetura porque a IA sugeriu. Não crie BFF, agente, microserviço ou banco sem responsabilidade e motivo claros.

## Entrega até sexta-feira

Entregue no repositório ou na pasta de evidências:

1. [STATUS-INICIAL-ESPERADO.md](./projeto-base/STATUS-INICIAL-ESPERADO.md) preenchido;
2. problem framing com usuário, contexto, problema, hipóteses e perguntas abertas;
3. escopo IN e OUT;
4. objetivo âncora do ciclo de 30 dias;
5. baseline dos critérios de evolução, com justificativa para cada nota;
6. definição do que será considerado evolução observável;
7. mapa inicial das jornadas principais;
8. arquitetura proposta com front-end, BFF, back-end, banco e agentes — ou justificativa para não usar alguma camada;
9. modelo de dados inicial;
10. alternativas descartadas e respectivos trade-offs;
11. matriz inicial de estados e falhas;
12. registro de pelo menos três usos relevantes de IA;
13. registro dos comportamentos demonstrados, bloqueios comunicados e resposta aos feedbacks recebidos;
14. walking skeleton funcional com ciclo, baseline, próxima ação, evidência, check-in, nota e feedback;
15. plano da evolução da segunda semana e seus testes;
16. uma apresentação ou gravação de até cinco minutos demonstrando o fluxo dentro do sistema.

O código da primeira versão é obrigatório, mas não precisa ser volumoso. Ele deve provar uma fatia vertical pequena e auditável, não apenas produzir telas.

## Ritmo sugerido

### Dia 1 — observar

- rodar o projeto-base;
- registrar fluxo, estados, persistência, acessibilidade, console e problemas de entendimento;
- separar fato observado de hipótese.

### Dia 2 — recortar

- definir usuário e contexto;
- escrever o problema sem solução embutida;
- escolher objetivo âncora, escopo IN e OUT e critérios de sucesso.

### Dia 3 — desenhar limites e começar o walking skeleton

- mapear jornadas;
- desenhar fluxo de dados;
- definir responsabilidades das camadas;
- modelar entidades e histórico;
- registrar alternativas descartadas.
- iniciar o fluxo mínimo do sistema.

### Dia 4 — fechar o fluxo mínimo e testar decisões com IA

- usar IA para criticar o recorte ou a arquitetura;
- rejeitar pelo menos uma sugestão inadequada ou excessiva;
- validar decisões com documentação, teste ou raciocínio próprio;
- registrar o resultado no [LOG-DE-IA.md](./anexos/LOG-DE-IA.md).
- garantir que o avaliador consiga registrar baseline, evidência, nota e feedback.

### Sexta-feira — apresentar

- demonstrar o estado inicial e o que mudou;
- explicar o problema em um minuto;
- explicar a arquitetura em três minutos;
- mostrar a evidência de uma decisão e uma sugestão de IA rejeitada;
- demonstrar o walking skeleton dentro do sistema;
- declarar o que ainda não foi feito;
- preencher o [REGISTRO-SEMANAL.md](./anexos/REGISTRO-SEMANAL.md).

## O que será avaliado

| Dimensão da semana 1 | Peso | Evidência esperada |
|---|---:|---|
| Entendimento do problema e recorte | 20% | problem framing, usuário, hipóteses, IN/OUT |
| Baseline e comportamento do produto | 15% | critérios observáveis, notas justificadas, jornadas |
| Arquitetura e modelo de dados | 25% | limites, contratos, entidades, alternativas e trade-offs |
| IA e vibecoding crítico | 15% | log de usos, correções, rejeições e verificações |
| Comportamentos profissionais e aprendizagem | 15% | ownership, comunicação, disciplina, feedback e honestidade operacional |
| Comunicação e qualidade da evidência | 10% | apresentação curta, links, arquivos e honestidade sobre limites |

Nota da semana: 0 a 10, calculada pela média ponderada das dimensões.

### Gate obrigatório

Sem o walking skeleton do [MVP da Fase 1](./MVP-DA-FASE-1.md), a fase é considerada incompleta. A documentação pode ser boa, mas não substitui o sistema utilizável; nesse caso, a nota da semana não deve passar de 5/10 até que o fluxo mínimo seja demonstrado.

## O que caracteriza uma boa primeira semana

- explica o problema sem começar pela solução;
- corta o escopo e sabe o que não fará;
- define evolução como comportamento ou evidência, não como conteúdo consumido;
- consegue explicar por que cada camada existe;
- modela histórico suficiente para comparar início, semanas e final;
- trata agente como componente com ferramenta, limites, guardrails e logs;
- usa IA para desafiar decisões, não para substituir entendimento;
- deixa claro o que é fato, hipótese, mock e código não verificado;
- consegue explicar tudo em cinco minutos.
- assume o combinado, comunica bloqueios cedo e transforma feedback em uma ação observável.
- entrega o sistema mínimo auditável mesmo que o design e as integrações ainda estejam em evolução.

## Redutores fortes de nota

- começou pelo layout e não consegue explicar o problema;
- preencheu notas padrão sem evidência;
- criou arquitetura complexa por sugestão da IA;
- chamou um prompt de agente sem definir ferramentas ou limites;
- não registrou alternativas descartadas;
- não separou mock de persistência real;
- apresentou screenshot como prova de funcionamento;
- declarou progresso sem baseline;
- não consegue dizer o que acontece quando uma dependência falha.

## Perguntas para a auditoria de sexta-feira

1. Qual problema você está resolvendo e para quem?
2. O que ficou fora do escopo e por quê?
3. O que significa evolução observável neste produto?
4. Qual é a responsabilidade de cada camada?
5. Por que existe ou não existe um BFF?
6. O que será persistido e como o histórico será comparado?
7. Qual sugestão da IA você rejeitou?
8. O que foi confirmado por teste ou fonte?
9. Qual é a próxima fatia vertical?
10. O que você ainda não consegue afirmar?

11. Qual comportamento você demonstrou esta semana e qual ainda precisa mudar?
12. Que evidência mostra que você respondeu ao feedback?

Depois da conversa, use [COMPORTAMENTOS-E-FEEDBACK.md](./COMPORTAMENTOS-E-FEEDBACK.md) para avaliar apenas comportamentos observáveis. Em seguida, preencha [AUDITORIA-E-NOTA.md](./anexos/AUDITORIA-E-NOTA.md) e transforme o feedback principal em uma ação com critério de aceite para a semana seguinte.
