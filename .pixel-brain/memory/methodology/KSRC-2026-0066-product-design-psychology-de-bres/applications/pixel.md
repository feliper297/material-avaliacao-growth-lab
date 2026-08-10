# Application: pixel

> Como o Pixel (Product Experience Architect — UX, produto e auditoria visual do Pixel Runtime) aplica *Product Design Psychology* (Wouter de Bres) em reviews de UI e em `ux_review_deep`.

## Princípio operacional

Se o [[KSRC-2026-0065]] (Cagan/Inspirado) deu ao Pixel a lente de **produto** (risco de valor: o usuário escolheria usar?), esta fonte dá a lente de **psicologia comportamental**: toda decisão de design é uma aposta sobre como uma pessoa vai pensar, sentir ou agir — e a maioria dos erros de design vem de entender mal as pessoas, não de estética ruim. O Pixel audita em quatro planos, na ordem em que os vieses aparecem:

1. **A mente do próprio avaliador** — o Pixel primeiro desconfia de si mesmo.
2. **A interface** — o que a tela comunica antes de qualquer texto (affordance, carga cognitiva, padrão, primeiro/último momento).
3. **O usuário real** — que diverge do usuário ideal (hábito, emoção, excesso de opção, o que diz vs faz).
4. **A organização** — a dinâmica que faz um bom design morrer (HiPPO, teatro de métrica, redesign como fuga).

## Plano 1 — vieses do próprio Pixel (auto-auditoria antes de auditar)

Antes de julgar uma tela, o Pixel neutraliza os vieses do avaliador:

- **Maldição do conhecimento**: o Pixel conhece o produto — o usuário não. Não confundir "óbvio pra mim" com "intuitivo". "Design intuitivo" quase sempre significa "familiar", não "auto-evidente".
- **Apego à primeira ideia / viés de confirmação**: não validar o primeiro layout proposto só porque foi o primeiro; procurar ativamente a evidência que o derrubaria.
- **Design pro próprio ego / gosto ≠ talento**: separar preferência estética pessoal de eficácia mensurável. "Feio mas funciona" vence "bonito mas confunde".
- **Pressa deixa burro**: sob deadline, o Pixel tende a aprovar o caminho feliz e pular os estados de fracasso — justamente quando o rigor mais importa.

## Plano 2 — checklist de percepção da interface

Para cada tela, além dos checks WCAG/Nielsen obrigatórios:

1. **Vibe check (primeiros 50ms)**: a impressão instantânea comunica confiança/competência? Fluência de processamento — o que é fácil de processar é percebido como mais verdadeiro e usável.
2. **Affordance visível**: o que é clicável parece clicável? Parar de esconder ação atrás de estética plana. O elemento anuncia sua função sem instrução?
3. **Carga cognitiva**: a UI está exaustiva? Cada opção, campo e escolha cobra imposto mental (lei de Hick). Menos é mais rápido.
4. **Consistência de padrão**: quebrar convenção estabelecida = obrigar reaprendizado. Inovar na aparência, nunca na mecânica esperada.
5. **Primeiro e último momento**: desenhar o último momento primeiro (efeito peak-end: a memória do fluxo é dominada pelo pico e pelo fim). Fechamento e confirmação importam desproporcionalmente.
6. **Feedback de progresso**: progresso percebido motiva mesmo quando é parcialmente ilusório (barras, etapas, endowed progress) — ausência de feedback lê como travamento.

## Plano 3 — o usuário real diverge do ideal

O Pixel cobra que o fluxo funcione para o usuário real, não o idealizado:

- **Usuário não pensa em tarefas** — pensa em objetivos e contexto; não force o modelo mental do sistema sobre ele.
- **Quer agora, não depois** (desconto hiperbólico): benefício futuro perde para atrito presente. Reduzir custo imediato de agir.
- **Diz uma coisa, faz outra**: pesquisa declarada ≠ comportamento; exigir teste de comportamento, não só opinião (conecta com o check de evidência do Cagan).
- **Reage, depois racionaliza**: a primeira reação é emocional; a justificativa vem depois. O design fala com o sistema rápido primeiro.
- **Vai odiar o redesign** (aversão à perda + mera exposição): resistência a mudança é default, não sinal de design ruim — planejar transição, não só o estado final.
- **Excesso de opção faz desistir** (paradoxo da escolha): mais alternativas ≠ mais valor; curar o padrão.
- **Vai ignorar você** (banner blindness, cegueira a instrução): ninguém lê o texto de ajuda; o design tem que funcionar sem ele.

## Plano 4 — anti-padrões organizacionais que o Pixel deve nomear

Quando um achado tem causa organizacional, o Pixel nomeia o mecanismo em vez de só descrever o sintoma:

- **HiPPO** (opinião do mais bem pago): "shipamos o que o chefe gosta" — pedir o problema do usuário por trás do pedido, não a solução do stakeholder.
- **Teatro de métrica / lei de Goodhart**: a métrica não é o usuário; quando a métrica vira meta, deixa de medir o que importava. Métrica de vaidade que sobe sem resultado real = alerta.
- **Redesign como fuga**: trocar a casca não conserta problema de fundo; um redesign raramente salva um produto sem valor.
- **Custo afundado / "melhor shipar que admitir"**: seguir com o errado por já ter investido; nomear o sunk cost.
- **Pesquisa como álibi**: pesquisa encomendada só para justificar a decisão já tomada, não para arriscá-la. Perguntar o que a pesquisa poderia ter invalidado.
- **Resolveu o problema errado**: solução elegante para o problema que ninguém tinha — voltar ao problema antes de aplaudir a execução.

## Como isso entra no relatório de `ux_review_deep`

- Ligar cada achado ao **mecanismo psicológico** nomeado (não "confuso" → "quebra de padrão esperado força reaprendizado → carga cognitiva → abandono").
- No resumo executivo, uma linha de auto-auditoria: *quais vieses do próprio avaliador podem estar em jogo neste review?*
- Complementa [[KSRC-2026-0065]] (valor/discovery) e as heurísticas de Nielsen/WCAG já usadas — esta fonte é a camada comportamental que explica *por que* as heurísticas funcionam.
