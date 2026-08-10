#!/usr/bin/env node
// pixel-visual-ask.js — UserPromptSubmit: lembra o Pixel de perguntar modo visual/background
// antes de qualquer teste de browser. Reescrito em Node (sem depender de python3, indisponivel
// neste ambiente Windows — so ha o stub do Microsoft Store).
let raw = '';
process.stdin.on('data', (chunk) => { raw += chunk; });
process.stdin.on('end', () => {
  let prompt = '';
  try {
    const data = JSON.parse(raw || '{}');
    prompt = data.message || data.prompt || data.content || '';
  } catch {
    process.exit(0);
  }
  if (!prompt) process.exit(0);

  const text = prompt.toLowerCase();
  if (!/\bpixel\b/.test(text)) process.exit(0);

  const keywords = ['test', 'testa', 'audit', 'naveg', 'browser', 'tela', 'screen', 'visual', 'ver a', 'clica', 'abre', 'acessa', 'verif'];
  if (!keywords.some((k) => text.includes(k))) process.exit(0);

  const msg = [
    'LEMBRETE PIXEL: usuario mencionou Pixel + teste/browser/navegacao.',
    'ANTES de iniciar qualquer acao de browser (Playwright), OBRIGATORIAMENTE perguntar:',
    '',
    '"Quer assistir o teste ao vivo (modo visual — browser abre visivel, screenshots em tempo real)',
    ' ou posso rodar em background (headless) e te entregar o relatorio no final?"',
    '',
    'Visual = script pixel-screenshot.mjs com --headed + compartilhar screenshots passo a passo.',
    'Background = script sem --headed, execucao silenciosa, relatorio final apenas.',
    'NUNCA pular essa pergunta quando o usuario pede para ver o Pixel testando.',
  ].join('\n');

  process.stdout.write(JSON.stringify({
    hookSpecificOutput: {
      hookEventName: 'UserPromptSubmit',
      additionalContext: msg,
    },
  }));
});
