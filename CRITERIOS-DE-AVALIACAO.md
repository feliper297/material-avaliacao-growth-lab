# Criterios de avaliacao

Autor: Bruno Liberato Girardi

## Distribuicao de peso

| Frente | Peso |
|---|---:|
| Problem framing e recorte | 10 |
| Produto, jornadas e UX | 12 |
| Arquitetura, BFF, back-end e dados | 18 |
| IA e vibecoding critico | 15 |
| Design system e implementacao | 8 |
| Testes, CI/CD, deploy e operacao | 10 |
| Aprendizagem aplicada e evidencias | 10 |
| Comportamentos e resposta ao feedback | 12 |
| Comunicacao e documentacao | 5 |
| **Total** | **100** |

## O que diferencia uma boa entrega

### Problem framing

Boa entrega:

- identifica usuario, contexto, problema e resultado;
- registra hipoteses e perguntas abertas;
- corta escopo sem perder a proposta;
- define sucesso de forma observavel.

Entrega fraca:

- comeca pelo layout;
- trata toda ideia como requisito;
- usa frases genericas como "melhorar a experiencia";
- nao explica para quem o produto existe.

### Produto, comportamento e UX

Boa entrega:

- prioriza uma proxima acao;
- reduz excesso de informacao;
- faz conteudo virar pratica;
- inclui feedback, estados e recuperacao;
- permite comparar inicio e fim.

Entrega fraca:

- e um painel de cards e numeros;
- mede cliques como evolucao;
- usa gamificacao sem significado;
- esconde erros e bloqueios.

### Arquitetura

Boa entrega:

- separa camadas por responsabilidade real;
- explica quando o BFF ajuda e quando atrapalha;
- define contratos e dados;
- trata agentes como componentes com ferramentas, limites, guardrails e observabilidade;
- apresenta MVP e evolucao sem vender complexidade desnecessaria.

Entrega fraca:

- cria microservicos sem motivo;
- chama o banco diretamente do front-end sem justificar;
- coloca toda regra no BFF;
- chama qualquer prompt de IA de agente;
- nao sabe o que acontece quando uma dependencia falha.

### IA e vibecoding

Boa entrega:

- mostra prompts, respostas, correcoes e verificacoes;
- le o diff produzido pela IA;
- testa comportamento e arquitetura;
- rejeita sugestoes excessivas ou sem evidencia;
- mantém uma fonte de verdade humana.

Entrega fraca:

- cola codigo sem entender;
- aceita uma arquitetura inteira porque a IA sugeriu;
- confunde texto convincente com prova;
- nao consegue explicar o que mudaria se o contexto fosse diferente.

### Testes e operacao

Boa entrega:

- testa jornadas completas no navegador;
- testa estados de componente em isolamento;
- executa checks no CI;
- apresenta URL, log ou artefato de deploy;
- sabe como investigar e reverter uma falha.

Entrega fraca:

- apresenta apenas screenshot;
- diz "funciona" sem teste nomeado;
- usa build verde como prova de comportamento;
- nao diferencia mock de integracao real.

### Aprendizagem aplicada

Boa entrega:

- estuda dois conteúdos obrigatórios e um conteúdo variável por semana;
- conversa com a IA, responde perguntas e faz um teste de entendimento;
- aplica o conceito em uma demanda real;
- registra evidência e explica o motivo da aplicação;
- identifica erros, excessos ou limites do material e da IA.

Entrega fraca:

- marca links como concluídos sem aplicação;
- copia a explicação da IA sem conseguir explicar;
- confunde horas de estudo com evolução;
- não apresenta evidência do conhecimento aplicado.

### Comportamento e feedback

Boa entrega:

- assume compromissos e comunica bloqueios cedo;
- mantém registros atualizados;
- pede ajuda quando o risco exige;
- recebe feedback e transforma a orientação em ação;
- declara limites, falhas, mocks e hipóteses com honestidade.

Entrega fraca:

- esconde bloqueios até a sexta-feira;
- abre muitas frentes e não fecha nenhuma;
- atribui decisões à IA;
- recebe feedback como opinião sem testar ou responder;
- altera o registro para parecer que algo foi comprovado.

## Red flags de alta severidade

- dados pessoais ou credenciais expostos;
- agente com ferramenta destrutiva sem aprovacao;
- deploy declarado sem evidencia;
- avaliacao final sem baseline;
- progresso calculado por conteudo consumido, mas apresentado como crescimento;
- ausencia de tratamento para falhas importantes;
- arquitetura complexa que nao pode ser explicada em cinco minutos.

Para a régua completa, evidências e perguntas de sexta-feira, use [RUBRICA-DO-AVALIADOR.md](./RUBRICA-DO-AVALIADOR.md).
