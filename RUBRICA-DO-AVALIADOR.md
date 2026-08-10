# Rubrica do avaliador — Growth Lab

Autor: Bruno Liberato Girardi

## Papel do avaliador

O avaliador não verifica apenas se o executor produziu uma interface. Ele verifica se houve evolução demonstrável entre intenção, estudo, aplicação, decisão, implementação, teste e resposta ao feedback.

A pergunta principal é:

> O executor está apenas produzindo saída ou está desenvolvendo capacidade de entender, decidir, construir, verificar e melhorar?

## O que avaliar

| Dimensão | Peso final | O que observar |
|---|---:|---|
| Problem framing e recorte | 10% | Entende usuário, problema, contexto, hipóteses, riscos e o que ficou fora. |
| Produto, jornadas e UX | 12% | Prioriza próxima ação, reduz excesso de informação, trata estados e transforma conteúdo em prática. |
| Arquitetura, BFF, back-end e dados | 18% | Separa responsabilidades, define contratos, histórico, persistência e trade-offs sem complexidade decorativa. |
| IA e vibecoding crítico | 15% | Registra prompts, revisa diffs, rejeita sugestões ruins, testa e mantém julgamento humano. |
| Design system e implementação | 8% | Tokens, componentes, estados, responsividade, acessibilidade e documentação isolável. |
| Testes, CI/CD, deploy e operação | 10% | Jornadas reais, falhas, pipeline, smoke test, logs, publicação e recuperação. |
| Aprendizagem aplicada e evidências | 10% | Estuda, conversa com IA, testa conhecimento, aplica em demanda real e explica a mudança. |
| Comportamento e resposta ao feedback | 12% | Ownership, clareza, disciplina, autonomia responsável, honestidade e correção após feedback. |
| Comunicação e documentação | 5% | Decisões compreensíveis, registros atualizados e apresentação baseada em evidências. |
| **Total** | **100%** |  |

## Como avaliar o estudo

Toda semana deve existir:

- dois conteúdos obrigatórios ligados à competência da semana;
- um conteúdo variável ligado à demanda âncora;
- conversa orientada com IA;
- pequeno teste ou caso prático;
- aplicação na demanda real;
- evidência e explicação do motivo da aplicação.

Uma distribuição razoável do tempo é 20% conteúdo, 70% aplicação e 10% documentação. O avaliador não deve premiar quem apenas consumiu mais links.

### Conteúdo concluído

Considere um conteúdo concluído apenas quando o executor:

1. explica três aprendizados com as próprias palavras;
2. identifica um caso semelhante na demanda;
3. aplica uma mudança ou toma uma decisão;
4. apresenta evidência;
5. explica por que a aplicação fez sentido.

## Como avaliar o uso da IA

Peça para ver o log e pergunte:

- qual era o objetivo do prompt;
- qual resposta foi útil;
- qual resposta estava errada, exagerada ou genérica;
- o que foi aceito, rejeitado e adiado;
- qual teste, fonte ou experimento confirmou a decisão;
- qual parte ainda é hipótese.

O executor deve usar IA em pelo menos três etapas do ciclo, mas a quantidade de prompts não aumenta a nota. A qualidade está na capacidade de verificar e corrigir.

## Como avaliar o comportamento

Avalie somente fatos observáveis:

- combina uma entrega e cumpre ou renegocia antes do atraso;
- comunica bloqueio sem esperar ser cobrado;
- mantém registros e evidências;
- fecha uma tarefa antes de abrir muitas frentes;
- recebe feedback e transforma em ação;
- pede ajuda quando o risco exige;
- admite erro, mock, limite ou falta de prova;
- explica decisões sem terceirizar para a IA.

Não avaliar simpatia, personalidade, ansiedade, aparência, velocidade isolada ou quantidade de horas trabalhadas. Para exemplos e escala comportamental, use [COMPORTAMENTOS-E-FEEDBACK.md](./COMPORTAMENTOS-E-FEEDBACK.md).

## Nota semanal

Use a nota semanal para medir a evolução daquela semana, não para antecipar a nota final. O registro deve conter:

- entrega prometida;
- entrega observada;
- evidência reproduzível;
- comportamento observado;
- feedback dado;
- ação exigida para a próxima semana.

### Escala geral

| Nota | Interpretação |
|---:|---|
| 0–2 | Não há evidência confiável ou há falha grave de entendimento, segurança ou honestidade operacional. |
| 3–4 | Existe esforço ou saída parcial, mas o executor depende de instruções detalhadas e não fecha o ciclo. |
| 5–6 | Entrega funcional em parte, com entendimento razoável e lacunas relevantes que foram reconhecidas. |
| 7–8 | Entrega consistente, decisões justificadas, evidências suficientes e resposta concreta ao feedback. |
| 9–10 | Entrega madura para o escopo, antecipa riscos, melhora o processo e consegue ensinar as decisões. |

## Gates da avaliação

Mesmo com média alta, a entrega não deve ser considerada pronta se houver:

- credencial ou dado pessoal exposto;
- agente com ação destrutiva sem aprovação;
- deploy declarado sem evidência;
- avaliação final sem baseline;
- mock apresentado como integração real;
- arquitetura que o executor não consegue explicar;
- teste inexistente para uma jornada principal;
- feedback escondido ou registro alterado para parecer melhor.

## Auditoria de sexta-feira

1. Reproduza pelo menos uma jornada no navegador.
2. Abra uma evidência ou commit real.
3. Confira o log de IA relacionado à entrega.
4. Compare o combinado da semana com o realizado.
5. Faça perguntas sobre uma decisão, um erro e um trade-off.
6. Registre uma nota por dimensão relevante.
7. Dê um feedback com comportamento, evidência, impacto e próxima ação.
8. Defina o critério de aceite da semana seguinte.

## Feedback obrigatório

Use esta forma:

> Observei [comportamento ou decisão] em [evidência]. Isso causou [impacto]. Continue/corrija [ação]. Na próxima sexta-feira, consideraremos resolvido quando [critério observável].

Evite frases genéricas como “seja mais proativo”, “melhore a arquitetura” ou “pense mais como engenheiro”.

