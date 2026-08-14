import {
  AimOutlined,
  ApiOutlined,
  AppstoreOutlined,
  BlockOutlined,
  CheckOutlined,
  CheckCircleFilled,
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
  RobotOutlined,
  SwapOutlined,
  TableOutlined,
  UpOutlined,
} from '@ant-design/icons'
import { Alert, Avatar, Button, Card, Col, List, Modal, Progress, Row, Space, Tag, Typography, theme as antdTheme } from 'antd'
import { useState, type ComponentType } from 'react'
import { weekAccentHex, type TrailResource, type TrailWeek } from '../../../shared/data/weeks'
import { getResourceQuiz } from '../../../shared/data/resource-quizzes'
import { getQuizAnswers, getQuizScore } from '../../../shared/domain/quiz'
import type { AppStore, Evidence } from '../../../shared/types/store'
import { getWeekProgress } from '../../../shared/domain/progress'
import { EvidenceItem, InlineQuizResult, QuizResultSummary } from './EvidenceItem'
import { QuizReview } from './QuizReview'

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
  ReadOutlined,
  EditOutlined,
  RobotOutlined,
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
  onToggleComplete: (id: string) => void
  onOpenPrompt: (topic: string, link: string, weekLabel: string) => void
  onOpenQuiz: (resource: TrailResource, week: TrailWeek) => void
  onAddEvidence: (weekId: number) => void
  onEditEvidence: (evidence: Evidence) => void
  onDeleteEvidence: (evidence: Evidence) => void
}

export function WeekSection({
  week,
  store,
  readOnly = false,
  onToggleComplete,
  onOpenPrompt,
  onOpenQuiz,
  onAddEvidence,
  onEditEvidence,
  onDeleteEvidence,
}: WeekSectionProps) {
  const { token } = antdTheme.useToken()
  const progress = getWeekProgress(week, store)
  const accent = weekAccentHex(week.id)
  const [expanded, setExpanded] = useState(progress < 100)
  const [quizReview, setQuizReview] = useState<{ resource: TrailResource; answers: number[] } | null>(null)
  const weekEvidences = store.evidences.filter((evidence) => evidence.week === week.id)
  const weekQuizResults = week.resources
    .map((resource) => {
      const raw = store.quizzes[resource.id]
      const score = getQuizScore(raw)
      if (score == null) return null
      return {
        resource,
        score,
        total: getResourceQuiz(resource.id).length,
        answers: getQuizAnswers(raw),
      }
    })
    .filter((entry): entry is { resource: TrailResource; score: number; total: number; answers: number[] | undefined } => entry != null)

  return (
    <div id={`week-${week.id}`} style={{ scrollMarginTop: 96, marginTop: 24 }}>
      <Card styles={{ body: { padding: 0 } }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 12,
            padding: '20px 24px',
            borderBottom: expanded ? `1px solid ${token.colorBorderSecondary}` : 'none',
          }}
        >
          <div style={{ flex: '1 1 auto', minWidth: 0 }}>
            <Row gutter={[16, 12]} align="top" wrap>
              <Col xs={24} md={16}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', width: '100%' }}>
                  <Avatar shape="square" size={44} style={{ background: accent, fontWeight: 600, flex: 'none' }}>
                    {String(week.id).padStart(2, '0')}
                  </Avatar>
                  <div style={{ minWidth: 0, flex: '1 1 auto' }}>
                    <Text type="secondary" style={{ fontSize: 11, textTransform: 'uppercase' }}>
                      Semana {week.id}
                    </Text>
                    <Title level={3} style={{ margin: '2px 0 0', textWrap: 'balance' }}>
                      {week.title}
                    </Title>
                    <Paragraph type="secondary" style={{ margin: '4px 0 0', fontWeight: 400 }}>
                      {week.objective}
                    </Paragraph>
                  </div>
                </div>
              </Col>
              <Col xs={24} md={8}>
                <Space style={{ width: '100%', justifyContent: 'space-between', marginBottom: 4 }}>
                  <Text strong style={{ fontSize: 12 }}>
                    Progresso
                  </Text>
                  <Text strong style={{ fontSize: 16, color: accent }}>
                    {progress}%
                  </Text>
                </Space>
                <Progress percent={progress} showInfo={false} strokeColor={accent} strokeWidth={8} />
              </Col>
            </Row>
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
        <div style={{ padding: expanded ? '20px 24px 24px' : 0 }}>
        {expanded && (
        <>
        <Row gutter={24}>
          <Col xs={24} lg={16}>
            <Space style={{ width: '100%', justifyContent: 'space-between', marginBottom: 4 }}>
              <Title level={4} style={{ margin: 0 }}>
                Conteúdos selecionados
              </Title>
              <Text type="secondary" style={{ fontSize: 12 }}>
                {week.resources.length} itens · estudo curto
              </Text>
            </Space>
            <Space orientation="vertical" size={12} style={{ width: '100%' }}>
              {week.resources.map((resource) => {
                const completed = store.completed.includes(resource.id)
                const resourceQuiz = getResourceQuiz(resource.id)
                const quizScore = getQuizScore(store.quizzes[resource.id])
                const quizDone = quizScore != null

                return (
                  <Card key={resource.id} size="small">
                    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <Avatar shape="square" style={{ background: `${accent}1a`, color: accent, flex: 'none' }}>
                        {resourceIcon(resource.icon)}
                      </Avatar>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <Text strong style={{ display: 'block', marginBottom: 6 }}>
                          {resource.title}
                        </Text>
                        <Space size={6} wrap style={{ marginBottom: 12 }}>
                          <Text type="secondary" style={{ fontSize: 12 }}>
                            {resource.source}
                          </Text>
                          <Text type="secondary">·</Text>
                          <Text type="secondary" style={{ fontSize: 12 }}>
                            {resource.duration}
                          </Text>
                          <Tag>{resource.type}</Tag>
                        </Space>
                        <div
                          style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                            gap: 8,
                          }}
                        >
                          <Space size={8} wrap style={{ flex: 1 }}>
                            {!quizDone && resourceQuiz.length > 0 && (
                              <Button
                                type="primary"
                                icon={<QuestionCircleOutlined />}
                                aria-label={`Fazer teste de ${resource.title}`}
                                disabled={readOnly}
                                onClick={() => onOpenQuiz(resource, week)}
                              >
                                Fazer teste
                              </Button>
                            )}
                            <Button
                              variant="outlined"
                              icon={<LinkOutlined />}
                              href={resource.url}
                              target="_blank"
                              rel="noreferrer"
                              aria-label={`Abrir ${resource.title} (${resource.source})`}
                            >
                              Abrir
                            </Button>
                            <Button
                              type="text"
                              icon={<RobotOutlined />}
                              aria-label={`Estudar ${resource.title} com IA`}
                              onClick={() => onOpenPrompt(resource.topic, resource.url, `Semana ${week.id} — ${week.title}`)}
                            >
                              Estudar com IA
                            </Button>
                          </Space>
                          <Button
                            size="small"
                            shape="circle"
                            type={completed ? 'primary' : 'default'}
                            icon={completed ? <CheckOutlined /> : undefined}
                            style={{ flex: 'none' }}
                            disabled={readOnly}
                            aria-label={completed ? `Marcar "${resource.title}" como pendente` : `Marcar "${resource.title}" como concluído`}
                            aria-pressed={completed}
                            onClick={() => onToggleComplete(resource.id)}
                          />
                        </div>
                        {quizDone && <InlineQuizResult score={quizScore} total={resourceQuiz.length} />}
                      </div>
                    </div>
                  </Card>
                )
              })}
            </Space>
          </Col>

          <Col xs={24} lg={8}>
            <Card size="small" title="Entrega da semana">
              <List
                size="small"
                dataSource={week.deliverables}
                renderItem={(d) => (
                  <List.Item>
                    <Space align="start">
                      <CheckCircleFilled style={{ color: token.colorSuccess }} />
                      <Text style={{ fontSize: 12 }}>{d}</Text>
                    </Space>
                  </List.Item>
                )}
              />
            </Card>
            <Alert
              style={{ marginTop: 12 }}
              type="info"
              showIcon
              title="Explique o conceito sem copiar a IA, mostre aplicação na sprint e registre o antes/depois ou a decisão tomada."
            />
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: 20, alignItems: 'stretch' }}>
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
                  {weekQuizResults.map(({ resource, score, total, answers }) => (
                    <QuizResultSummary
                      key={resource.id}
                      title={resource.title}
                      score={score}
                      total={total}
                      canReview={answers != null && answers.length === total}
                      onReview={() => {
                        if (answers) setQuizReview({ resource, answers })
                      }}
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
                <Button type="primary" style={{ flex: 'none' }} disabled={readOnly} onClick={() => onAddEvidence(week.id)}>
                  Adicionar evidência
                </Button>
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
        width={640}
      >
        {quizReview && (
          <QuizReview
            title={quizReview.resource.title}
            questions={getResourceQuiz(quizReview.resource.id)}
            answers={quizReview.answers}
          />
        )}
      </Modal>
    </div>
  )
}
