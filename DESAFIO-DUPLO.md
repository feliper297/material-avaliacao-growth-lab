# Desafio duplo — sistema e evolução

Autor: Bruno Liberato Girardi

## Desafio A: construir o Growth Lab

O executor deverá construir uma primeira versão de um sistema de evolução pessoal de 30 dias. A aplicação deve unir aprendizagem, prática, evidência e feedback.

O problema não é criar uma biblioteca de conteúdo. O problema é ajudar alguém a transformar conhecimento em capacidade demonstrável.

### Entregas do Desafio A

Antes de codar:

1. problem framing;
2. usuário, contexto e necessidades;
3. JTBD e resultado esperado;
4. escopo IN e OUT;
5. mapa de jornadas;
6. arquitetura e alternativas descartadas;
7. modelo de dados;
8. estratégia de IA e agentes;
9. matriz de estados e falhas;
10. plano de testes;
11. plano de CI/CD e deploy;
12. definição objetiva de pronto.

Durante a implementação:

- entregar uma fatia vertical funcional;
- manter limites claros entre interface, BFF, domínio, banco e agentes;
- registrar prompts, respostas, correções e validações humanas;
- criar componentes e estados reutilizáveis;
- testar jornadas reais, inclusive falhas;
- publicar apenas o que puder ser comprovado.

## Desafio B: evoluir usando o sistema

O executor fará quatro ciclos semanais. O conteúdo do documento original foi preservado como base, mas o foco da avaliação foi deslocado do visual básico para raciocínio, aplicação e prova.

### Semana 1 — clareza, arquitetura e sistema mínimo auditável

Objetivo: sair de uma ideia ampla para um problema, uma arquitetura explicável e um walking skeleton que já possa ser usado para registrar a própria avaliação.

Entregar:

- objetivo âncora;
- baseline dos critérios;
- problem framing;
- mapa inicial da arquitetura;
- primeiros critérios de aceite;
- registro das decisões tomadas com IA e das sugestões rejeitadas.
- sistema mínimo utilizável para iniciar ciclo, registrar baseline, evidência, check-in, nota e feedback;
- tutor inicial que faz perguntas sobre arquitetura, stack, dados, design e operação antes de recomendar ou executar;
- fluxo executável de ponta a ponta, mesmo que algumas integrações sejam locais ou mockadas com honestidade.

Critério de evolução: conseguir explicar em cinco minutos o problema, o recorte, por que cada camada existe, demonstrar o fluxo completo dentro do sistema e mostrar como o tutor ajudou sem substituir a decisão humana.

### Semana 2 — jornadas, dados e fatia vertical

Objetivo: transformar a arquitetura em um fluxo pequeno que funciona de ponta a ponta.

Entregar:

- jornada de primeiro uso;
- jornada de próxima ação;
- jornada de evidência e feedback;
- modelo de dados inicial;
- contrato entre front-end e BFF ou justificativa para não criar BFF;
- fatia vertical testável;
- testes dos estados vazio, salvando, sucesso e erro.

Critério de evolução: conseguir seguir um dado desde a ação do usuário até a persistência e o retorno visual, incluindo falha.

### Semana 3 — IA, agentes, correção e testes

Objetivo: usar IA para acelerar o trabalho sem terceirizar o julgamento.

Entregar:

- pelo menos três usos de IA documentados;
- diferença entre prompt, ferramenta, agente e workflow;
- limites, guardrails, aprovações e logs;
- um caso de sugestão exagerada, erro ou alucinação corrigido;
- testes de componente e pelo menos uma jornada no navegador;
- registro do diff revisado por uma pessoa.

Critério de evolução: conseguir explicar o que a IA sugeriu, o que foi rejeitado e qual evidência confirmou a decisão final.

### Semana 4 — design system, CI/CD, deploy e checkup

Objetivo: transformar a solução em um produto operável e avaliável.

Entregar:

- tokens e componentes reutilizáveis;
- stories ou estratégia equivalente para estados relevantes;
- CI com checks principais;
- deploy ou justificativa explícita do recorte local;
- smoke test e procedimento de recuperação;
- checkup final comparando baseline e resultado;
- retrospectiva e próximo ciclo.

Critério de evolução: conseguir provar o caminho entre mudança, teste, pipeline, deploy e comportamento observado.

## Regra da sexta-feira

Toda sexta-feira o executor deve preencher [REGISTRO-SEMANAL.md](./anexos/REGISTRO-SEMANAL.md) e apresentar:

- resultado da semana;
- evidência vinculada a um critério;
- decisões e alternativas;
- uso de IA e correções;
- bloqueios;
- nota de autoavaliação;
- próxima ação.

O avaliador preencherá [AUDITORIA-E-NOTA.md](./anexos/AUDITORIA-E-NOTA.md), devolverá feedback e registrará uma ação de acompanhamento no sistema.

## Nota do ciclo

A nota principal usa a rubrica de [CRITERIOS-DE-AVALIACAO.md](./CRITERIOS-DE-AVALIACAO.md). A nota semanal não substitui a rubrica: ela mede a qualidade da evolução, da evidência e da resposta ao feedback.

Uma semana pode ter uma entrega visualmente pequena e ainda ser excelente se demonstrar uma decisão importante, um teste relevante ou uma correção bem verificada.
