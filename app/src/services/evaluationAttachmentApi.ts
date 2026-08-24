import { supabase } from '../lib/supabase'
import type { EvaluationAttachment } from '../../shared/types/evaluation'

const BUCKET = 'evaluation-prints'

function sanitizeFileName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, '-').slice(0, 80)
}

function buildStoragePath(learnerId: string, scope: 'week' | 'final', week: number | null, fileName: string) {
  const scopeKey = scope === 'week' ? `week-${week}` : 'final'
  return `${learnerId}/${scopeKey}/${Date.now()}-${sanitizeFileName(fileName)}`
}

export function createAttachment(url: string, name: string): EvaluationAttachment {
  return {
    id: crypto.randomUUID(),
    url,
    name,
    createdAt: new Date().toISOString(),
  }
}

export async function uploadEvaluationPrint(
  file: File,
  learnerId: string,
  scope: 'week' | 'final',
  week: number | null,
): Promise<EvaluationAttachment> {
  if (!file.type.startsWith('image/')) {
    throw new Error('Envie apenas arquivos de imagem.')
  }

  const path = buildStoragePath(learnerId, scope, week, file.name)
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
    contentType: file.type,
  })

  if (error) throw new Error(error.message)

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return createAttachment(data.publicUrl, file.name)
}

export async function removeEvaluationPrint(url: string) {
  const marker = `/storage/v1/object/public/${BUCKET}/`
  const index = url.indexOf(marker)
  if (index === -1) return

  const path = decodeURIComponent(url.slice(index + marker.length))
  const { error } = await supabase.storage.from(BUCKET).remove([path])
  if (error) throw new Error(error.message)
}

export function parseEvaluationAttachments(value: unknown): EvaluationAttachment[] {
  if (!Array.isArray(value)) return []

  return value
    .map((item) => {
      if (!item || typeof item !== 'object') return null
      const record = item as Record<string, unknown>
      if (typeof record.url !== 'string' || !record.url.trim()) return null

      return {
        id: typeof record.id === 'string' ? record.id : crypto.randomUUID(),
        url: record.url,
        name: typeof record.name === 'string' && record.name.trim() ? record.name : 'Print',
        createdAt: typeof record.createdAt === 'string' ? record.createdAt : new Date().toISOString(),
      } satisfies EvaluationAttachment
    })
    .filter((item): item is EvaluationAttachment => item != null)
}
