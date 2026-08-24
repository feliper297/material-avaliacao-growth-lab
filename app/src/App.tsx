import { useMemo, useState, useEffect, useRef, useCallback, type ReactNode } from 'react'
import {
  App as AntApp,
  Avatar,
  Button,
  Card,
  Col,
  ConfigProvider,
  Drawer,
  Grid,
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
  CheckCircleOutlined,
  CompassOutlined,
  DashboardOutlined,
  DownloadOutlined,
  FileSearchOutlined,
  LogoutOutlined,
  MenuOutlined,
  RobotOutlined,
  StarOutlined,
  TrophyOutlined,
} from '@ant-design/icons'
import { ALL_RESOURCE_IDS, WEEKS, weekAccentHex, type TrailResource, type TrailWeek } from '../shared/data/weeks'
import { getResourceQuiz } from '../shared/data/resource-quizzes'
import { calculateAverage, getCycleStatus, getOverallProgress } from '../shared/domain/progress'
import { SCORE_DIMENSIONS } from '../shared/types/store'
import type { Evaluation, EvaluationAttachment, Profile } from '../shared/types/evaluation'
import { EvidenceForm } from './components/trail/EvidenceForm'
import { QuizForm } from './components/trail/QuizForm'
import { WeekSection } from './components/trail/WeekSection'
import { useStore } from './hooks/useStore'
import { useProfile } from './hooks/useProfile'
import { useEvaluations } from './hooks/useEvaluations'
import { FinalEvaluationPanel } from './components/admin/FinalEvaluationPanel'
import { BackOfficePanel } from './components/admin/BackOfficePanel'
import { useBackOffice } from './hooks/useBackOffice'
import type { Evidence } from '../shared/types/store'
import type { BackOfficeStats } from '../shared/types/backoffice'

const { Sider, Header, Content } = Layout
const { Title, Text, Paragraph } = Typography

const SIDEBAR_WIDTH = 280
const CONTENT_PADDING = 32
const MOBILE_BREAKPOINT = 'lg'

const BASE_NAV_ITEMS: { href: string; label: string }[] = [
  ...WEEKS.map((w) => ({ href: `#week-${w.id}`, label: `Semana ${w.id}` })),
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
  reload,
  toggleComplete,
  addEvidence,
  deleteEvidence,
  updateEvidence,
  saveQuiz,
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
  onSaveWeekEvaluation: (week: number, overall: number, notes: string, attachments?: EvaluationAttachment[]) => Promise<void>
  onSaveFinalEvaluation: (scores: Record<string, number>, notes: string, attachments?: EvaluationAttachment[]) => Promise<void>
  backOfficeStats: BackOfficeStats | null
  backOfficeLoading: boolean
  backOfficeError: string | null
  onReloadBackOffice: () => void
}) {
  const { message, modal } = AntApp.useApp()
  const { token } = antdTheme.useToken()
  const screens = Grid.useBreakpoint()
  const isMobile = !screens[MOBILE_BREAKPOINT]

  const [evidenceOpen, setEvidenceOpen] = useState(false)
  const [evidenceWeek, setEvidenceWeek] = useState(1)
  const [editingEvidence, setEditingEvidence] = useState<Evidence | null>(null)
  const [quizTarget, setQuizTarget] = useState<{ resource: TrailResource; week: TrailWeek } | null>(null)
  const [activeView, setActiveView] = useState<'trail' | 'backoffice'>('trail')
  const [activeSection, setActiveSection] = useState('#week-1')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [actionError, setActionError] = useState<string | null>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const isNavScrollingRef = useRef(false)

  const scrollToSection = useCallback((sectionId: string, behavior: ScrollBehavior = 'smooth') => {
    const container = contentRef.current
    const target = document.getElementById(sectionId)
    if (!container || !target) return

    const scrollMarginTop = Number.parseFloat(window.getComputedStyle(target).scrollMarginTop) || 0
    const delta = target.getBoundingClientRect().top - container.getBoundingClientRect().top
    const nextTop = Math.max(0, container.scrollTop + delta - scrollMarginTop)

    container.scrollTo({ top: nextTop, behavior })
  }, [])

  const progress = useMemo(
    () => getOverallProgress(store.completed.length, ALL_RESOURCE_IDS.length),
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

  const navItems = useMemo(() => {
    const items = [...BASE_NAV_ITEMS]
    if (isAdmin) {
      items.push({ href: '#backoffice', label: 'Back Office' })
    }
    return items
  }, [isAdmin])

  const navIcon: Record<string, { icon: ReactNode; color: string }> = {
    '#week-1': { icon: <AppstoreOutlined />, color: weekAccentHex(1) },
    '#week-2': { icon: <CompassOutlined />, color: weekAccentHex(2) },
    '#week-3': { icon: <ApiOutlined />, color: weekAccentHex(3) },
    '#week-4': { icon: <RobotOutlined />, color: weekAccentHex(4) },
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

  const handleNavClick = useCallback(
    (key: string) => {
      if (key === '#backoffice') {
        setActiveView('backoffice')
        setActiveSection('#backoffice')
        contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
        setMobileMenuOpen(false)
        return
      }

      setActiveView('trail')
      setActiveSection(key)
      isNavScrollingRef.current = true

      scrollToSection(key.replace('#', ''))

      window.setTimeout(() => {
        isNavScrollingRef.current = false
      }, 700)

      setMobileMenuOpen(false)
    },
    [scrollToSection],
  )

  useEffect(() => {
    if (activeView !== 'trail') return

    const container = contentRef.current
    if (!container) return

    const sectionIds = navItems
      .filter((item) => item.href !== '#backoffice')
      .map((item) => item.href.replace('#', ''))

    const observer = new IntersectionObserver(
      (entries) => {
        if (isNavScrollingRef.current) return

        const intersecting = entries.filter((entry) => entry.isIntersecting)
        if (intersecting.length === 0) return

        const topmost = intersecting.reduce((best, entry) =>
          entry.boundingClientRect.top < best.boundingClientRect.top ? entry : best,
        )
        setActiveSection(`#${topmost.target.id}`)
      },
      {
        root: container,
        rootMargin: '-10% 0px -55% 0px',
        threshold: [0, 0.1, 0.25, 0.5],
      },
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [activeView, navItems])

  const sidebarPadding = isMobile ? 16 : 20

  const sidebarBody = (
    <>
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
          Progresso
        </Text>
        <br />
        <Text strong>{getCycleStatus(progress)}</Text>
        <Progress
          percent={progress}
          size="small"
          status={progress >= 100 ? 'success' : 'active'}
          style={{ marginTop: 8 }}
        />
        <Text type="secondary" style={{ fontSize: 11, display: 'block', marginTop: 4 }}>
          {store.completed.length} de {ALL_RESOURCE_IDS.length} conteúdos
        </Text>
      </Card>

      <nav aria-label="Navegação da trilha">
        <Menu
          className="app-sider-menu"
          mode="inline"
          theme={store.theme}
          selectable
          selectedKeys={[activeView === 'backoffice' ? '#backoffice' : activeSection]}
          items={menuItems}
          style={{ border: 'none', background: 'transparent' }}
          onClick={({ key }) => handleNavClick(String(key))}
        />
      </nav>
    </>
  )

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
        try {
          await deleteEvidence(evidence.id)
          message.success('Evidência removida.')
        } catch (err) {
          const msg = err instanceof Error ? err.message : 'Falha ao remover evidência.'
          setActionError(msg)
          message.error(msg)
        }
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
          <Alert
            type="error"
            showIcon
            role="alert"
            aria-live="assertive"
            title={error ?? 'Não foi possível carregar sua trilha.'}
            style={{ marginBottom: 16 }}
          />
          <Paragraph type="secondary" style={{ fontSize: 12 }}>
            Verifique sua conexão com a internet e tente novamente.
          </Paragraph>
          <Space wrap>
            <Button type="primary" onClick={reload}>
              Tentar novamente
            </Button>
            <Button onClick={onSignOut}>Sair</Button>
          </Space>
        </Card>
      </div>
    )
  }

  const contentPadding = isMobile ? 16 : CONTENT_PADDING
  const mainOffset = isMobile ? 0 : SIDEBAR_WIDTH
  const modalWidth = isMobile ? '100%' : 640

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <a href="#main-content" className="skip-link">
        Ir para o conteúdo principal
      </a>

      {!isMobile && (
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
          <div style={{ padding: sidebarPadding }}>{sidebarBody}</div>
        </Sider>
      )}

      <Drawer
        title="Menu da trilha"
        placement="left"
        open={isMobile && mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        className="no-print app-mobile-drawer"
        styles={{ body: { padding: sidebarPadding } }}
        width={Math.min(SIDEBAR_WIDTH + 40, 320)}
      >
        {sidebarBody}
      </Drawer>

      <Layout
        className="app-main-layout"
        style={{
          marginLeft: mainOffset,
          width: mainOffset ? `calc(100% - ${mainOffset}px)` : '100%',
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
            height: 'auto',
            minHeight: 56,
            lineHeight: 'normal',
            padding: `${token.paddingSM}px ${contentPadding}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: token.marginSM,
            background: token.colorBgContainer,
            borderBottom: `1px solid ${token.colorBorderSecondary}`,
            flexWrap: 'wrap',
          }}
        >
          <Space size={token.marginSM} style={{ minWidth: 0, flex: 1 }} align="center" wrap>
            {isMobile && (
              <Button
                type="text"
                icon={<MenuOutlined />}
                aria-label="Abrir menu de navegação"
                onClick={() => setMobileMenuOpen(true)}
              />
            )}
            {isAdmin && (
              <Select
                style={{ minWidth: isMobile ? 160 : 240, maxWidth: '100%' }}
                placeholder="Participante"
                value={selectedLearnerId ?? undefined}
                onChange={onSelectLearner}
                options={learners.map((l) => ({ value: l.userId, label: l.email }))}
                aria-label="Selecione o participante"
              />
            )}
            {saveStatus === 'saving' && <Text type="secondary">Salvando…</Text>}
          </Space>
          <Space size={token.marginXS} wrap align="center" className="app-header-actions">
            <Button
              className="app-trail-action-btn"
              type="primary"
              icon={<DownloadOutlined />}
              onClick={() => {
                exportProgress(userEmail)
                message.success('Relatório PDF exportado.')
              }}
              aria-label="Exportar relatório"
            >
              {!isMobile && 'Exportar'}
            </Button>
            <Button
              className="app-trail-action-btn"
              variant="outlined"
              icon={<LogoutOutlined />}
              onClick={() => onSignOut()}
              aria-label="Sair da conta"
            >
              {!isMobile && 'Sair'}
            </Button>
          </Space>
        </Header>

        {(saveStatus === 'error' && error) || actionError ? (
          <Alert
            type="error"
            showIcon
            role="alert"
            aria-live="assertive"
            title={actionError ?? error ?? 'Erro ao salvar'}
            closable
            onClose={() => setActionError(null)}
            style={{ margin: `0 ${contentPadding}px`, flexShrink: 0 }}
          />
        ) : null}

        <Content
          id="main-content"
          ref={contentRef}
          className="app-content-scroll"
          role="main"
          tabIndex={-1}
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: contentPadding,
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
                <WeekSection
                  key={week.id}
                  week={week}
                  store={store}
                  readOnly={readOnly}
                  learnerId={selectedLearnerId ?? ''}
                  evaluation={getWeekEvaluation(week.id)}
                  evaluationReadOnly={!isAdmin}
                  evaluationSaving={evaluationSaving}
                  onSaveEvaluation={async (overall, notes, attachments) => {
                    try {
                      await onSaveWeekEvaluation(week.id, overall, notes, attachments)
                      message.success(`Avaliação da semana ${week.id} salva.`)
                    } catch (err) {
                      message.error(err instanceof Error ? err.message : 'Falha ao salvar avaliação.')
                    }
                  }}
                  onToggleComplete={handleToggle}
                  onOpenQuiz={(resource, week) => setQuizTarget({ resource, week })}
                  onAddEvidence={(id) => openEvidenceModal(id)}
                  onEditEvidence={(evidence) => openEvidenceModal(evidence.week, evidence)}
                  onDeleteEvidence={confirmDeleteEvidence}
                />
              ))}

              <FinalEvaluationPanel
                learnerId={selectedLearnerId ?? ''}
                evaluation={finalEvaluation}
                readOnly={!isAdmin}
                saving={evaluationSaving}
                onSave={async (scores, notes, attachments) => {
                  try {
                    await onSaveFinalEvaluation(scores, notes, attachments)
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
        width={modalWidth}
        style={isMobile ? { top: 16, maxWidth: 'calc(100vw - 32px)' } : undefined}
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
        width={modalWidth}
        style={isMobile ? { top: 16, maxWidth: 'calc(100vw - 32px)' } : undefined}
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
    </Layout>
  )
}
