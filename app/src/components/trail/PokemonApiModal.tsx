import { useCallback, useEffect, useState, type CSSProperties } from 'react'
import {
  Alert,
  Avatar,
  Button,
  List,
  Modal,
  Space,
  Spin,
  Tag,
  Typography,
  theme as antdTheme,
} from 'antd'
import { ArrowLeftOutlined, ApiOutlined, ReloadOutlined } from '@ant-design/icons'
import {
  fetchPokemonDetail,
  fetchPokemonList,
  formatPokemonName,
  getPokemonDetailUrl,
  getPokemonListUrl,
  type PokemonDetail,
  type PokemonListItem,
} from '../../services/pokemonApi'

const { Text, Paragraph } = Typography

interface PokemonApiModalProps {
  open: boolean
  onClose: () => void
  width: number | string
  style?: CSSProperties
  styles?: { body?: CSSProperties }
}

const PAGE_SIZE = 20

export function PokemonApiModal({ open, onClose, width, style, styles }: PokemonApiModalProps) {
  const { token } = antdTheme.useToken()
  const [list, setList] = useState<PokemonListItem[]>([])
  const [total, setTotal] = useState(0)
  const [offset, setOffset] = useState(0)
  const [listLoading, setListLoading] = useState(false)
  const [listError, setListError] = useState<string | null>(null)
  const [selected, setSelected] = useState<PokemonDetail | null>(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [detailError, setDetailError] = useState<string | null>(null)
  const [requestUrl, setRequestUrl] = useState(getPokemonListUrl(PAGE_SIZE, 0))

  const loadList = useCallback(async (nextOffset: number, append = false) => {
    setListLoading(true)
    setListError(null)
    setRequestUrl(getPokemonListUrl(PAGE_SIZE, nextOffset))

    try {
      const data = await fetchPokemonList(PAGE_SIZE, nextOffset)
      setTotal(data.count)
      setOffset(nextOffset)
      setList((current) => (append ? [...current, ...data.results] : data.results))
    } catch (err) {
      setListError(err instanceof Error ? err.message : 'Falha ao carregar a API.')
    } finally {
      setListLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    setSelected(null)
    setDetailError(null)
    void loadList(0)
  }, [open, loadList])

  async function openDetail(item: PokemonListItem) {
    setDetailLoading(true)
    setDetailError(null)
    setRequestUrl(getPokemonDetailUrl(item.name))

    try {
      const data = await fetchPokemonDetail(item.name)
      setSelected(data)
    } catch (err) {
      setDetailError(err instanceof Error ? err.message : 'Falha ao carregar detalhes.')
    } finally {
      setDetailLoading(false)
    }
  }

  function handleClose() {
    setSelected(null)
    setDetailError(null)
    setListError(null)
    onClose()
  }

  const canLoadMore = list.length < total

  return (
    <Modal
      open={open}
      title={
        <Space size={8}>
          <ApiOutlined />
          <span>API Pokémon — aplicação prática</span>
        </Space>
      }
      onCancel={handleClose}
      footer={null}
      destroyOnClose
      width={width}
      style={style}
      styles={styles}
    >
      <Alert
        type="info"
        showIcon
        style={{ marginBottom: 16 }}
        title="Cliente → API externa → resposta"
        description="Esta modal consome a PokéAPI pública. Observe request, loading, sucesso e erro — o mesmo fluxo de integrações reais."
      />

      <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 12 }}>
        Request: <Text code>{requestUrl}</Text>
      </Text>

      {selected ? (
        <div>
          <Button
            type="link"
            icon={<ArrowLeftOutlined />}
            onClick={() => {
              setSelected(null)
              setDetailError(null)
              setRequestUrl(getPokemonListUrl(PAGE_SIZE, offset))
            }}
            style={{ paddingInline: 0, marginBottom: 12 }}
          >
            Voltar para lista
          </Button>

          {detailLoading && (
            <div style={{ display: 'grid', placeItems: 'center', padding: 32 }}>
              <Spin />
            </div>
          )}

          {detailError && (
            <Alert type="error" showIcon title={detailError} style={{ marginBottom: 16 }} />
          )}

          {selected && !detailLoading && (
            <div
              style={{
                border: `1px solid ${token.colorBorderSecondary}`,
                borderRadius: token.borderRadiusLG,
                padding: 16,
                background: token.colorFillAlter,
              }}
            >
              <Space align="start" size={16} wrap>
                <Avatar
                  src={selected.sprites.front_default ?? undefined}
                  size={96}
                  shape="square"
                  style={{ background: `${token.colorPrimary}14` }}
                >
                  {formatPokemonName(selected.name).slice(0, 1)}
                </Avatar>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <Text strong style={{ fontSize: 18, display: 'block' }}>
                    {formatPokemonName(selected.name)}
                  </Text>
                  <Text type="secondary" style={{ display: 'block', marginBottom: 8 }}>
                    #{String(selected.id).padStart(3, '0')} · HTTP 200 · JSON
                  </Text>
                  <Space wrap size={[6, 6]} style={{ marginBottom: 12 }}>
                    {selected.types.map((entry) => (
                      <Tag key={entry.type.name} color={token.colorPrimary}>
                        {formatPokemonName(entry.type.name)}
                      </Tag>
                    ))}
                  </Space>
                  <Paragraph style={{ marginBottom: 8 }}>
                    Altura: <Text strong>{selected.height / 10} m</Text> · Peso:{' '}
                    <Text strong>{selected.weight / 10} kg</Text>
                  </Paragraph>
                  <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 6 }}>
                    Stats base
                  </Text>
                  <Space wrap size={[6, 6]}>
                    {selected.stats.map((entry) => (
                      <Tag key={entry.stat.name}>
                        {formatPokemonName(entry.stat.name)}: {entry.base_stat}
                      </Tag>
                    ))}
                  </Space>
                </div>
              </Space>
            </div>
          )}
        </div>
      ) : (
        <>
          {listError && (
            <Alert
              type="error"
              showIcon
              title={listError}
              style={{ marginBottom: 16 }}
              action={
                <Button size="small" icon={<ReloadOutlined />} onClick={() => void loadList(offset)}>
                  Tentar novamente
                </Button>
              }
            />
          )}

          <List
            loading={listLoading && list.length === 0}
            dataSource={list}
            locale={{ emptyText: listLoading ? 'Carregando...' : 'Nenhum Pokémon encontrado.' }}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button key="open" type="link" onClick={() => void openDetail(item)}>
                    Ver detalhes
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  title={formatPokemonName(item.name)}
                  description={
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      GET /pokemon/{item.name}
                    </Text>
                  }
                />
              </List.Item>
            )}
          />

          {canLoadMore && (
            <div style={{ marginTop: 12, textAlign: 'center' }}>
              <Button loading={listLoading} onClick={() => void loadList(offset + PAGE_SIZE, true)}>
                Carregar mais
              </Button>
            </div>
          )}
        </>
      )}
    </Modal>
  )
}
