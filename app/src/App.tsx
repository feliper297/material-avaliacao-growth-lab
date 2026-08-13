import { useMemo, useState, type ReactNode } from 'react'
import {
  App as AntApp,
  Avatar,
  Button,
  Card,
  Col,
  ConfigProvider,
  Empty,
  Layout,
  Menu,
  type MenuProps,
  Modal,
  Progress,
  Row,
  Slider,
  Space,
  Spin,
  Statistic,
  Steps,
  Tag,
  theme as antdTheme,
  Typography,
} from 'antd'
import ptBR from 'antd/locale/pt_BR'
import { useAuth } from './hooks/useAuth'
import { LoginScreen } from './components/auth/LoginScreen'
import {
  ApiOutlined,
  AppstoreOutlined,
  ArrowUpOutlined,
  BulbFilled,
  BulbOutlined,
  CheckCircleOutlined,
  CompassOutlined,
  DeleteOutlined,
  DownloadOutlined,
  ExclamationCircleOutlined,
  FileSearchOutlined,
  HomeOutlined,
  LinkOutlined,
  LogoutOutlined,
  PlusOutlined,
  PrinterOutlined,
  RobotOutlined,
  StarOutlined,
  TrophyOutlined,
} from '@ant-design/icons'
import { ALL_RESOURCE_IDS, WEEKS, weekAccentHex, type TrailWeek } from '../shared/data/weeks'
import { calculateAverage, getCycleStatus, getOverallProgress, getWeekProgress } from '../shared/domain/progress'
import { SCORE_DIMENSIONS } from '../shared/types/store'
import { EvidenceForm } from './components/trail/EvidenceForm'
import { PromptPanel } from './components/trail/PromptPanel'
import { QuizForm } from './components/trail/QuizForm'
import { WeekSection } from './components/trail/WeekSection'
import { useStore } from './hooks/useStore'

const { Sider, Header, Content } = Layout
const { Title, Text, Paragraph } = Typography

const NAV_ITEMS: { href: string; label: string }[] = [
  { href: '#overview', label: 'Visão geral' },
  ...WEEKS.map((w) => ({ href: `#week-${w.id}`, label: `S${w.id} · ${w.title}` })),
  { href: '#evidences', label: 'Evidências' },
  { href: '#assessment', label: 'Avaliação final' },
]

export default function App() {
  const auth = useAuth()
  const store = useStore()

  const isDark = store.store.theme === 'dark'

  if (auth.status === 'loading') {
    return (
      <div style={{ display: 'grid', placeItems: 'center', minHeight: '100vh' }}>
        <Spin size="large" />
      </div>
    )
  }

  if (auth.status === 'unauthenticated') {
    return (
      <ConfigProvider
        locale={ptBR}
        theme={{ algorithm: antdTheme.defaultAlgorithm, token: { colorPrimary: '#0958d9' } }}
      >
        <AntApp>
          <LoginScreen />
        </AntApp>
      </ConfigProvider>
    )
  }

  return (
    <ConfigProvider
      locale={ptBR}
      theme={{
        algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        token: { colorPrimary: '#0958d9' },
        components: isDark
          ? { Slider: { colorTextDescription: 'rgba(255, 255, 255, 0.65)' } }
          : undefined,
      }}
    >
      <AntApp>
        <AppShell {...store} onSignOut={auth.signOut} />
      </AntApp>
    </ConfigProvider>
  )
}

function AppShell({
  store,
  loadStatus,
  saveStatus,
  error,
  scoresDirty,
  toggleComplete,
  addEvidence,
  deleteEvidence,
  saveQuiz,
  saveScores,
  updateScore,
  setTheme,
  exportProgress,
  onSignOut,
}: ReturnType<typeof useStore> & { onSignOut: () => void }) {
  const { message, modal } = AntApp.useApp()
  const { token } = antdTheme.useToken()

  const [evidenceOpen, setEvidenceOpen] = useState(false)
  const [evidenceWeek, setEvidenceWeek] = useState(1)
  const [quizWeek, setQuizWeek] = useState<TrailWeek | null>(null)
  const [prompt, setPrompt] = useState<{ topic: string; link: string; week: string } | null>(null)

  const progress = useMemo(
    () => getOverallProgress(store.completed.length, ALL_RESOURCE_IDS.length, store.evidences.length),
    [store],
  )
  const average = useMemo(() => calculateAverage(store.scores, SCORE_DIMENSIONS.length), [store.scores])

  const navIcon: Record<string, { icon: ReactNode; color: string }> = {
    '#overview': { icon: <HomeOutlined />, color: token.colorPrimary },
    '#week-1': { icon: <AppstoreOutlined />, color: weekAccentHex(1) },
    '#week-2': { icon: <CompassOutlined />, color: weekAccentHex(2) },
    '#week-3': { icon: <ApiOutlined />, color: weekAccentHex(3) },
    '#week-4': { icon: <RobotOutlined />, color: weekAccentHex(4) },
    '#evidences': { icon: <FileSearchOutlined />, color: token.colorInfo },
    '#assessment': { icon: <TrophyOutlined />, color: token.colorWarning },
  }

  const menuItems: MenuProps['items'] = NAV_ITEMS.map((item) => {
    const meta = navIcon[item.href]
    return {
      key: item.href,
      icon: (
        <Avatar size={24} shape="square" style={{ background: `${meta.color}1f`, color: meta.color, fontSize: 13 }}>
          {meta.icon}
        </Avatar>
      ),
      label: item.label,
      title: item.label,
    }
  })

  async function handleToggle(id: string) {
    const wasDone = store.completed.includes(id)
    await toggleComplete(id)
    message.success(wasDone ? 'Conteúdo marcado como pendente.' : 'Conteúdo concluído.')
  }

  if (loadStatus === 'loading') {
    return (
      <div style={{ display: 'grid', placeItems: 'center', minHeight: '100vh' }}>
        <Space orientation="vertical" align="center">
          <Progress type="circle" percent={70} size={48} />
          <Text type="secondary">Carregando trilha…</Text>
        </Space>
      </div>
    )
  }

  if (loadStatus === 'error') {
    return (
      <div style={{ display: 'grid', placeItems: 'center', minHeight: '100vh', padding: 24 }}>
        <Card style={{ maxWidth: 420 }}>
          <Title level={4} type="danger">
            Erro ao carregar
          </Title>
          <Paragraph type="secondary">{error}</Paragraph>
          <Paragraph type="secondary" style={{ fontSize: 12 }}>
            Verifique se o BFF está rodando: <Text code>npm run dev:server</Text>
          </Paragraph>
        </Card>
      </div>
    )
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        width={280}
        theme={store.theme}
        className="no-print"
        style={{ borderRight: `1px solid ${token.colorBorderSecondary}` }}
      >
        <div style={{ padding: 20 }}>
          <Space align="center" style={{ marginBottom: 20 }}>
            <Avatar shape="square" style={{ background: token.colorPrimary }}>
              G
            </Avatar>
            <div>
              <Text strong>Growth Lab</Text>
              <br />
              <Text type="secondary" style={{ fontSize: 12 }}>
                Product Design · 30 dias
              </Text>
            </div>
          </Space>

          <Card size="small" style={{ marginBottom: 16 }}>
            <Text type="secondary" style={{ fontSize: 11, textTransform: 'uppercase' }}>
              Progresso geral
            </Text>
            <br />
            <Text strong>{getCycleStatus(progress)}</Text>
            <Progress percent={progress} size="small" style={{ marginTop: 8 }} />
            <Space style={{ width: '100%', justifyContent: 'space-between', marginTop: 4 }}>
              <Text type="secondary" style={{ fontSize: 11 }}>
                {store.completed.length} de {ALL_RESOURCE_IDS.length} conteúdos
              </Text>
              <Text type="secondary" style={{ fontSize: 11 }}>
                {store.evidences.length} evidência{store.evidences.length === 1 ? '' : 's'}
              </Text>
            </Space>
          </Card>

          <Menu
            mode="inline"
            theme={store.theme}
            selectable={false}
            items={menuItems}
            style={{ border: 'none' }}
            onClick={({ key }) => {
              document.getElementById(key.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' })
            }}
          />

          <Paragraph type="secondary" style={{ fontSize: 11, marginTop: 16 }}>
            Estudar → explicar → testar → aplicar → registrar evidência. Conteúdo sem aplicação não conclui a etapa.
          </Paragraph>
        </div>
      </Sider>

      <Layout>
        <Header
          className="no-print"
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 20,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 8,
            rowGap: 4,
            background: token.colorBgContainer,
            borderBottom: `1px solid ${token.colorBorderSecondary}`,
            padding: '10px clamp(12px, 4vw, 24px)',
            height: 'auto',
            minHeight: 64,
          }}
        >
          <Space wrap>
            {saveStatus === 'saving' && <Text type="secondary">Salvando…</Text>}
            {saveStatus === 'error' && <Text type="danger">Erro ao salvar</Text>}
          </Space>
          <Space wrap>
            <Button
              icon={store.theme === 'dark' ? <BulbFilled /> : <BulbOutlined />}
              onClick={() => setTheme(store.theme === 'light' ? 'dark' : 'light')}
              aria-label="Alternar tema"
            />
            <Button
              icon={<DownloadOutlined />}
              onClick={() => {
                exportProgress()
                message.success('Progresso exportado.')
              }}
            >
              Exportar
            </Button>
            <Button type="primary" icon={<PrinterOutlined />} onClick={() => window.print()}>
              Imprimir
            </Button>
            <Button
              icon={<LogoutOutlined />}
              onClick={() => onSignOut()}
            >
              Sair
            </Button>
          </Space>
        </Header>

        <Content style={{ padding: 24, maxWidth: 1120, margin: '0 auto', width: '100%' }}>
          <Card
            id="overview"
            style={{ marginBottom: 16, background: token.colorPrimaryBg, borderColor: token.colorPrimaryBorder }}
            styles={{ body: { padding: 28 } }}
          >
            <Row gutter={[32, 24]} align="middle">
              <Col xs={24} lg={15}>
                <Tag style={{ marginBottom: 12, background: '#2f54eb', color: '#fff', border: 'none' }}>
                  Desenvolvimento aplicado à sprint
                </Tag>
                <Title level={2} style={{ marginTop: 0, marginBottom: 12 }}>
                  Evolução visível, não apenas conteúdo assistido.
                </Title>
                <Paragraph type="secondary" style={{ maxWidth: 540 }}>
                  Trilha de 30 dias para qualidade, raciocínio de produto, sistemas, IA e autonomia — com aplicação
                  em demandas reais.
                </Paragraph>
                <Space wrap>
                  <Button
                    type="primary"
                    size="large"
                    onClick={() => document.getElementById('week-1')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Começar trilha
                  </Button>
                  <Button
                    size="large"
                    icon={<RobotOutlined />}
                    onClick={() =>
                      setPrompt({ topic: 'Trilha completa de Product Design', link: '', week: 'Ciclo de 30 dias' })
                    }
                  >
                    Abrir tutor de IA
                  </Button>
                </Space>
              </Col>
              <Col xs={24} lg={9}>
                <Card size="small">
                  <Text strong>Mapa do ciclo</Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    4 semanas · quatro checkpoints
                  </Text>
                  <Steps
                    orientation="vertical"
                    size="small"
                    style={{ marginTop: 16 }}
                    items={WEEKS.map((w) => {
                      const p = getWeekProgress(w, store)
                      return {
                        title: `Semana ${w.id}`,
                        content: w.title,
                        status: p >= 100 ? 'finish' : p > 0 ? 'process' : 'wait',
                      }
                    })}
                  />
                </Card>
              </Col>
            </Row>
          </Card>

          <Row gutter={16} style={{ marginBottom: 16 }}>
            {[
              { label: 'Progresso de aprendizagem', value: `${progress}%`, icon: <ArrowUpOutlined />, color: token.colorPrimary },
              { label: 'Conteúdos concluídos', value: store.completed.length, icon: <CheckCircleOutlined />, color: token.colorSuccess },
              { label: 'Evidências registradas', value: store.evidences.length, icon: <FileSearchOutlined />, color: token.colorInfo },
              { label: 'Média de avaliação', value: average.toFixed(1), icon: <StarOutlined />, color: token.colorWarning },
            ].map((stat) => (
              <Col xs={12} md={6} key={stat.label}>
                <Card size="small">
                  <Statistic
                    title={stat.label}
                    value={stat.value}
                    prefix={stat.icon}
                    styles={{ content: { color: stat.color, fontSize: 24 } }}
                  />
                </Card>
              </Col>
            ))}
          </Row>

          {WEEKS.map((week) => (
            <WeekSection
              key={week.id}
              week={week}
              store={store}
              onToggleComplete={handleToggle}
              onOpenPrompt={(topic, link, weekLabel) => setPrompt({ topic, link, week: weekLabel })}
              onOpenQuiz={setQuizWeek}
              onAddEvidence={(id) => {
                setEvidenceWeek(id)
                setEvidenceOpen(true)
              }}
            />
          ))}

          <div id="evidences" style={{ scrollMarginTop: 96, marginTop: 40 }}>
            <Row justify="space-between" align="bottom" wrap gutter={[16, 16]}>
              <Col>
                <Title level={3} style={{ marginBottom: 4 }}>
                  Evidências de evolução
                </Title>
                <Paragraph type="secondary" style={{ marginBottom: 0 }}>
                  Registre links do Figma, Loom, documentos, diagramas, comparações e decisões aplicadas.
                </Paragraph>
              </Col>
              <Col>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => {
                    setEvidenceWeek(1)
                    setEvidenceOpen(true)
                  }}
                >
                  Nova evidência
                </Button>
              </Col>
            </Row>

            <div style={{ marginTop: 16 }}>
              {store.evidences.length === 0 ? (
                <Card>
                  <Empty description="Nenhuma evidência registrada. Adicione a primeira aplicação da trilha." />
                </Card>
              ) : (
                <Row gutter={[16, 16]}>
                  {store.evidences.map((e) => (
                    <Col xs={24} md={12} xl={8} key={e.id}>
                      <Card
                        size="small"
                        title={<Tag color={weekAccentHex(e.week)}>Semana {e.week}</Tag>}
                        extra={
                          <Text type="secondary" style={{ fontSize: 11 }}>
                            {new Date(e.createdAt).toLocaleDateString('pt-BR')}
                          </Text>
                        }
                      >
                        <Text strong>{e.title}</Text>
                        <Paragraph type="secondary" style={{ fontSize: 12, marginTop: 4 }}>
                          {e.description}
                        </Paragraph>
                        <Space>
                          {e.url && (
                            <Button size="small" icon={<LinkOutlined />} href={e.url} target="_blank" rel="noreferrer">
                              Abrir
                            </Button>
                          )}
                          <Button
                            size="small"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => {
                              modal.confirm({
                                title: 'Remover esta evidência?',
                                okText: 'Remover',
                                okButtonProps: { danger: true },
                                cancelText: 'Cancelar',
                                onOk: async () => {
                                  await deleteEvidence(e.id)
                                  message.success('Evidência removida.')
                                },
                              })
                            }}
                          >
                            Excluir
                          </Button>
                        </Space>
                      </Card>
                    </Col>
                  ))}
                </Row>
              )}
            </div>
          </div>

          <div id="assessment" style={{ scrollMarginTop: 96, marginTop: 40 }}>
            <Title level={3} style={{ marginBottom: 4 }}>
              Régua de evolução
            </Title>
            <Paragraph type="secondary">
              Ajuste as seis dimensões com base em evidências observáveis. A nota não substitui o feedback
              qualitativo.
            </Paragraph>
            <Row gutter={[16, 16]}>
              {SCORE_DIMENSIONS.map((dimension, index) => {
                const evaluated = store.scores[String(index)] != null
                return (
                  <Col xs={24} md={12} key={dimension}>
                    <Card size="small">
                      <Space style={{ width: '100%', justifyContent: 'space-between', marginBottom: 4 }}>
                        <Space size={6}>
                          <Text strong style={{ fontSize: 12 }}>
                            {dimension}
                          </Text>
                          {!evaluated && (
                            <Tag color="default" style={{ fontSize: 11 }}>
                              Ainda não avaliado
                            </Tag>
                          )}
                        </Space>
                        <Tag>{store.scores[String(index)] ?? 3}/5</Tag>
                      </Space>
                      <Slider
                        min={1}
                        max={5}
                        step={1}
                        marks={{ 1: '1', 2: '2', 3: '3', 4: '4', 5: '5' }}
                        value={store.scores[String(index)] ?? 3}
                        onChange={(value) => updateScore(index, value)}
                      />
                    </Card>
                  </Col>
                )
              })}
              <Col span={24}>
                <Card size="small">
                  <Row justify="space-between" align="middle" gutter={[16, 16]}>
                    <Col>
                      <Statistic title="Média atual" value={Number(average.toFixed(1))} />
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        Meta sugerida: média ≥ 3,5 e nenhuma dimensão crítica abaixo de 3.
                      </Text>
                    </Col>
                    <Col>
                      <Space direction="vertical" align="end" size={4}>
                        {scoresDirty && (
                          <Text type="warning" style={{ fontSize: 12 }}>
                            <ExclamationCircleOutlined /> Alterações não salvas
                          </Text>
                        )}
                        <Button
                          type="primary"
                          loading={saveStatus === 'saving'}
                          onClick={async () => {
                            await saveScores()
                            message.success('Avaliação salva.')
                          }}
                        >
                          Salvar avaliação
                        </Button>
                      </Space>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>

      <Modal
        open={evidenceOpen}
        title="Nova evidência"
        onCancel={() => setEvidenceOpen(false)}
        footer={null}
        destroyOnHidden
      >
        <EvidenceForm
          defaultWeek={evidenceWeek}
          loading={saveStatus === 'saving'}
          onCancel={() => setEvidenceOpen(false)}
          onSubmit={async (input) => {
            await addEvidence(input)
            setEvidenceOpen(false)
            message.success('Evidência registrada.')
          }}
        />
      </Modal>

      <Modal
        open={!!quizWeek}
        title={quizWeek ? `Semana ${quizWeek.id} — ${quizWeek.title}` : 'Mini teste'}
        onCancel={() => setQuizWeek(null)}
        footer={null}
        destroyOnHidden
      >
        {quizWeek && (
          <QuizForm
            week={quizWeek}
            onSubmit={async (score) => {
              await saveQuiz(quizWeek.id, score)
              message.success('Teste corrigido.')
            }}
          />
        )}
      </Modal>

      <Modal
        open={!!prompt}
        title={prompt?.topic.slice(0, 58) ?? 'Estudar com IA'}
        onCancel={() => setPrompt(null)}
        footer={null}
        destroyOnHidden
        width={640}
      >
        {prompt && <PromptPanel topic={prompt.topic} link={prompt.link} week={prompt.week} />}
      </Modal>
    </Layout>
  )
}
