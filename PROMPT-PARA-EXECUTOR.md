# Desafio de avaliacao - Growth Lab

Autor: Bruno Liberato Girardi

## Instrucao principal

Construa um sistema de evolucao pessoal de 30 dias. Este e um desafio de avaliacao: voce nao esta recebendo uma pagina pronta para apenas melhorar o visual. Voce deve entender o problema, propor a experiencia, decidir a arquitetura, implementar uma primeira versao coerente e provar o funcionamento.

Os arquivos existentes fora deste diretorio podem ser usados como contexto ou referencia inicial. Nao trate qualquer prototipo existente como a resposta final. Se uma decisao do material parecer ruim, questione, justifique e proponha uma alternativa.

## O que esta sendo avaliado

O desafio avalia se voce consegue transformar uma ideia ampla em um produto pequeno, compreensivel e verificavel, usando IA sem terceirizar o julgamento.

O foco esta em:

- problem framing e recorte de escopo;
- arquitetura de produto e de software;
- separacao consciente entre front-end, BFF, back-end, banco e agentes;
- design system, componentes, estados e Storybook;
- uso disciplinado de IA e vibecoding;
- jornadas reais, feedbacks e casos de erro;
- testes, CI/CD, deploy e observabilidade;
- comunicacao das decisoes e limites.

Auto Layout, CSS basico, componentes visuais simples e CRUD superficial sao pre-requisitos. Eles nao sao o diferencial da avaliacao.

## Entregaveis obrigatorios antes da implementacao

Entregue uma pasta ou documento com:

1. problem framing;
2. usuario principal, contexto e necessidades;
3. job to be done e resultado esperado ao final de 30 dias;
4. escopo IN e OUT;
5. mapa das jornadas;
6. arquitetura proposta, incluindo alternativas descartadas;
7. modelo de dados;
8. estrategia de agentes e uso de IA;
9. matriz de estados e falhas;
10. plano de testes;
11. plano de deploy e CI/CD;
12. criterio objetivo de pronto.

Nao comece pelo layout final.

## Produto minimo esperado

O produto deve permitir:

- iniciar um ciclo de 30 dias com objetivo, demanda ancora e data;
- registrar uma avaliacao inicial em criterios observaveis;
- receber uma proxima acao pequena e clara;
- acessar materiais curtos com formato, duracao e objetivo;
- registrar aplicacao pratica e evidencia;
- receber ou registrar feedback sobre a evidencia;
- acompanhar check-in semanal;
- fazer avaliacao final comparavel com a inicial;
- visualizar o que melhorou, o que ficou bloqueado e qual deve ser o proximo ciclo;
- exportar ou consultar o historico de forma compreensivel.

## Requisitos de arquitetura

Voce deve explicar, mesmo que algumas partes sejam simplificadas na primeira versao:

- o que pertence ao front-end;
- o que pertence ao BFF;
- o que pertence ao back-end de dominio;
- o que deve ser persistido no banco;
- quando um job assincrono ou fila faria sentido;
- onde os agentes entram e quais ferramentas podem usar;
- como sao controlados contexto, memoria, limites e aprovacoes;
- como erros de IA sao detectados e corrigidos;
- como a aplicacao sera testada e publicada;
- como uma mudanca sera revertida.

Nao crie microservicos por decoracao. Se uma camada nao tem responsabilidade, contrato, teste ou motivo operacional, questione se ela deveria existir.

## Requisitos de IA e vibecoding

Use IA em pelo menos tres etapas, mas registre:

- prompt utilizado;
- resposta recebida;
- o que foi aceito;
- o que foi rejeitado;
- qual erro, exagero ou alucinacao foi encontrado;
- qual verificacao humana foi feita;
- qual decisao final foi tomada.

O sistema deve deixar claro quando uma sugestao da IA e:

- fato confirmado;
- hipotese;
- recomendacao;
- codigo ainda nao verificado;
- resultado mockado.

Vibecoding sem leitura do diff, sem testes e sem entender a arquitetura nao conta como boa utilizacao de IA.

## Requisitos de experiencia

A experiencia deve evitar excesso de informacao. A primeira tela deve responder:

- onde estou no ciclo;
- qual e a proxima acao;
- por que ela importa;
- como vou provar que avancei.

Cada recurso deve ter:

- titulo;
- tipo: video, texto, exercicio ou referencia;
- duracao;
- objetivo;
- pratica curta;
- definicao de concluido;
- proxima acao.

## Requisitos de qualidade

- estados vazio, preenchido, salvando, sucesso, erro e concluido;
- validacao de formularios;
- feedback apos cada acao importante;
- responsividade real;
- acessibilidade basica;
- componentes reutilizaveis;
- Storybook ou justificativa clara caso outra estrategia seja escolhida;
- testes de unidade ou componente onde fizer sentido;
- testes de jornada no navegador;
- CI executando os checks principais;
- deploy verificavel, quando essa parte estiver no escopo entregue.

## Resultado esperado

Ao final, entregue o produto, a documentacao, os testes e as evidencias. Nao entregue apenas um dashboard visual. O avaliador precisa conseguir observar uma evolucao coerente entre objetivo, comportamento, arquitetura, implementacao e prova.

