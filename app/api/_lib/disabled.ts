import type { VercelRequest, VercelResponse } from '@vercel/node'

/** API JSON/BFF legada — desativada em produção; persistência real via Supabase + RLS. */
export function disabledLegacyApi(_req: VercelRequest, res: VercelResponse) {
  res.status(410).json({
    error: 'API legada desativada.',
    detail: 'Use autenticação Supabase. Rotas /api/* do mock Semana 1 não expõem dados em produção.',
  })
}
