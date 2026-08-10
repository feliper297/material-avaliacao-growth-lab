# Modelo do produto — onboarding que se constrói

Autor: Bruno Liberato Girardi

## A ideia central

O Growth Lab é quase uma ferramenta de onboarding técnico e profissional. Ele deve ensinar, perguntar, orientar, registrar e avaliar enquanto o executor constrói a própria ferramenta.

O produto tem dois resultados simultâneos:

1. formar capacidade de raciocínio e execução;
2. produzir um sistema funcional que torne essa evolução visível.

## Loop de onboarding

```text
orientar -> apresentar material -> perguntar -> testar entendimento
  -> aplicar em uma decisão real -> construir -> observar o resultado
  -> receber feedback -> corrigir -> registrar aprendizado -> avançar
```

O executor não deve apenas abrir uma lista de tarefas. O tutor deve contextualizar a fase, fazer uma pergunta por vez, explicar alternativas, pedir uma decisão, registrar a resposta e encaminhar a próxima ação.

## Dois modos do produto

### Modo aprendizagem

O sistema apresenta o conteúdo curto, conduz a conversa socrática, faz um teste e pede uma aplicação na demanda real.

### Modo construção

O sistema transforma o aprendizado em tarefa: pergunta qual decisão técnica será tomada, quais arquivos serão afetados, como será testada e que evidência será entregue.

O mesmo ciclo deve conectar os dois modos. Estudo sem aplicação não conclui a etapa; código sem explicação e teste também não.

## Tutor de melhoria

O tutor deve:

- saber a fase atual e o objetivo da semana;
- apontar o material relacionado;
- perguntar antes de recomendar;
- checar se o executor sabe explicar o conceito;
- questionar front-end, BFF, back-end, dados, agentes, design system, hospedagem e CI/CD;
- mostrar alternativas e trade-offs;
- registrar a decisão humana;
- reconhecer hipótese, fato, mock e código não verificado;
- pedir evidência antes de marcar concluído;
- transformar feedback em próxima ação.

Na Fase 1, o tutor pode ser um fluxo guiado ou uma integração simples. Na Fase 3, deve evoluir para um agente com ferramentas, limites, guardrails, logs e aprovação humana.

## Pixel no loop

Quando houver uma versão navegável, o executor deve solicitar ao Pixel uma auditoria visual e de experiência:

- hierarquia e próxima ação;
- excesso de informação;
- estados vazios, loading, sucesso e erro;
- responsividade;
- acessibilidade;
- consistência do design system;
- clareza do feedback.

O Pixel recomenda; o executor decide, registra a aceitação ou rejeição e prova a mudança. Se o Pixel não estiver disponível no ambiente, isso deve ser declarado.

## Perguntas que o tutor deve fazer antes da implementação

1. Qual problema estamos resolvendo e para quem?
2. Qual é o menor fluxo que prova valor?
3. Qual tecnologia será usada e por quê?
4. O que pertence ao front-end?
5. Você sabe explicar BFF? Ele é necessário neste recorte?
6. Onde ficam as regras de domínio?
7. O que será persistido e como o histórico será comparado?
8. Usaremos componentes open source, design system próprio, atomic design ou outra estratégia?
9. Como Storybook ou equivalente ajudará?
10. Onde a aplicação será hospedada?
11. O que GitHub, CI/CD, smoke test e rollback precisam provar?
12. O que a IA pode fazer e o que exige aprovação humana?

## Critério de sucesso

Ao final do ciclo, o executor deve ter aprendido e conseguido demonstrar como:

- entender um problema;
- escolher uma arquitetura;
- construir uma solução;
- usar IA com verificação;
- testar comportamentos;
- receber feedback;
- corrigir a rota;
- explicar e provar cada decisão.

