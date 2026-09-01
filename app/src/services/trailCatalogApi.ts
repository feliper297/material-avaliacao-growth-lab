import { getDefaultTrailCatalog, validateCatalog } from '../../shared/domain/trail-catalog'
import type { TrailCatalog } from '../../shared/types/trail-catalog'
import { TRAIL_CATALOG_ID } from '../../shared/types/trail-catalog'
import { supabase } from '../lib/supabase'

const selectColumns = 'id, weeks, quizzes, updated_at, updated_by'

export async function fetchTrailCatalog(): Promise<TrailCatalog> {
  const { data, error } = await supabase
    .from('trail_catalog')
    .select(selectColumns)
    .eq('id', TRAIL_CATALOG_ID)
    .maybeSingle()

  if (error) {
    throw new Error(error.message)
  }

  if (!data) {
    return getDefaultTrailCatalog()
  }

  return {
    weeks: data.weeks ?? [],
    quizzes: data.quizzes ?? {},
  }
}

export async function saveTrailCatalog(catalog: TrailCatalog): Promise<TrailCatalog> {
  const errors = validateCatalog(catalog)
  if (errors.length > 0) {
    throw new Error(errors[0])
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('Usuário não autenticado.')
  }

  const payload = {
    id: TRAIL_CATALOG_ID,
    weeks: catalog.weeks,
    quizzes: catalog.quizzes,
    updated_at: new Date().toISOString(),
    updated_by: user.id,
  }

  const { data, error } = await supabase
    .from('trail_catalog')
    .upsert(payload, { onConflict: 'id' })
    .select(selectColumns)
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return {
    weeks: data.weeks ?? [],
    quizzes: data.quizzes ?? {},
  }
}

export async function ensureTrailCatalogSeeded(): Promise<TrailCatalog> {
  const { data, error } = await supabase
    .from('trail_catalog')
    .select('id')
    .eq('id', TRAIL_CATALOG_ID)
    .maybeSingle()

  if (error) {
    throw new Error(error.message)
  }

  if (data) {
    return fetchTrailCatalog()
  }

  return saveTrailCatalog(getDefaultTrailCatalog())
}
