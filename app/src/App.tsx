import { useMemo, useState, useEffect, useRef, useCallback, type ReactNode } from 'react'
import {
  App as AntApp,
  Avatar,
  Button,
  Card,
  ConfigProvider,
  Drawer,
  Layout,
  Menu,
  type MenuProps,
  Modal,
  Progress,
  Select,
  Space,
  Spin,
  Statistic,
  theme as antdTheme,
  Typography,
  Alert,
} from 'antd'
import ptBR from 'antd/locale/pt_BR'
import { isSupabaseConfigured } from './lib/supabase'
import { useAuth } from './hooks/useAuth'
import { AuthScreen } from './components/auth/AuthScreen'
import { ResetPasswordScreen } from './components/auth/ResetPasswordScreen'
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
  ReadOutlined,
  RobotOutlined,
  StarOutlined,
  TrophyOutlined,
} from '@ant-design/icons'
import { weekAccentHex } from '../shared/data/weeks'
import { calculateAverage, getCycleStatus, getOverallProgress, isFinalEvaluationComplete, isWeekClosed } from '../shared/domain/progress'
import { SCORE_DIMENSIONS } from '../shared/types/store'
import type { Evaluation, EvaluationAttachment, Profile } from '../shared/types/evaluation'
import { EvidenceForm } from './components/trail/EvidenceForm'
import { WeekSection } from './components/trail/WeekSection'
import { useStore } from './hooks/useStore'
import { useProfile } from './hooks/useProfile'
import { useEvaluations } from './hooks/useEvaluations'
import { FinalEvaluationPanel } from './components/admin/FinalEvaluationPanel'
import { BackOfficePanel } from './components/admin/BackOfficePanel'
import { useBackOffice } from './hooks/useBackOffice'
import { useTrailCatalog } from './hooks/useTrailCatalog'
import { TrailCatalogProvider, useTrailCatalogContext } from './context/TrailCatalogContext'
import { SIDEBAR_COLLAPSED_WIDTH, SIDEBAR_WIDTH, useBreakpointLayout } from './hooks/useBreakpointLayout'
import { BrandLogo } from './components/BrandLogo'
import type { Evidence } from '../shared/types/store'
import type { BackOfficeStats } from '../shared/types/backoffice'

const { Sider, Header, Content } = Layout
const { Title, Text, Paragraph } = Typography

const WEEK_NAV_ICONS = [AppstoreOutlined, CompassOutlined, ApiOutlined, RobotOutlined]

function getInitialTrailSection(weekIds: number[]): string {
  const hash = window.location.hash
  if (hash.startsWith('#week-') || hash === '#assessment') return hash
  return weekIds.length > 0 ? `#week-${weekIds[0]}` : '#assessment'
}

export default function App() {
  if (!isSupabaseConfigured) {
    return (
      <ConfigProvider
        locale={ptBR}
        theme={{ algorithm: antdTheme.defaultAlgorithm, token: { colorPrimary: '#0958d9' } }}
      >
        <div style={{ display: 'grid', placeItems: 'center', minHeight: '100vh', padding: 24 }}>
          <Card style={{ maxWidth: 520 }}>
            <Title level={4} style={{ marginTop: 0 }}>
              Configuração incompleta
            </Title>
            <Paragraph type="secondary">
              As variáveis <Text code>VITE_SUPABASE_URL</Text> e{' '}
              <Text code>VITE_SUPABASE_ANON_KEY</Text> não estão definidas neste ambiente de deploy.
            </Paragraph>
            <Alert
              type="warning"
              showIcon
              title="Preview da Vercel"
              description="No painel da Vercel, adicione essas variáveis ao projeto app-zeta-tan-38 para Production e Preview, depois redeploy."
            />
          </Card>
        </div>
      </ConfigProvider>
    )
  }

  return <AppWithAuth />
}

function AppWithAuth() {
  const auth = useAuth()

  if (auth.status === 'loading') {
    return (
      <div style={{ display: 'grid', placeItems: 'center', minHeight: '100vh' }}>
        <Spin size="large" />
      </div>
    )
  }

  if (auth.recoveryMode) {
    return (
      <ConfigProvider
        locale={ptBR}
        theme={{ algorithm: antdTheme.defaultAlgorithm, token: { colorPrimary: '#0958d9' } }}
      >
        <AntApp>
          <ResetPasswordScreen onComplete={auth.completePasswordRecovery} />
        </AntApp>
      </ConfigProvider>
    )
  }

  if (auth.status === 'unauthenticated') {
    return (
      <ConfigProvider
        locale={ptBR}
        theme={{ algorithm: antdTheme.defaultAlgorithm, token: { colorPrimary: '#0958d9' } }}
      >
        <AntApp>
          <AuthScreen />
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
  const trailCatalog = useTrailCatalog(!profileLoading && !!profile)
  const backOffice = useBackOffice(
    isAdmin && !profileLoading && !!profile,
    trailCatalog.allResourceIds.length,
  )
  const isDark = store.store.theme === 'dark'

  if (profileLoading || store.loadStatus === 'loading' || evaluations.loading || trailCatalog.loading) {
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
        <TrailCatalogProvider value={trailCatalog}>
          <AppShell
            {...store}
            userEmail={userEmail}
            currentUserId={profile!.userId}
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
        </TrailCatalogProvider>
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
  exportProgress,
  saveQuiz,
  readOnly,
  userEmail,
  currentUserId,
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
  currentUserId: string
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
  const { weeks, allResourceIds, getResourceQuiz, quizzes, draftPreview } = useTrailCatalogContext()
  const navWeeks = isAdmin && draftPreview ? draftPreview.weeks : weeks
  const {
    isMobile,
    isPhone,
    contentPadding,
    modalWidth,
    modalStyle,
    modalStyles,
  } = useBreakpointLayout()

  const [evidenceOpen, setEvidenceOpen] = useState(false)
  const [evidenceWeek, setEvidenceWeek] = useState(1)
  const [evidenceResourceId, setEvidenceResourceId] = useState<string | undefined>()
  const [defaultEvidenceTitle, setDefaultEvidenceTitle] = useState<string | undefined>()
  const [editingEvidence, setEditingEvidence] = useState<Evidence | null>(null)
  const [activeView, setActiveView] = useState<'trail' | 'backoffice'>(() =>
    window.location.hash === '#backoffice' ? 'backoffice' : 'trail',
  )
  const [activeSection, setActiveSection] = useState(() =>
    window.location.hash === '#backoffice'
      ? '#backoffice'
      : getInitialTrailSection(weeks.map((week) => week.id)),
  )
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [actionError, setActionError] = useState<string | null>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const progress = useMemo(
    () => getOverallProgress(store.completed.length, allResourceIds.length),
    [store.completed.length, allResourceIds.length],
  )

  const weekEvaluationsAverage = useMemo(() => {
    const weekScores = navWeeks.map((w) => getWeekEvaluation(w.id)?.scores.overall).filter(
      (v): v is number => v != null,
    )
    if (weekScores.length === 0) return null
    return weekScores.reduce((sum, n) => sum + n, 0) / weekScores.length
  }, [getWeekEvaluation, navWeeks])

  const finalAverage = useMemo(
    () =>
      finalEvaluation
        ? calculateAverage(finalEvaluation.scores, SCORE_DIMENSIONS.length)
        : null,
    [finalEvaluation],
  )

  const displayAverage = finalAverage ?? weekEvaluationsAverage ?? 0

  const activeWeek = useMemo(() => {
    if (!activeSection.startsWith('#week-')) return null
    const weekId = Number.parseInt(activeSection.slice('#week-'.length), 10)
    return navWeeks.find((week) => week.id === weekId) ?? null
  }, [activeSection, navWeeks])

  const closedWeekIds = useMemo(
    () => new Set(navWeeks.filter((week) => isWeekClosed(week, store)).map((week) => week.id)),
    [store, navWeeks],
  )

  const assessmentComplete = isFinalEvaluationComplete(finalEvaluation)

  const navItems = useMemo(() => {
    const items = navWeeks.map((week) => ({
      href: `#week-${week.id}`,
      label: `Semana ${week.id}`,
    }))
    items.push({ href: '#assessment', label: 'Avaliação final' })
    if (isAdmin) {
      items.push({ href: '#backoffice', label: 'Back Office' })
    }
    return items
  }, [isAdmin, navWeeks])

  const navIcon = useMemo(() => {
    const icons: Record<string, { icon: ReactNode; color: string }> = {
      '#assessment': { icon: <TrophyOutlined />, color: token.colorWarning },
      '#backoffice': { icon: <DashboardOutlined />, color: '#531dab' },
    }
    navWeeks.forEach((week) => {
      const Icon = WEEK_NAV_ICONS[(week.id - 1) % WEEK_NAV_ICONS.length]
      icons[`#week-${week.id}`] = { icon: <Icon />, color: weekAccentHex(week.id) }
    })
    return icons
  }, [token.colorWarning, navWeeks])

  const menuItems: MenuProps['items'] = navItems.map((item) => {
    const meta = navIcon[item.href] ?? { icon: <ReadOutlined />, color: token.colorPrimary }
    const weekMatch = item.href.match(/^#week-(\d+)$/)
    const weekId = weekMatch ? Number(weekMatch[1]) : null
    const weekClosed = weekId != null && closedWeekIds.has(weekId)
    const navComplete = item.href === '#assessment' ? assessmentComplete : weekClosed

    return {
      key: item.href,
      icon: (
        <Avatar
          size={24}
          shape="square"
          style={{
            background: navComplete ? `${token.colorSuccess}1f` : `${meta.color}1f`,
            color: navComplete ? token.colorSuccess : meta.color,
            fontSize: 13,
          }}
        >
          {navComplete ? <CheckCircleOutlined /> : meta.icon}
        </Avatar>
      ),
      label: item.label,
      title: navComplete ? `${item.label} — concluída` : item.label,
    }
  })

  const handleNavClick = useCallback((key: string) => {
    if (key === '#backoffice') {
      setActiveView('backoffice')
      setActiveSection('#backoffice')
      window.history.replaceState(null, '', key)
      contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
      setMobileMenuOpen(false)
      return
    }

    setActiveView('trail')
    setActiveSection(key)
    window.history.replaceState(null, '', key)
    contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
    setMobileMenuOpen(false)
  }, [])

  const sidebarPadding = isMobile ? 16 : sidebarCollapsed ? 8 : 20

  const sidebarBody = (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: sidebarCollapsed ? 'center' : 'space-between',
          gap: 8,
          marginBottom: sidebarCollapsed ? 12 : 20,
        }}
      >
        {!sidebarCollapsed && <BrandLogo variant="sidebar" />}
        <Button
          type="text"
          icon={<MenuOutlined />}
          aria-label={sidebarCollapsed ? 'Expandir menu lateral' : 'Recolher menu lateral'}
          aria-expanded={!sidebarCollapsed}
          onClick={() => {
            if (isMobile) {
              setMobileMenuOpen(false)
              return
            }
            setSidebarCollapsed((value) => !value)
          }}
        />
      </div>

      {!sidebarCollapsed && (
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
        </Card>
      )}

      <nav aria-label="Navegação da trilha">
        <Menu
          className="app-sider-menu"
          mode="inline"
          theme={store.theme}
          selectable
          inlineCollapsed={!isMobile && sidebarCollapsed}
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

  function openEvidenceModal(
    weekId = 1,
    evidence: Evidence | null = null,
    options?: { resourceId?: string; defaultTitle?: string },
  ) {
    setEvidenceWeek(weekId)
    setEvidenceResourceId(options?.resourceId ?? evidence?.resourceId)
    setDefaultEvidenceTitle(evidence ? undefined : options?.defaultTitle)
    setEditingEvidence(evidence)
    setEvidenceOpen(true)
  }

  function closeEvidenceModal() {
    setEvidenceOpen(false)
    setEditingEvidence(null)
    setEvidenceResourceId(undefined)
    setDefaultEvidenceTitle(undefined)
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

  const sidebarWidth = sidebarCollapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH
  const mainOffset = isMobile ? 0 : sidebarWidth

  return (
    <Layout className="app-shell" style={{ minHeight: '100vh' }}>
      <a href="#main-content" className="skip-link">
        Ir para o conteúdo principal
      </a>

      {!isMobile && (
        <Sider
          width={SIDEBAR_WIDTH}
          collapsedWidth={SIDEBAR_COLLAPSED_WIDTH}
          collapsed={sidebarCollapsed}
          collapsible
          trigger={null}
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
        className={`app-main-layout${isMobile ? ' app-main-layout--compact' : ''}`}
        style={{
          marginLeft: mainOffset,
          width: isMobile ? '100%' : `calc(100% - ${mainOffset}px)`,
          maxWidth: '100vw',
          minWidth: 0,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          transition: 'margin-left 0.2s ease, width 0.2s ease',
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
          <Space size={token.marginSM} style={{ minWidth: 0, flex: 1 }} align="center" wrap className="app-header__primary">
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
                style={{
                  minWidth: isPhone ? 0 : isMobile ? 160 : 240,
                  flex: isMobile ? '1 1 120px' : undefined,
                  maxWidth: '100%',
                  width: isMobile ? '100%' : undefined,
                }}
                placeholder="Participante"
                value={selectedLearnerId ?? undefined}
                onChange={onSelectLearner}
                options={learners.map((l) => ({ value: l.userId, label: l.email }))}
                aria-label="Selecione o participante"
              />
            )}
            {saveStatus === 'saving' && <Text type="secondary">Salvando…</Text>}
          </Space>
          <Space size={token.marginXS} wrap align="center" className="app-header-actions app-header__actions">
            <Button
              className="app-trail-action-btn"
              type="primary"
              icon={<DownloadOutlined />}
              onClick={() => {
                exportProgress(userEmail, { weeks, quizzes })
                message.success('Relatório PDF exportado.')
              }}
              aria-label="Exportar relatório"
            >
              {isPhone ? null : 'Exportar'}
            </Button>
            <Button
              className="app-trail-action-btn"
              variant="outlined"
              icon={<LogoutOutlined />}
              onClick={() => onSignOut()}
              aria-label="Sair da conta"
            >
              {isPhone ? null : 'Sair'}
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
              weekCount={weeks.length}
              onReload={onReloadBackOffice}
            />
          ) : (
            <>
              <div className="app-stats-grid">
                {[
                  { label: 'Progresso de aprendizagem', value: `${progress}%`, icon: <ArrowUpOutlined />, color: token.colorPrimary },
                  { label: 'Conteúdos concluídos', value: store.completed.length, icon: <CheckCircleOutlined />, color: token.colorSuccess },
                  { label: 'Evidências registradas', value: store.evidences.length, icon: <FileSearchOutlined />, color: token.colorInfo },
                  { label: 'Média de avaliação', value: displayAverage > 0 ? displayAverage.toFixed(1) : '—', icon: <StarOutlined />, color: token.colorWarning },
                ].map((stat) => (
                  <Card key={stat.label} size="small" className="app-stat-card">
                    <Statistic
                      title={stat.label}
                      value={stat.value}
                      prefix={stat.icon}
                      styles={{ content: { color: stat.color, fontSize: 24 } }}
                    />
                  </Card>
                ))}
              </div>

              {activeWeek && (
                <WeekSection
                  key={activeWeek.id}
                  week={activeWeek}
                  store={store}
                  readOnly={readOnly}
                  learnerId={selectedLearnerId ?? ''}
                  evaluation={getWeekEvaluation(activeWeek.id)}
                  evaluationReadOnly={!isAdmin}
                  evaluationSaving={evaluationSaving}
                  onSaveEvaluation={async (overall, notes, attachments) => {
                    try {
                      await onSaveWeekEvaluation(activeWeek.id, overall, notes, attachments)
                      message.success(`Avaliação da semana ${activeWeek.id} salva.`)
                    } catch (err) {
                      message.error(err instanceof Error ? err.message : 'Falha ao salvar avaliação.')
                    }
                  }}
                  onToggleComplete={handleToggle}
                  onAddEvidence={(weekId, resourceId, defaultTitle) =>
                    openEvidenceModal(weekId, null, { resourceId, defaultTitle })
                  }
                  onEditEvidence={(evidence) => openEvidenceModal(evidence.week, evidence)}
                  onDeleteEvidence={confirmDeleteEvidence}
                  getResourceQuiz={getResourceQuiz}
                  onSaveQuiz={async (resourceId, score, answers) => {
                    try {
                      await saveQuiz(resourceId, score, answers)
                      message.success('Resultado do teste salvo.')
                    } catch (err) {
                      message.error(err instanceof Error ? err.message : 'Falha ao salvar teste.')
                    }
                  }}
                />
              )}

              {activeSection === '#assessment' && (
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
              )}
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
        style={modalStyle}
        styles={modalStyles}
        centered={!isPhone}
        wrapClassName={isPhone ? 'app-evidence-modal--phone' : undefined}
      >
        <EvidenceForm
          userId={currentUserId}
          defaultWeek={evidenceWeek}
          defaultResourceId={evidenceResourceId}
          defaultTitle={defaultEvidenceTitle}
          lockWeek={!!evidenceResourceId}
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
    </Layout>
  )
}
