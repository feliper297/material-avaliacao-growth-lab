# Checklist de entrega

Autor: Bruno Liberato Girardi

## Produto

- [ ] Ciclo de 30 dias inicia com objetivo e data.
- [ ] Avaliacao inicial e avaliacao final sao diferentes registros.
- [ ] Existe uma proxima acao clara.
- [ ] Materiais tem duracao, objetivo e pratica.
- [ ] Evidencias tem criterio relacionado e resultado observado.
- [ ] Check-in semanal pode ser salvo e retomado.
- [ ] Checkup final mostra variacao por criterio.
- [ ] Historico ou exportacao e compreensivel.

## Arquitetura

- [ ] Front-end, BFF, back-end, banco e agentes possuem responsabilidades claras.
- [ ] Cada separacao possui justificativa.
- [ ] Contratos e entidades estao documentados.
- [ ] Mock, persistencia real e integracao real estao diferenciados.
- [ ] Agentes possuem ferramentas, limites, guardrails e logs.

## Design system

- [ ] Tokens principais existem.
- [ ] Componentes reutilizaveis existem.
- [ ] Estados default, focus, loading, success, error e empty foram tratados.
- [ ] Stories ou equivalente cobrem os estados relevantes.
- [ ] Auto Layout e fundamentos visuais foram tratados apenas como base.

## Testes

- [ ] Testes de unidade ou componente foram escolhidos com justificativa.
- [ ] Jornada de primeiro uso foi testada.
- [ ] Jornada de evidencia foi testada.
- [ ] Jornada de checkup mensal foi testada.
- [ ] Falhas de rede, dados vazios e salvamento foram testadas.
- [ ] Teste em desktop e mobile foi executado no navegador real.
- [ ] Acessibilidade basica foi verificada.

## CI/CD e deploy

- [ ] CI executa lint, typecheck, testes e build quando aplicavel.
- [ ] Existe link ou log da execucao.
- [ ] Existe URL ou evidencia do deploy quando estiver no escopo.
- [ ] Variaveis de ambiente e segredos estao documentados sem vazar valores.
- [ ] Healthcheck ou smoke test foi definido.
- [ ] Rollback ou procedimento de recuperacao foi descrito.

## Uso de IA

- [ ] Ha registro de pelo menos tres usos de IA.
- [ ] Prompts, respostas, correcoes e decisoes humanas estao documentados.
- [ ] O diff gerado por IA foi revisado.
- [ ] Nenhuma afirmacao de funcionamento depende apenas da resposta da IA.
- [ ] O executor consegue explicar cada decisao principal sem consultar o prompt.

