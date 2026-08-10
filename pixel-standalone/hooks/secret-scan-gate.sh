#!/usr/bin/env bash
# secret-scan-gate.sh — PreToolUse: bloqueia credencial real em Write/Edit e em
# docs Notion (notion-create-pages / notion-update-page).
# Prevencao do #454: o PIXEL_RUNTIME_TOKEN_PLACEHOLDER + 4 credenciais vazaram 2x (card Notion e
# fixture de teste). Este gate barra o padrao antes do WRITE. Nunca ecoa o segredo.
set -uo pipefail

INPUT=$(cat)

# Escaneia o input INTEIRO (cobre content/new_string/pages/new_str de qualquer tool).
# Reporta apenas o TIPO de padrao + prefixo mascarado — nunca o valor.
FOUND=$(printf '%s' "$INPUT" | python3 -c "
import sys, re

raw = sys.stdin.read()

# Padroes de credencial de alta confianca: (nome, regex)
patterns = [
    ('github_pat',      r'github_pat_[0-9A-Za-z_]{30,}'),
    ('github_ghp',      r'ghp_[0-9A-Za-z]{30,}'),
    ('notion_token',    r'ntn_[0-9A-Za-z]{30,}'),
    ('figma_pat',       r'figd_[0-9A-Za-z_-]{30,}'),
    ('openrouter_key',  r'sk-or-v1-[0-9a-f]{40,}'),
    ('anthropic_key',   r'sk-ant-[0-9A-Za-z_-]{30,}'),
    ('openai_key',      r'sk-[0-9A-Za-z]{40,}'),
    ('slack_token',     r'xox[baprs]-[0-9A-Za-z-]{20,}'),
    ('aws_akid',        r'AKIA[0-9A-Z]{16}'),
    ('bearer_hex',      r'Bearer\s+[0-9a-f]{40,}'),
    ('runtime_token_hex', r'PIXEL_RUNTIME_TOKEN_PLACEHOLDER[^0-9a-f]{1,6}[0-9a-f]{48,}'),
]

# Tokens que indicam placeholder/fake — se aparecem perto do match, ignora.
SAFE = ('FAKE', 'REDACT', 'EXAMPLE', 'PLACEHOLDER', 'XXXX', 'YOUR_', 'DUMMY',
        'CHANGEME', '<', 'process.env', '***', 'ENV[', 'OS.ENVIRON')

hits = []
for name, rx in patterns:
    for m in re.finditer(rx, raw):
        s = m.group(0)
        ctx = raw[max(0, m.start()-40):m.end()+10].upper()
        if any(tok.upper() in ctx for tok in SAFE):
            continue
        if any(tok.upper() in s.upper() for tok in SAFE):
            continue
        masked = s[:6] + '...(' + str(len(s)) + ' chars)'
        hits.append(name + ': ' + masked)

if hits:
    seen = set(); out = []
    for h in hits:
        if h not in seen:
            seen.add(h); out.append(h)
    print(' | '.join(out[:6]))
" 2>/dev/null || echo "")

if [ -n "$FOUND" ]; then
  cat <<JSON
{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"[SECRET-GATE] Possivel credencial real detectada: $FOUND. BLOQUEADO. Nunca colar secret real em codigo/doc/Notion (ver #454 - vazou 2x). Se for exemplo, use placeholder: <PIXEL_RUNTIME_TOKEN_PLACEHOLDER>, FAKE..., process.env.X. Secret real vai SO no .env (gitignored) e nos secrets do server."}}
JSON
fi
