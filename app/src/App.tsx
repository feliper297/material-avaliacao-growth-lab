import { useMemo, useState, useEffect, useRef, useCallback, type ReactNode } from 'react'
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
  Select,
  Space,
  Spin,
  Statistic,
  Steps,
  Tag,
  theme as antdTheme,
  Typography,
  Alert,
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
  CheckOutlined,
  CompassOutlined,
  DashboardOutlined,
  DownloadOutlined,
  FileSearchOutlined,
  HomeOutlined,
  LogoutOutlined,
  PlusOutlined,
  PrinterOutlined,
  RobotOutlined,
  StarOutlined,
  TrophyOutlined,
} from '@ant-design/icons'
import { ALL_RESOURCE_IDS, WEEKS, weekAccentHex, type TrailResource, type TrailWeek } from '../shared/data/weeks'
import { getResourceQuiz } from '../shared/data/resource-quizzes'
import { calculateAverage, getCycleStatus, getOverallProgress, getWeekProgress } from '../shared/domain/progress'
import { SCORE_DIMENSIONS } from '../shared/types/store'
import type { Evaluation, Profile } from '../shared/types/evaluation'
import { EvidenceForm } from './components/trail/EvidenceForm'
import { PromptPanel } from './components/trail/PromptPanel'
import { QuizForm } from './components/trail/QuizForm'
import { WeekSection } from './components/trail/WeekSection'
import { useStore } from './hooks/useStore'
import { useProfile } from './hooks/useProfile'
import { useEvaluations } from './hooks/useEvaluations'
import { WeekEvaluationPanel } from './components/admin/WeekEvaluationPanel'
import { FinalEvaluationPanel } from './components/admin/FinalEvaluationPanel'
import { BackOfficePanel } from './components/admin/BackOfficePanel'
import { openPrintReport } from './utils/progressReport'
import { useBackOffice } from './hooks/useBackOffice'
import type { Evidence } from '../shared/types/store'
import type { BackOfficeStats } from '../shared/types/backoffice'

const { Sider, Header, Content } = Layout
const { Title, Text, Paragraph } = Typography

const SIDEBAR_WIDTH = 280
const CONTENT_PADDING = 32

const BASE_NAV_ITEMS: { href: string; label: string }[] = [
  { href: '#overview', label: 'Visão geral' },
  ...WEEKS.map((w) => ({ href: `#week-${w.id}`, label: `S${w.id} · ${w.title}` })),
  { href: '#evidences', label: 'Evidências' },
  { href: '#assessment', label: 'Avaliação final' },
]

export default function App() {
  const auth = useAuth()

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

  return <AuthenticatedApp onSignOut={auth.signOut} userEmail={auth.session?.user.email} />
}

function AuthenticatedApp({ onSignOut, userEmail }: { onSignOut: () => void; userEmail?: string }) {
  const { profile, isAdmin, loading: profileLoading } = useProfile(userEmail)
  const [selectedLearnerId, setSelectedLearnerId] = useState<string | null>(null)

  const evaluationUserId = isAdmin ? selectedLearnerId : profile?.userId ?? null
  const evaluations = useEvaluations(evaluationUserId, !profileLoading && !!profile)

  useEffect(() => {
    if (isAdmin && evaluations.learners.length > 0 && !selectedLearnerId) {
      setSelectedLearnerId(evaluations.learners[0].userId)
    }
  }, [isAdmin, evaluations.learners, selectedLearnerId])

  const store = useStore(evaluationUserId, { readOnly: isAdmin })
  const backOffice = useBackOffice(isAdmin && !profileLoading && !!profile)
  const isDark = store.store.theme === 'dark'

  if (profileLoading || store.loadStatus === 'loading' || evaluations.loading) {
    return (
      <div style={{ display: 'grid', placeItems: 'center', minHeight: '100vh' }}>
        <Spin size="large" />
      </div>
    )
  }

  if (profile && !profile.active) {
    return (
      <ConfigProvider locale={ptBR} theme={{ algorithm: antdTheme.defaultAlgorithm, token: { colorPrimary: '#0958d9' } }}>
        <AntApp>
          <div style={{ display: 'grid', placeItems: 'center', minHeight: '100vh', padding: 24 }}>
            <Card style={{ maxWidth: 420 }}>
              <Title level={4}>Conta inativa</Title>
              <Paragraph type="secondary">
                Seu acesso à plataforma foi desativado. Entre em contato com o administrador.
              </Paragraph>
              <Button onClick={onSignOut}>Sair</Button>
            </Card>
          </div>
        </AntApp>
      </ConfigProvider>
    )
  }

  if (isAdmin && !selectedLearnerId) {
    return (
      <ConfigProvider locale={ptBR} theme={{ algorithm: antdTheme.defaultAlgorithm, token: { colorPrimary: '#0958d9' } }}>
        <AntApp>
          <div style={{ display: 'grid', placeItems: 'center', minHeight: '100vh', padding: 24 }}>
            <Card style={{ maxWidth: 420 }}>
              <Title level={4}>Painel do avaliador</Title>
              <Paragraph type="secondary">
                Nenhum participante cadastrado ainda. Peça para o participante fazer login ao menos uma vez.
              </Paragraph>
              <Button onClick={onSignOut}>Sair</Button>
            </Card>
          </div>
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
        <AppShell
          {...store}
          userEmail={userEmail}
          onSignOut={onSignOut}
          isAdmin={isAdmin}
          selectedLearnerId={selectedLearnerId}
          learners={evaluations.learners}
          onSelectLearner={setSelectedLearnerId}
          getWeekEvaluation={evaluations.getWeekEvaluation}
          finalEvaluation={evaluations.finalEvaluation}
          evaluationSaving={evaluations.saving}
          onSaveWeekEvaluation={evaluations.saveWeekEvaluation}
          onSaveFinalEvaluation={evaluations.saveFinalEvaluation}
          backOfficeStats={backOffice.stats}
          backOfficeLoading={backOffice.loading}
          backOfficeError={backOffice.error}
          onReloadBackOffice={backOffice.reload}
        />
      </AntApp>
    </ConfigProvider>
  )
}

function AppShell({
  store,
  loadStatus,
  saveStatus,
  error,
  toggleComplete,
  addEvidence,
  deleteEvidence,
  updateEvidence,
  saveQuiz,
  setTheme,
  exportProgress,
  readOnly,
  userEmail,
  onSignOut,
  isAdmin,
  selectedLearnerId,
  learners,
  onSelectLearner,
  getWeekEvaluation,
  finalEvaluation,
  evaluationSaving,
  onSaveWeekEvaluation,
  onSaveFinalEvaluation,
  backOfficeStats,
  backOfficeLoading,
  backOfficeError,
  onReloadBackOffice,
}: ReturnType<typeof useStore> & {
  userEmail?: string
  onSignOut: () => void
  isAdmin: boolean
  selectedLearnerId: string | null
  learners: Profile[]
  onSelectLearner: (id: string) => void
  getWeekEvaluation: (week: number) => Evaluation | undefined
  finalEvaluation: Evaluation | null
  evaluationSaving: boolean
  onSaveWeekEvaluation: (week: number, overall: number, notes: string) => Promise<void>
  onSaveFinalEvaluation: (scores: Record<string, number>, notes: string) => Promise<void>
  backOfficeStats: BackOfficeStats | null
  backOfficeLoading: boolean
  backOfficeError: string | null
  onReloadBackOffice: () => void
}) {
  const { message, modal } = AntApp.useApp()
  const { token } = antdTheme.useToken()

  const [evidenceOpen, setEvidenceOpen] = useState(false)
  const [evidenceWeek, setEvidenceWeek] = useState(1)
  const [editingEvidence, setEditingEvidence] = useState<Evidence | null>(null)
  const [quizTarget, setQuizTarget] = useState<{ resource: TrailResource; week: TrailWeek } | null>(null)
  const [prompt, setPrompt] = useState<{ topic: string; link: string; week: string } | null>(null)
  const [activeView, setActiveView] = useState<'trail' | 'backoffice'>('trail')
  const [activeSection, setActiveSection] = useState('#overview')
  const contentRef = useRef<HTMLDivElement>(null)

  const progress = useMemo(
    () => getOverallProgress(store.completed.length, ALL_RESOURCE_IDS.length, store.evidences.length),
    [store],
  )

  const weekEvaluationsAverage = useMemo(() => {
    const weekScores = WEEKS.map((w) => getWeekEvaluation(w.id)?.scores.overall).filter(
      (v): v is number => v != null,
    )
    if (weekScores.length === 0) return null
    return weekScores.reduce((sum, n) => sum + n, 0) / weekScores.length
  }, [getWeekEvaluation])

  const finalAverage = useMemo(
    () =>
      finalEvaluation
        ? calculateAverage(finalEvaluation.scores, SCORE_DIMENSIONS.length)
        : null,
    [finalEvaluation],
  )

  const displayAverage = finalAverage ?? weekEvaluationsAverage ?? 0

  const cycleStepItems = useMemo(() => {
    const firstIncompleteIndex = WEEKS.findIndex((w) => getWeekProgress(w, store) < 100)
    return WEEKS.map((w, index) => {
      const weekProgress = getWeekProgress(w, store)
      const isComplete = weekProgress >= 100
      const isCurrent = !isComplete && index === firstIncompleteIndex

      return {
        title: `Semana ${w.id}`,
        description: w.title,
        status: isComplete ? ('finish' as const) : isCurrent ? ('process' as const) : ('wait' as const),
      }
    })
  }, [store])

  const renderCycleStepIcon = useCallback(
    (node: ReactNode, info: { item: { status?: string } }) => {
      if (info.item.status !== 'finish') return node

      return (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: token.controlHeightSM,
            height: token.controlHeightSM,
            borderRadius: '50%',
            backgroundColor: token.colorSuccess,
            border: `${token.lineWidth}px solid ${token.colorSuccess}`,
            color: token.colorWhite,
            fontSize: token.fontSizeSM,
            lineHeight: 1,
          }}
        >
          <CheckOutlined />
        </span>
      )
    },
    [token],
  )

  const navItems = useMemo(() => {
    const items = [...BASE_NAV_ITEMS]
    if (isAdmin) {
      items.push({ href: '#backoffice', label: 'Back Office' })
    }
    return items
  }, [isAdmin])

  const navIcon: Record<string, { icon: ReactNode; color: string }> = {
    '#overview': { icon: <HomeOutlined />, color: token.colorPrimary },
    '#week-1': { icon: <AppstoreOutlined />, color: weekAccentHex(1) },
    '#week-2': { icon: <CompassOutlined />, color: weekAccentHex(2) },
    '#week-3': { icon: <ApiOutlined />, color: weekAccentHex(3) },
    '#week-4': { icon: <RobotOutlined />, color: weekAccentHex(4) },
    '#evidences': { icon: <FileSearchOutlined />, color: token.colorInfo },
    '#assessment': { icon: <TrophyOutlined />, color: token.colorWarning },
    '#backoffice': { icon: <DashboardOutlined />, color: '#531dab' },
  }

  const menuItems: MenuProps['items'] = navItems.map((item) => {
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

  function openEvidenceModal(weekId = 1, evidence: Evidence | null = null) {
    setEvidenceWeek(weekId)
    setEditingEvidence(evidence)
    setEvidenceOpen(true)
  }

  function closeEvidenceModal() {
    setEvidenceOpen(false)
    setEditingEvidence(null)
  }

  function confirmDeleteEvidence(evidence: Evidence) {
    modal.confirm({
      title: 'Remover esta evidência?',
      content: `"${evidence.title}" será excluída permanentemente.`,
      okText: 'Remover',
      okButtonProps: { danger: true },
      cancelText: 'Cancelar',
      onOk: async () => {
        await deleteEvidence(evidence.id)
        message.success('Evidência removida.')
      },
    })
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
            Tente sair e entrar novamente. Se o erro persistir, verifique sua conexão com a internet.
          </Paragraph>
        </Card>
      </div>
    )
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        width={SIDEBAR_WIDTH}
        theme={store.theme}
        className="no-print app-sider-fixed"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          height: '100vh',
          overflowY: 'auto',
          zIndex: 10,
          borderRight: `1px solid ${token.colorBorderSecondary}`,
        }}
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
            className="app-sider-menu"
            mode="inline"
            theme={store.theme}
            selectable
            selectedKeys={[activeView === 'backoffice' ? '#backoffice' : activeSection]}
            items={menuItems}
            style={{ border: 'none', background: 'transparent' }}
            onClick={({ key }) => {
              if (key === '#backoffice') {
                setActiveView('backoffice')
                contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
                return
              }

              setActiveView('trail')
              setActiveSection(key)
              contentRef.current?.scrollTo({ top: 0, behavior: 'auto' })
              requestAnimationFrame(() => {
                document.getElementById(key.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' })
              })
            }}
          />
        </div>
      </Sider>

      <Layout
        className="app-main-layout"
        style={{
          marginLeft: SIDEBAR_WIDTH,
          width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <Header
          className="no-print app-header"
          style={{
            flexShrink: 0,
            height: 56,
            lineHeight: '56px',
            padding: `0 ${CONTENT_PADDING}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: token.marginSM,
            background: token.colorBgContainer,
            borderBottom: `1px solid ${token.colorBorderSecondary}`,
          }}
        >
          <Space size={token.marginSM} style={{ minWidth: 0 }} align="center">
            {isAdmin && (
              <>
                <Text type="secondary" style={{ fontSize: 13, whiteSpace: 'nowrap' }}>
                  Selecione o Avaliado:
                </Text>
                <Select
                  style={{ minWidth: 240 }}
                  placeholder="Selecione o Avaliado"
                  value={selectedLearnerId ?? undefined}
                  onChange={onSelectLearner}
                  options={learners.map((l) => ({ value: l.userId, label: l.email }))}
                />
              </>
            )}
            {saveStatus === 'saving' && <Text type="secondary">Salvando…</Text>}
            {saveStatus === 'error' && <Text type="danger">Erro ao salvar</Text>}
          </Space>
          <Space size={token.marginXS} wrap={false}>
            <Button
              icon={store.theme === 'dark' ? <BulbFilled /> : <BulbOutlined />}
              onClick={() => setTheme(store.theme === 'light' ? 'dark' : 'light')}
              aria-label="Alternar tema"
            />
            <Button
              icon={<DownloadOutlined />}
              onClick={() => {
                exportProgress(userEmail)
                message.success('Relatório PDF exportado.')
              }}
            >
              Exportar
            </Button>
            <Button
              type="primary"
              icon={<PrinterOutlined />}
              onClick={() => openPrintReport(store, userEmail)}
            >
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

        <Content
          ref={contentRef}
          className="app-content-scroll"
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: CONTENT_PADDING,
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          {isAdmin && activeView === 'backoffice' ? (
            <BackOfficePanel
              stats={backOfficeStats}
              loading={backOfficeLoading}
              error={backOfficeError}
              onReload={onReloadBackOffice}
            />
          ) : (
            <>
          {isAdmin && (
            <Alert
              type="info"
              showIcon
              style={{ marginBottom: 16 }}
              title={`Modo avaliador — acompanhando ${learners.find((l) => l.userId === selectedLearnerId)?.email ?? 'participante'}. Somente você pode registrar avaliações.`}
            />
          )}
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
                    variant="filled"
                    orientation="vertical"
                    size="small"
                    style={{ marginTop: 16 }}
                    items={cycleStepItems}
                    iconRender={renderCycleStepIcon}
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
              { label: 'Média de avaliação', value: displayAverage > 0 ? displayAverage.toFixed(1) : '—', icon: <StarOutlined />, color: token.colorWarning },
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
            <div key={week.id}>
              <WeekSection
                week={week}
                store={store}
                readOnly={readOnly}
                onToggleComplete={handleToggle}
                onOpenPrompt={(topic, link, weekLabel) => setPrompt({ topic, link, week: weekLabel })}
                onOpenQuiz={(resource, week) => setQuizTarget({ resource, week })}
                onAddEvidence={(id) => openEvidenceModal(id)}
                onEditEvidence={(evidence) => openEvidenceModal(evidence.week, evidence)}
                onDeleteEvidence={confirmDeleteEvidence}
              />
              <WeekEvaluationPanel
                weekId={week.id}
                accent={weekAccentHex(week.id)}
                evaluation={getWeekEvaluation(week.id)}
                readOnly={!isAdmin}
                saving={evaluationSaving}
                onSave={async (overall, notes) => {
                  try {
                    await onSaveWeekEvaluation(week.id, overall, notes)
                    message.success(`Avaliação da semana ${week.id} salva.`)
                  } catch (err) {
                    message.error(err instanceof Error ? err.message : 'Falha ao salvar avaliação.')
                  }
                }}
              />
            </div>
          ))}

          <div id="evidences" style={{ scrollMarginTop: 72, marginTop: 40 }}>
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
                {!readOnly && (
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => openEvidenceModal(1)}
                  >
                    Nova evidência
                  </Button>
                )}
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
                        <Paragraph type="secondary" style={{ fontSize: 12, marginTop: 4, marginBottom: 0 }}>
                          {e.description}
                        </Paragraph>
                      </Card>
                    </Col>
                  ))}
                </Row>
              )}
            </div>
          </div>

          <FinalEvaluationPanel
            evaluation={finalEvaluation}
            readOnly={!isAdmin}
            saving={evaluationSaving}
            onSave={async (scores, notes) => {
              try {
                await onSaveFinalEvaluation(scores, notes)
                message.success('Avaliação final salva.')
              } catch (err) {
                message.error(err instanceof Error ? err.message : 'Falha ao salvar avaliação final.')
              }
            }}
          />

            </>
          )}
        </Content>
      </Layout>

      <Modal
        open={evidenceOpen}
        title={editingEvidence ? 'Editar evidência' : 'Nova evidência'}
        onCancel={closeEvidenceModal}
        footer={null}
        destroyOnHidden
      >
        <EvidenceForm
          defaultWeek={evidenceWeek}
          initialEvidence={editingEvidence}
          loading={saveStatus === 'saving'}
          onCancel={closeEvidenceModal}
          onSubmit={async (input) => {
            if (editingEvidence) {
              await updateEvidence(editingEvidence.id, input)
              message.success('Evidência atualizada.')
            } else {
              await addEvidence(input)
              message.success('Evidência registrada.')
            }
            closeEvidenceModal()
          }}
        />
      </Modal>

      <Modal
        open={!!quizTarget}
        title={quizTarget ? `Teste — ${quizTarget.resource.title}` : 'Mini teste'}
        onCancel={() => setQuizTarget(null)}
        footer={null}
        destroyOnClose
      >
        {quizTarget && (
          <QuizForm
            key={quizTarget.resource.id}
            title={quizTarget.resource.title}
            questions={getResourceQuiz(quizTarget.resource.id)}
            onSubmit={async (score, answers) => {
              await saveQuiz(quizTarget.resource.id, score, answers)
              message.success('Teste corrigido e salvo.')
            }}
            onClose={() => setQuizTarget(null)}
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
