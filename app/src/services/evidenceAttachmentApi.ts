import { supabase } from '../lib/supabase'
import type { EvidenceAttachment } from '../../shared/types/store'

const BUCKET = 'evidence-files'

const ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'application/pdf',
]

function sanitizeFileName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, '-').slice(0, 80)
}

function buildStoragePath(userId: string, week: number, fileName: string) {
  return `${userId}/week-${week}/${Date.now()}-${sanitizeFileName(fileName)}`
}

export function createEvidenceAttachment(url: string, name: string): EvidenceAttachment {
  return {
    id: crypto.randomUUID(),
    url,
    name,
    createdAt: new Date().toISOString(),
  }
}

export async function uploadEvidenceFile(
  file: File,
  userId: string,
  week: number,
): Promise<EvidenceAttachment> {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('Envie imagem (JPEG, PNG, WebP, GIF) ou PDF.')
  }

  const path = buildStoragePath(userId, week, file.name)
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
    contentType: file.type,
  })

  if (error) throw new Error(error.message)

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return createEvidenceAttachment(data.publicUrl, file.name)
}

export async function removeEvidenceFile(url: string) {
  const marker = `/storage/v1/object/public/${BUCKET}/`
  const index = url.indexOf(marker)
  if (index === -1) return

  const path = decodeURIComponent(url.slice(index + marker.length))
  const { error } = await supabase.storage.from(BUCKET).remove([path])
  if (error && !/not found|object not found|404/i.test(error.message)) {
    throw new Error(error.message)
  }
}

export function parseEvidenceAttachments(value: unknown): EvidenceAttachment[] {
  if (!Array.isArray(value)) return []

  return value
    .map((item) => {
      if (!item || typeof item !== 'object') return null
      const record = item as Record<string, unknown>
      if (typeof record.url !== 'string' || !record.url.trim()) return null

      return {
        id: typeof record.id === 'string' ? record.id : crypto.randomUUID(),
        url: record.url,
        name: typeof record.name === 'string' && record.name.trim() ? record.name : 'Arquivo',
        createdAt: typeof record.createdAt === 'string' ? record.createdAt : new Date().toISOString(),
      } satisfies EvidenceAttachment
    })
    .filter((item): item is EvidenceAttachment => item != null)
}
