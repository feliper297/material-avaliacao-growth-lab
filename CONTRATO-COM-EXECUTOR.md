# Contrato de trabalho com Claude, Cursor e IA

Autor: Bruno Liberato Girardi

## Princípio

Claude, Cursor ou outro agente são ferramentas de trabalho. A fonte de verdade é o código executado, os testes, os logs, os contratos e as decisões registradas pelo executor.

## Antes de pedir código

O executor deve fornecer à IA:

- objetivo da tarefa;
- contexto do produto;
- arquivos relevantes;
- restrições;
- critérios de aceite;
- riscos conhecidos;
- comando de teste esperado.

Pedidos vagos como “melhore tudo”, “deixe profissional” ou “crie uma arquitetura escalável” não contam como especificação.

## Depois de receber código

Para cada alteração gerada por IA, o executor deve:

1. ler o diff inteiro;
2. identificar decisões introduzidas;
3. procurar mudanças desnecessárias;
4. executar lint, typecheck, testes e build quando aplicável;
5. testar a jornada no navegador;
6. registrar o que aceitou, rejeitou e corrigiu;
7. declarar o que ainda não foi verificado.

## Excesso de informação

Quando a IA devolver uma lista grande de melhorias, o executor deve reduzir para:

- problema observado;
- impacto;
- decisão escolhida;
- ação mínima;
- evidência de sucesso;
- itens adiados.

Uma resposta longa da IA não é uma backlog automaticamente válida.

## Segurança e limites

- não inserir segredos no repositório;
- não usar ferramenta destrutiva sem aprovação explícita;
- não alterar dados reais sem explicar o impacto;
- não afirmar que um serviço existe sem confirmar o ambiente;
- não apresentar mock, stub ou fixture como integração real;
- não instalar dependências sem registrar o motivo;
- não publicar sem registrar URL, commit, pipeline e smoke test.

## Formato obrigatório do log de IA

Use [LOG-DE-IA.md](./anexos/LOG-DE-IA.md) para cada uso relevante. No mínimo, registre:

- data;
- objetivo;
- prompt;
- resposta ou resumo fiel;
- decisão humana;
- sugestão rejeitada;
- erro encontrado;
- verificação realizada;
- arquivos e testes afetados.

## Regra de investigação

Não declarar causa raiz sem evidência. Quando algo ainda for hipótese, escrever `[HIPÓTESE]` e dizer o que precisa ser verificado. Usar `[CONFIRMADO]` somente depois de teste, log, arquivo ou reprodução que sustente a afirmação.

