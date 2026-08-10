# Registro do estado inicial

Preencha este arquivo antes da primeira alteração. O objetivo é criar uma baseline da avaliação, não adivinhar a causa dos problemas.

## Como foi executado

- Comando: `python -m http.server 4173` (Windows PowerShell, pasta `projeto-base/`)
- Navegador e viewport: análise via código-fonte + servidor HTTP em `http://127.0.0.1:4173/` (Status 200)
- Data: 2026-08-05

## Observações

- **Fluxo de primeiro uso:** a tela abre direto na trilha de Product Design com conteúdos pré-carregados das 4 semanas. Não há wizard para iniciar ciclo, definir objetivo âncora ou data de início. O usuário pode marcar conteúdos como concluídos ou abrir links externos.
- **Fluxo de evidência:** modal funcional com semana, tipo, título, link e descrição. Salva em `localStorage` (`growthlab.evidences`). Estado vazio explícito quando não há registros. Sem vínculo a critério de evolução.
- **Fluxo de avaliação:** seis dimensões com sliders (1–5), default 3.0 sem justificativa. Botão "Salvar avaliação" persiste em `localStorage`. Não há baseline inicial separada, check-in semanal, papel de avaliador externo nem comparação temporal.
- **Persistência após recarregar:** sim — `completed`, `evidences`, `scores`, `quizzes`, `theme` em `localStorage`. Sem confirmação explícita de persistência além do toast.
- **Estados vazios:** evidências sim (card dashed); conteúdos e scores não têm empty state orientador; ciclo sempre mostra "Ciclo iniciado".
- **Estados de erro:** inexistentes para falha de `localStorage`, validação de formulário ou rede. Quiz mostra aviso se perguntas incompletas. Sem estado de salvamento/processamento.
- **Responsividade:** sidebar fixa com menu mobile abaixo de 820px; grids colapsam em breakpoints 1080/820/560px. Hero panel oculto em mobile pequeno.
- **Acessibilidade:** parcial — `aria-label` em botões de tema/menu, `aria-modal` nos modais, `lang="pt-BR"`. Sem focus trap nos modais, skip link, ou anúncio de toast para leitores de tela. Contraste aparentemente adequado nos tokens light/dark.
- **Console ou rede:** SPA estática, sem requests além do HTML. Links externos para Figma, MDN, ChatGPT Study Mode. Export gera blob JSON local.

## Hipóteses

- [HIPÓTESE] O protótipo foi desenhado para trilha de Product Design, não para o sistema de avaliação dupla descrito no pacote Growth Lab.
- [HIPÓTESE] Progresso mede atividade (conteúdos marcados + contagem de evidências), não capacidade ou evolução comparável ao baseline.
- [HIPÓTESE] "Tutor de IA" é gerador de prompt para copiar ao ChatGPT — não registra prompt, resposta, decisão ou verificação dentro do sistema.
- [HIPÓTESE] Manter o arquivo monolítico (`index.html` ~2000 linhas) dificulta testes, contratos e evolução arquitetural exigida pelo MVP.

## Evidências coletadas

- Screenshot ou vídeo: pendente (captura manual na próxima sessão navegável)
- Teste ou reprodução: servidor HTTP responde 200 em `http://127.0.0.1:4173/`
- Arquivo e linha: `projeto-base/index.html` — persistência L1466–1471, progresso L1499–1505, scores default L1818, ausência de ciclo/baseline/check-in/feedback/histórico

## Decisão inicial

- **Manter:** tokens visuais (cores, radius, tipografia), padrão de cards/modais/toast, ideia de evidência com tipo e descrição, export JSON como ponto de partida para histórico.
- **Refatorar:** layout sidebar + conteúdo, componentes visuais extraídos para stack moderna.
- **Reconstruir:** fluxos de ciclo 30 dias, baseline com critérios justificados, próxima ação rastreável, estudo com definição de concluído, check-in semanal, nota/feedback do avaliador, histórico comparável, log de IA integrado, tutor guiado por perguntas (uma por vez).
- **Adiar:** agente autônomo completo, BFF/back-end real, CI/CD, Storybook completo, deploy — para fases 2–4 conforme pacote.
