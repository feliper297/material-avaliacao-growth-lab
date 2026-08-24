import {
  AimOutlined,
  ApiOutlined,
  AppstoreOutlined,
  BlockOutlined,
  CheckOutlined,
  ClusterOutlined,
  CodeOutlined,
  DownOutlined,
  EditOutlined,
  GroupOutlined,
  InboxOutlined,
  LinkOutlined,
  NodeIndexOutlined,
  NumberOutlined,
  QuestionCircleOutlined,
  QuestionOutlined,
  ReadOutlined,
  SwapOutlined,
  TableOutlined,
  UpOutlined,
} from '@ant-design/icons'
import { Avatar, Button, Card, Col, Modal, Row, Space, Typography, theme as antdTheme } from 'antd'
import { useState, type ComponentType } from 'react'
import { weekAccentHex, type TrailResource, type TrailWeek } from '../../../shared/data/weeks'
import { getResourceQuiz } from '../../../shared/data/resource-quizzes'
import { getQuizAnswers, getQuizScore, hasDetailedQuizResult, isLegacyQuizResult } from '../../../shared/domain/quiz'
import type { AppStore, Evidence } from '../../../shared/types/store'
import type { Evaluation, EvaluationAttachment } from '../../../shared/types/evaluation'
import { EvidenceItem, InlineQuizResult, QuizResultSummary } from './EvidenceItem'
import { QuizReview } from './QuizReview'
import { WeekEvaluationPanel } from '../admin/WeekEvaluationPanel'
import { useBreakpointLayout } from '../../hooks/useBreakpointLayout'

const { Title, Text, Paragraph } = Typography

const RESOURCE_ICONS: Record<string, ComponentType> = {
  TableOutlined,
  BlockOutlined,
  GroupOutlined,
  AppstoreOutlined,
  AimOutlined,
  NodeIndexOutlined,
  InboxOutlined,
  SwapOutlined,
  ApiOutlined,
  NumberOutlined,
  ClusterOutlined,
  ReadOutlined,
  EditOutlined,
  CodeOutlined,
}

function resourceIcon(key: string) {
  const IconComponent = RESOURCE_ICONS[key] ?? QuestionOutlined
  return <IconComponent />
}

interface WeekSectionProps {
  week: TrailWeek
  store: AppStore
  readOnly?: boolean
  evaluation?: Evaluation
  evaluationReadOnly?: boolean
  evaluationSaving?: boolean
  learnerId: string
  onSaveEvaluation?: (overall: number, notes: string, attachments: EvaluationAttachment[]) => Promise<void>
  onToggleComplete: (id: string) => void
  onOpenQuiz: (resource: TrailResource, week: TrailWeek) => void
  onAddEvidence: (weekId: number) => void
  onEditEvidence: (evidence: Evidence) => void
  onDeleteEvidence: (evidence: Evidence) => void
}

export function WeekSection({
  week,
  store,
  readOnly = false,
  evaluation,
  evaluationReadOnly = true,
  evaluationSaving,
  learnerId,
  onSaveEvaluation,
  onToggleComplete,
  onOpenQuiz,
  onAddEvidence,
  onEditEvidence,
  onDeleteEvidence,
}: WeekSectionProps) {
  const { token } = antdTheme.useToken()
  const { modalWidth, modalStyle, modalStyles, sectionGutter, layoutGutter } = useBreakpointLayout()
  const accent = weekAccentHex(week.id)
  const [expanded, setExpanded] = useState(true)
  const [quizReview, setQuizReview] = useState<{
    resource: TrailResource
    score: number
    answers?: number[]
    isLegacy: boolean
  } | null>(null)
  const weekEvidences = store.evidences.filter((evidence) => evidence.week === week.id)
  const weekQuizResults = week.resources
    .map((resource) => {
      const raw = store.quizzes[resource.id]
      const score = getQuizScore(raw)
      if (score == null) return null
      const total = getResourceQuiz(resource.id).length
      return {
        resource,
        score,
        total,
        answers: getQuizAnswers(raw),
        isLegacy: isLegacyQuizResult(raw) || !hasDetailedQuizResult(raw, total),
      }
    })
    .filter(
      (
        entry,
      ): entry is {
        resource: TrailResource
        score: number
        total: number
        answers: number[] | undefined
        isLegacy: boolean
      } => entry != null,
    )

  return (
    <div id={`week-${week.id}`} className="week-section">
      <Card styles={{ body: { padding: 0 } }}>
        <div
          className={`week-section-header${expanded ? ' week-section-header--expanded' : ''}`}
          style={{
            borderBottom: expanded ? `1px solid ${token.colorBorderSecondary}` : 'none',
          }}
        >
          <div style={{ flex: '1 1 auto', minWidth: 0 }}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', width: '100%' }}>
              <Avatar shape="square" size={44} style={{ background: accent, fontWeight: 600, flex: 'none' }}>
                {String(week.id).padStart(2, '0')}
              </Avatar>
              <div style={{ minWidth: 0, flex: '1 1 auto' }}>
                <Title level={3} style={{ margin: 0, textWrap: 'balance' }}>
                  {week.title}
                </Title>
                <Paragraph type="secondary" style={{ margin: '4px 0 0', fontWeight: 400 }}>
                  {week.objective}
                </Paragraph>
              </div>
            </div>
          </div>
          <Button
            type="text"
            size="small"
            onClick={() => setExpanded((v) => !v)}
            icon={expanded ? <UpOutlined /> : <DownOutlined />}
            aria-label={expanded ? `Recolher semana ${week.id}` : `Expandir semana ${week.id}`}
            aria-expanded={expanded}
            style={{ flex: 'none' }}
          />
        </div>
        <div className={`week-section-body${expanded ? ' is-expanded' : ''}`}>
          {expanded && (
            <>
              <Row gutter={layoutGutter} align="top">
                <Col span={24}>
                  <Title level={4} style={{ margin: 0, marginBottom: 12 }}>
                    Conteúdos selecionados
                  </Title>
                  <Row gutter={sectionGutter} align="stretch">
                    {week.resources.map((resource) => {
                      const completed = store.completed.includes(resource.id)
                      const rawQuiz = store.quizzes[resource.id]
                      const resourceQuiz = getResourceQuiz(resource.id)
                      const quizScore = getQuizScore(rawQuiz)
                      const hasDetailedQuiz = hasDetailedQuizResult(rawQuiz, resourceQuiz.length)
                      const hasQuizAttempt = quizScore != null
                      const canRetakeQuiz = hasQuizAttempt && !hasDetailedQuiz

                      return (
                        <Col key={resource.id} xs={24} md={12} style={{ display: 'flex' }}>
                          <Card size="small" className="trail-resource-card" style={{ width: '100%' }}>
                            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                              <Avatar shape="square" style={{ background: `${accent}1a`, color: accent, flex: 'none' }}>
                                {resourceIcon(resource.icon)}
                              </Avatar>
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <Text strong style={{ display: 'block', marginBottom: 12 }}>
                                  {resource.title}
                                </Text>
                                <div
                                  style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    alignItems: 'center',
                                    gap: 8,
                                  }}
                                >
                                  <Space size={8} wrap style={{ flex: 1 }}>
                                    {(!hasQuizAttempt || canRetakeQuiz) && resourceQuiz.length > 0 && (
                                      <Button
                                        className="app-trail-action-btn"
                                        variant="outlined"
                                        icon={<QuestionCircleOutlined />}
                                        aria-label={`Fazer teste de ${resource.title}`}
                                        disabled={readOnly}
                                        onClick={() => onOpenQuiz(resource, week)}
                                      >
                                        {canRetakeQuiz ? 'Refazer teste' : 'Fazer teste'}
                                      </Button>
                                    )}
                                    <Button
                                      className="app-trail-action-btn"
                                      type="primary"
                                      icon={<LinkOutlined />}
                                      href={resource.url}
                                      target="_blank"
                                      rel="noreferrer"
                                      aria-label={`Abrir ${resource.title} (${resource.source})`}
                                    >
                                      Abrir
                                    </Button>
                                  </Space>
                                  <Button
                                    size="small"
                                    shape="circle"
                                    type={completed ? 'primary' : 'default'}
                                    icon={completed ? <CheckOutlined /> : undefined}
                                    style={{ flex: 'none' }}
                                    disabled={readOnly}
                                    aria-label={
                                      completed
                                        ? `Marcar "${resource.title}" como pendente`
                                        : `Marcar "${resource.title}" como concluído`
                                    }
                                    aria-pressed={completed}
                                    onClick={() => onToggleComplete(resource.id)}
                                  />
                                </div>
                                {hasQuizAttempt && <InlineQuizResult score={quizScore} total={resourceQuiz.length} />}
                              </div>
                            </div>
                          </Card>
                        </Col>
                      )
                    })}
                  </Row>
                </Col>
              </Row>

              <Row gutter={sectionGutter} className="app-week-grid" style={{ marginTop: 20, alignItems: 'stretch' }}>
                <Col xs={24} md={12} style={{ display: 'flex' }}>
                  <Card size="small" style={{ width: '100%' }}>
                    <Text strong>Testes de conhecimento</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {weekQuizResults.length > 0
                        ? `${weekQuizResults.length} de ${week.resources.length} conteúdos testados`
                        : 'Faça o teste de cada conteúdo acima — uma tentativa por item.'}
                    </Text>

                    {weekQuizResults.length > 0 && (
                      <div style={{ marginTop: 12 }}>
                        {weekQuizResults.map(({ resource, score, total, answers, isLegacy }) => (
                          <QuizResultSummary
                            key={resource.id}
                            title={resource.title}
                            score={score}
                            total={total}
                            onReview={() => setQuizReview({ resource, score, answers, isLegacy })}
                          />
                        ))}
                      </div>
                    )}
                  </Card>
                </Col>
                <Col xs={24} md={12} style={{ display: 'flex' }}>
                  <Card size="small" style={{ width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                      <div style={{ minWidth: 0 }}>
                        <Text strong>Aplicação prática</Text>
                        <br />
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          {weekEvidences.length > 0
                            ? `${weekEvidences.length} evidência${weekEvidences.length === 1 ? '' : 's'} registrada${weekEvidences.length === 1 ? '' : 's'}`
                            : 'Registre Figma, fluxo, diagrama, protótipo ou documentação.'}
                        </Text>
                      </div>
                      {!readOnly && (
                        <Button type="primary" style={{ flex: 'none' }} onClick={() => onAddEvidence(week.id)}>
                          Adicionar evidência
                        </Button>
                      )}
                    </div>

                    {weekEvidences.length > 0 && (
                      <div style={{ marginTop: 12 }}>
                        {weekEvidences.map((evidence) => (
                          <EvidenceItem
                            key={evidence.id}
                            evidence={evidence}
                            accent={accent}
                            readOnly={readOnly}
                            onEdit={onEditEvidence}
                            onDelete={onDeleteEvidence}
                          />
                        ))}
                      </div>
                    )}
                  </Card>
                </Col>
              </Row>

              <WeekEvaluationPanel
                weekId={week.id}
                learnerId={learnerId}
                accent={accent}
                evaluation={evaluation}
                readOnly={evaluationReadOnly}
                saving={evaluationSaving}
                embedded
                onSave={onSaveEvaluation}
              />
            </>
          )}
        </div>
      </Card>

      <Modal
        open={quizReview != null}
        title={quizReview ? `Revisão — ${quizReview.resource.title}` : 'Revisão do teste'}
        onCancel={() => setQuizReview(null)}
        footer={null}
        destroyOnClose
        width={modalWidth}
        style={modalStyle}
        styles={modalStyles}
      >
        {quizReview && (
          <QuizReview
            title={quizReview.resource.title}
            questions={getResourceQuiz(quizReview.resource.id)}
            score={quizReview.score}
            answers={quizReview.answers}
            isLegacy={quizReview.isLegacy}
            onRetake={
              readOnly
                ? undefined
                : () => {
                    setQuizReview(null)
                    onOpenQuiz(quizReview.resource, week)
                  }
            }
          />
        )}
      </Modal>
    </div>
  )
}
