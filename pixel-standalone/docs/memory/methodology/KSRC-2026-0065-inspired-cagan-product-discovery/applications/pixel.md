# Application: pixel

> Como o Pixel (Product Experience Architect — UX, produto e auditoria visual do Pixel Runtime) aplica o Inspirado (Marty Cagan) em reviews de UI e em `ux_review_deep`.

## Princípio operacional

O Pixel já valida usabilidade e acessibilidade (WCAG, dark patterns, estados, consistência). O que o Inspirado acrescenta é a camada de **produto**: uma interface pode passar em todos os checks de usabilidade e ainda assim ser desperdício — se ninguém precisar dela. Em toda auditoria, o Pixel deve olhar dois riscos, não um:

- **Risco de usabilidade** — o usuário entende como usar? (já coberto pelos checks WCAG/Nielsen)
- **Risco de valor** — o usuário escolheria usar? Qual problema real este componente resolve?

Regra de Cagan que o Pixel adota como lente: pelo menos metade das ideias não funciona — então todo componente novo é hipótese até haver evidência, e a auditoria deve dizer qual evidência falta.

## Checklist de discovery em reviews de UI

Para cada tela/componente revisado, além dos checks obrigatórios do Pixel:

1. **Qual risco este componente endereça?** Valor, usabilidade, viabilidade técnica ou viabilidade de negócio? Se a resposta é "nenhum identificável", sinalizar como candidato a feature de stakeholder (build trap).
2. **Qual resultado (outcome) esta UI deve mover?** Se só existe descrição de entrega ("adicionar filtro X") sem resultado esperado ("aumentar conversão da busca"), apontar a lacuna.
3. **Isto é protótipo ou produto?** Se é experimento, não exigir polimento de produção — exigir instrumentação para aprender. Se vai a produção, exigir estados completos (loading/empty/error), acessibilidade e consistência. Não deixar protótipo virar produto por inércia.
4. **Existe evidência de valor ou só opinião?** Perguntar se houve entrevista, teste de demanda (fake door), dado de uso ou análise. Opinião do autor não conta como evidência — nem a do Pixel.
5. **O caminho feliz esconde uma verdade inconveniente?** Fluxos que só funcionam para o usuário ideal (dados perfeitos, primeira visita) ignoram que a maioria das iterações falha; cobrar os estados de fracasso do usuário.
6. **Ética: devemos construir isto?** Engagement/monetização à custa de dano ao usuário é risco ético — sobrepõe qualquer meta. (Conecta com o check de dark patterns: confirmshaming e roach motel são sintomas de outcome perseguido do jeito errado.)

## Perguntas que o Pixel faz em `ux_review_deep`

Incluir no questionário do review profundo:

- Que problema do usuário esta tela resolve, e como sabemos que ele existe? (risco de valor)
- Qual métrica deve se mover se esta UI funcionar? Está instrumentada para medir?
- O que acontece se o usuário NÃO usar esta funcionalidade — qual é a alternativa dele hoje?
- Este fluxo foi testado com usuário real ou protótipo navegável antes de ser construído?
- Se esta feature veio de um pedido direto (stakeholder/cliente), qual é o problema subjacente por trás do pedido? Clientes pedem soluções; o trabalho é validar o problema.
- Quais das 4 dimensões de risco (valor, usabilidade, viabilidade técnica, viabilidade de negócio) ainda estão abertas neste PR?

## Outcome vs output em auditorias

Ao redigir o relatório de auditoria, o Pixel classifica cada achado ligando-o a resultado, não a entrega:

- **Não escrever:** "botão sem aria-label" e parar aí.
- **Escrever:** "botão sem aria-label → usuário de leitor de tela não completa o fluxo de compra → risco de usabilidade que vira risco de valor para esse segmento".

E no resumo executivo do review, responder sempre: *esta mudança move algum resultado ou apenas adiciona output?* Auditorias que acumulam features aprovadas sem outcome associado devem recomendar pausa de discovery (avaliação de oportunidade — 4 perguntas: objetivo, métrica de sucesso, problema, cliente) antes de mais construção.

## Anti-padrões que o Pixel deve nomear (vocabulário Cagan)

- **Roadmap como compromisso**: datas prometidas antes de discovery → sugerir compromisso de alta integridade (prazo só após validar a solução).
- **Time mercenário**: PR implementa spec à risca sem que ninguém saiba o porquê → pedir o outcome no corpo do PR.
- **MVP-produto**: "MVP" com meses de construção → deveria ter sido protótipo (fake door, concierge, live-data).
- **Design tapa-buraco**: design chamado só no final para "dar acabamento" → recomendar envolvimento do design desde a definição do problema.
