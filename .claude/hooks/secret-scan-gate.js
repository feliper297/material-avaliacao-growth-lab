#!/usr/bin/env node
// secret-scan-gate.js — PreToolUse: bloqueia credencial real em Write/Edit antes do write.
// Reescrito em Node (sem depender de python3, indisponivel neste ambiente Windows).
// Nunca ecoa o valor do segredo — so o tipo de padrao + prefixo mascarado.
let raw = '';
process.stdin.on('data', (chunk) => { raw += chunk; });
process.stdin.on('end', () => {
  const patterns = [
    ['github_pat', /github_pat_[0-9A-Za-z_]{30,}/g],
    ['github_ghp', /ghp_[0-9A-Za-z]{30,}/g],
    ['notion_token', /ntn_[0-9A-Za-z]{30,}/g],
    ['figma_pat', /figd_[0-9A-Za-z_-]{30,}/g],
    ['openrouter_key', /sk-or-v1-[0-9a-f]{40,}/g],
    ['anthropic_key', /sk-ant-[0-9A-Za-z_-]{30,}/g],
    ['openai_key', /sk-[0-9A-Za-z]{40,}/g],
    ['slack_token', /xox[baprs]-[0-9A-Za-z-]{20,}/g],
    ['aws_akid', /AKIA[0-9A-Z]{16}/g],
    ['bearer_hex', /Bearer\s+[0-9a-f]{40,}/g],
  ];
  const SAFE = ['FAKE', 'REDACT', 'EXAMPLE', 'PLACEHOLDER', 'XXXX', 'YOUR_', 'DUMMY', 'CHANGEME', '<', 'PROCESS.ENV', '***', 'ENV[', 'OS.ENVIRON'];

  const hits = [];
  const seen = new Set();
  for (const [name, rx] of patterns) {
    let m;
    while ((m = rx.exec(raw)) !== null) {
      const s = m[0];
      const ctxStart = Math.max(0, m.index - 40);
      const ctx = raw.slice(ctxStart, m.index + s.length + 10).toUpperCase();
      if (SAFE.some((tok) => ctx.includes(tok))) continue;
      if (SAFE.some((tok) => s.toUpperCase().includes(tok))) continue;
      const label = `${name}: ${s.slice(0, 6)}...(${s.length} chars)`;
      if (!seen.has(label)) {
        seen.add(label);
        hits.push(label);
      }
      if (hits.length >= 6) break;
    }
    if (hits.length >= 6) break;
  }

  if (hits.length > 0) {
    const reason = `[SECRET-GATE] Possivel credencial real detectada: ${hits.join(' | ')}. ` +
      'BLOQUEADO. Nunca cole secret real em codigo/doc. Se for exemplo, use placeholder ' +
      '(FAKE..., <TOKEN>, process.env.X). Secret real vai SO no .env (gitignored).';
    process.stdout.write(JSON.stringify({
      hookSpecificOutput: {
        hookEventName: 'PreToolUse',
        permissionDecision: 'deny',
        permissionDecisionReason: reason,
      },
    }));
  }
  process.exit(0);
});
