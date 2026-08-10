# Contrato de entrega semanal

Autor: Bruno Liberato Girardi

Este contrato define como o executor compartilha o trabalho para que o avaliador consiga acompanhar visualmente e com evidências.

## Fonte de verdade

O executor deve manter um único repositório ou pasta versionada. Cada sexta-feira deve existir uma versão identificável:

- commit ou tag `semana-01`, `semana-02`, `semana-03` ou `semana-04`;
- link de preview ou instrução de execução;
- registro semanal;
- evidências da semana;
- log de IA relacionado;
- atualização do painel do próprio sistema.

O Notion é um espelho de controle do avaliador. O executor atualiza o painel do sistema; o avaliador atualiza status, nota, feedback e gate no Notion depois de conferir a evidência.

Um ZIP solto sem versão, sem instrução e sem histórico não é uma entrega auditável.

## Pacote de sexta-feira

Entregar sempre:

1. resumo de até uma página;
2. link do commit, branch, tag ou ZIP da versão;
3. link do preview ou vídeo curto da jornada;
4. `REGISTRO-SEMANAL.md` preenchido;
5. evidência principal da semana;
6. `LOG-DE-IA.md` atualizado;
7. lista do que foi aceito, rejeitado, corrigido e adiado;
8. bloqueios abertos;
9. próxima ação com critério de aceite.

O executor não precisa duplicar todo o código ou log no Notion. Deve fornecer links e um resumo suficiente para o avaliador atualizar o espelho.

Os artefatos devem ficar em `evidencias/semana-0N/`, seguindo a estrutura descrita em [evidencias/README.md](./evidencias/README.md).

## Formato do resumo

```text
Semana:
Objetivo:
Entreguei:
Evidência principal:
O que aprendi:
O que a IA sugeriu e eu rejeitei:
O que foi confirmado:
Bloqueio:
Feedback que apliquei:
Próxima ação:
```

## Como o avaliador acompanha

Na sexta-feira, o avaliador não precisa ler o repositório inteiro. Deve:

1. abrir o painel e localizar a fase;
2. executar uma jornada principal;
3. abrir a evidência principal;
4. conferir o commit ou versão;
5. verificar o registro de IA;
6. comparar promessa, resultado e baseline;
7. preencher nota e feedback;
8. registrar a próxima ação no sistema.

## Regra de continuidade

O feedback do avaliador entra como requisito da próxima semana. A semana seguinte não começa do zero: ela deve mostrar o que foi corrigido, o que foi mantido e o que foi conscientemente descartado.

## Primeira entrega

A entrega da primeira sexta-feira precisa conter o sistema mínimo auditável descrito em [MVP-DA-FASE-1.md](./MVP-DA-FASE-1.md). A partir da segunda semana, o sistema passa a ser também o instrumento oficial de acompanhamento e auditoria.

## Primeira entrega

A entrega da primeira sexta-feira precisa conter o sistema mínimo auditável descrito em [MVP-DA-FASE-1.md](./MVP-DA-FASE-1.md). A partir da segunda semana, o sistema passa a ser também o instrumento oficial de acompanhamento e auditoria.
