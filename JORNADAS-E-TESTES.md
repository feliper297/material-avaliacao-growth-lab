# Jornadas, comportamentos e testes

Autor: Bruno Liberato Girardi

Cada jornada deve ser descrita com inicio, acao, estado intermediario, resultado, evidencia e falha possivel.

## Jornada 1 - primeiro uso e baseline

O usuario inicia um ciclo, define uma demanda ancora, escolhe tres criterios prioritarios e registra a avaliacao inicial.

Validar:

- data e identificador do ciclo;
- campos obrigatorios;
- orientacao contextual;
- salvamento confirmado;
- possibilidade de editar antes de iniciar;
- nenhum score aparecendo como se fosse uma medicao real sem resposta do usuario.

## Jornada 2 - proxima acao do dia

O sistema mostra uma acao pequena: estudar, explicar, aplicar ou registrar evidencia.

Validar:

- a acao e concreta;
- existe motivo para ela;
- o usuario sabe quanto tempo deve investir;
- o sistema nao apresenta dez chamadas primarias;
- concluir a acao produz feedback;
- perder um dia nao destroi o ciclo.

## Jornada 3 - estudo com IA

O usuario escolhe um material, informa contexto e inicia uma sessao de tutor ou gera um prompt.

Validar:

- a IA nao entrega a solucao antes da tentativa;
- a sessao diferencia fato, hipotese e opiniao;
- existe limite de contexto;
- a resposta pode ser marcada como util, incorreta ou insuficiente;
- o prompt, resultado e decisao humana podem ser registrados.

## Jornada 4 - evidencia aplicada

O usuario registra o que fez, onde aplicou, qual resultado observou e inclui um link ou artefato.

Validar:

- titulo, tipo, descricao e criterio relacionado;
- link valido e opcional quando o artefato for local;
- antes/depois ou decisao explicitados;
- feedback vinculado a evidencia;
- exclusao com confirmacao e possibilidade de recuperar ou desfazer, quando aplicavel.

## Jornada 5 - check-in semanal

O usuario responde em poucos minutos:

- o que aprendi;
- onde apliquei;
- qual evidencia prova isso;
- qual bloqueio apareceu;
- qual e a proxima menor acao.

O sistema deve permitir salvar parcialmente e retomar depois.

## Jornada 6 - checkup do dia 30

O usuario repete a avaliacao inicial, compara dimensoes, revisa evidencias e escolhe o proximo ciclo.

O resultado deve mostrar:

- score inicial e final;
- variacao por criterio;
- evidencias associadas;
- feedbacks recebidos;
- lacunas ainda abertas;
- proxima acao recomendada;
- o que foi aprendido sobre o proprio processo.

## Falhas obrigatorias

Teste pelo menos estes casos:

- lista vazia;
- formulario incompleto;
- salvamento lento;
- salvamento falhando;
- link quebrado;
- resposta de IA excessivamente longa;
- resposta da IA incorreta;
- banco indisponivel;
- conflito de edicao ou dado antigo;
- recarregamento durante salvamento;
- localStorage ou cache corrompido;
- usuario tentando concluir sem evidencia;
- usuario sem permissao para uma acao;
- ciclo encerrado tentando receber novas alteracoes.

## Criterios de aceite comportamentais

- Toda acao importante produz feedback visivel.
- Toda falha informa o que ocorreu e qual proximo passo existe.
- Nenhuma tela depende apenas de cor para comunicar estado.
- O fluxo funciona com teclado e leitor de tela nas interacoes principais.
- O usuario sempre consegue localizar a proxima acao.
- O sistema nao confunde conteudo assistido com capacidade demonstrada.
- O checkup final compara dados reais do inicio e do fim.

