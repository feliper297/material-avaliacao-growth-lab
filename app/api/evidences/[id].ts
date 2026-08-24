import type { VercelRequest, VercelResponse } from '@vercel/node'
import { disabledLegacyApi } from '../_lib/disabled.js'

export default function handler(req: VercelRequest, res: VercelResponse) {
  disabledLegacyApi(req, res)
}
