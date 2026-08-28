const BASE_URL = 'https://pokeapi.co/api/v2'

export interface PokemonListItem {
  name: string
  url: string
}

export interface PokemonListResponse {
  count: number
  next: string | null
  previous: string | null
  results: PokemonListItem[]
}

export interface PokemonDetail {
  id: number
  name: string
  height: number
  weight: number
  sprites: {
    front_default: string | null
  }
  types: Array<{ type: { name: string } }>
  stats: Array<{ base_stat: number; stat: { name: string } }>
}

export function getPokemonListUrl(limit: number, offset: number) {
  return `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
}

export function getPokemonDetailUrl(nameOrId: string | number) {
  return `${BASE_URL}/pokemon/${nameOrId}`
}

export async function fetchPokemonList(limit = 20, offset = 0): Promise<PokemonListResponse> {
  const response = await fetch(getPokemonListUrl(limit, offset))
  if (!response.ok) {
    throw new Error(`Falha ao buscar lista (HTTP ${response.status}).`)
  }
  return response.json() as Promise<PokemonListResponse>
}

export async function fetchPokemonDetail(nameOrId: string | number): Promise<PokemonDetail> {
  const response = await fetch(getPokemonDetailUrl(nameOrId))
  if (!response.ok) {
    throw new Error(`Falha ao buscar Pokémon (HTTP ${response.status}).`)
  }
  return response.json() as Promise<PokemonDetail>
}

export function formatPokemonName(name: string) {
  return name
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}
