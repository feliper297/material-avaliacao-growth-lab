# Prompt de instalacao do Pixel

Use este prompt no Claude, Cursor ou ferramenta equivalente depois de extrair o zip na raiz do
projeto onde o Pixel sera instalado.

```text
Voce vai instalar o agente Pixel neste ambiente.

Leia primeiro:
1. PIXEL_NOTION_TUTORIAL.md
2. pixel-package-manifest.md
3. .claude/skills/pixel-core/SKILL.md
4. .claude/skills/pixel/SKILL.md
5. .claude/skills/pixel-monster/SKILL.md

Objetivo:
- instalar as skills do Pixel no formato aceito por esta ferramenta;
- configurar o brain local de Pixel sem depender de servidor externo;
- configurar hooks equivalentes para:
  - perguntar modo visual/background antes de qualquer teste de browser;
  - bloquear secrets/tokens em writes;
- configurar modelos:
  - Pixel normal: use o melhor modelo rapido/confiavel disponivel;
  - Pixel Monster: Opus como auditor principal se disponivel;
  - Pixel Monster: GPT-5.6 como segundo auditor/upgrade se disponivel;
  - se um modelo nao existir, pergunte qual modelo equivalente usar;
- pedir as configuracoes locais em vez de assumir caminhos, hosts ou tokens.

Antes de alterar arquivos, pergunte:
1. Qual e a raiz do projeto alvo?
2. A ferramenta usa pasta .claude/skills, .cursor/rules, AGENTS.md, ou outro formato?
3. Qual comando abre browser/teste visual neste ambiente?
4. Quais modelos estao disponiveis para Pixel normal e Pixel Monster?
5. Onde o brain local deve ficar?

Regras:
- Nao use paths, hosts, tokens ou credenciais do pacote como se fossem reais.
- Nao invente acesso a Opus ou GPT-5.6; teste disponibilidade ou pergunte.
- Nunca rode teste de browser sem perguntar visual/background.
- Achado sem fonte do brain deve ser [HYPOTHESIS], nunca [CONFIRMED].
- Pixel audita/dirige; implementacao de codigo e tarefa separada.

Ao final, entregue:
- arquivos instalados;
- modelos configurados;
- hooks ativados ou equivalentes criados;
- comando de smoke test;
- uma auditoria exemplo pequena usando o taste profile e uma fonte do brain.
```
