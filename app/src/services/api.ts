import type { AppStore, Evidence } from '../../shared/types/store'
import type { EvidenceInput } from '../../shared/domain/evidence'

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...init?.headers },
    ...init,
  })
  if (!response.ok) {
    const body = await response.json().catch(() => ({}))
    throw new Error((body as { error?: string }).error ?? `Erro HTTP ${response.status}`)
  }
  return response.json() as Promise<T>
}

export const api = {
  health: () => request<{ ok: boolean; persistence: string }>('/api/health'),
  getState: () => request<AppStore>('/api/state'),
  saveState: (store: AppStore) =>
    request<{ ok: boolean }>('/api/state', { method: 'PUT', body: JSON.stringify(store) }),
  addEvidence: (input: EvidenceInput) =>
    request<Evidence>('/api/evidences', { method: 'POST', body: JSON.stringify(input) }),
  deleteEvidence: (id: string) =>
    request<{ ok: boolean }>(`/api/evidences/${id}`, { method: 'DELETE' }),
}
