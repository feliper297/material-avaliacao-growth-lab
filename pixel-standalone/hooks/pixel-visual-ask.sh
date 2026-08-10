#!/usr/bin/env bash
# pixel-visual-ask.sh — UserPromptSubmit: lembra Pixel de perguntar modo visual antes de testar
set -uo pipefail

INPUT=$(cat)

PROMPT=$(echo "$INPUT" | python3 -c "
import sys, json
d = json.load(sys.stdin)
print(d.get('message', '') or d.get('prompt', '') or d.get('content', '') or '')
" 2>/dev/null || echo "")

[ -z "$PROMPT" ] && exit 0

HAS_PIXEL=$(echo "$PROMPT" | python3 -c "
import sys, re
text = sys.stdin.read().lower()
print('YES' if re.search(r'\\bpixel\\b', text) else '')
" 2>/dev/null || echo "")

[ -z "$HAS_PIXEL" ] && exit 0

HAS_TEST=$(echo "$PROMPT" | python3 -c "
import sys, re
text = sys.stdin.read().lower()
keywords = ['test', 'testa', 'audit', 'naveg', 'browser', 'tela', 'screen', 'visual', 'ver a', 'clica', 'abre', 'acessa', 'verif']
print('YES' if any(k in text for k in keywords) else '')
" 2>/dev/null || echo "")

[ -z "$HAS_TEST" ] && exit 0

python3 -c "
import json
msg = (
    'LEMBRETE PIXEL: project owner mencionou Pixel + teste/browser/navegacao.\n'
    'ANTES de iniciar qualquer acao no browser, OBRIGATORIAMENTE perguntar:\n\n'
    '\"Quer assistir o teste ao vivo (modo visual — screenshots em tempo real) '
    'ou posso rodar em background e te entregar o relatorio no final?\"\n\n'
    'Visual = browser_open_visible + compartilhar screenshots passo a passo.\n'
    'Background = execucao silenciosa, relatorio final apenas.\n'
    'NUNCA pular essa pergunta quando project owner pede para ver o Pixel testando.'
)
print(json.dumps({
    'hookSpecificOutput': {
        'hookEventName': 'UserPromptSubmit',
        'additionalContext': msg
    }
}))

"
