import {
  ApiOutlined,
  CheckOutlined,
  DownOutlined,
  FileTextOutlined,
  LinkOutlined,
  ReadOutlined,
} from '@ant-design/icons'
import { Button, Collapse, Modal, Space, Typography } from 'antd'
import { useMemo, useState } from 'react'
import type { QuizItem, TrailWeek } from '../../../shared/data/weeks'
import { groupEvidencesByResource } from '../../../shared/domain/evidence-resource'
import { getQuizAnswers, getQuizScore } from '../../../shared/domain/quiz'
import type { AppStore, Evidence } from '../../../shared/types/store'
import { useBreakpointLayout } from '../../hooks/useBreakpointLayout'
import { EvidenceItem, QuizResultSummary, QuizReview } from './EvidenceItem'
import { QuizForm } from './QuizForm'

const { Text } = Typography

interface CourseContentListProps {
  week: TrailWeek
  store: AppStore
  readOnly?: boolean
  accent: string
  onToggleComplete: (id: string) => void
  onAddEvidence: (weekId: number, resourceId: string, defaultTitle?: string) => void
  onEditEvidence: (evidence: Evidence) => void
  onDeleteEvidence: (evidence: Evidence) => void
  onOpenPokemonApi: () => void
  getResourceQuiz: (resourceId: string) => QuizItem[]
  onSaveQuiz?: (resourceId: string, score: number, answers: number[]) => Promise<void>
}

export function CourseContentList({
  week,
  store,
  readOnly = false,
  accent,
  onToggleComplete,
  onAddEvidence,
  onEditEvidence,
  onDeleteEvidence,
  onOpenPokemonApi,
  getResourceQuiz,
  onSaveQuiz,
}: CourseContentListProps) {
  const [expandedKey, setExpandedKey] = useState<string | undefined>()
  const [quizResourceId, setQuizResourceId] = useState<string | null>(null)
  const { modalWidth, modalStyle, modalStyles } = useBreakpointLayout()

  const evidencesByResource = useMemo(
    () => groupEvidencesByResource(store.evidences, week),
    [store.evidences, week],
  )

  const activeQuizResource = week.resources.find((resource) => resource.id === quizResourceId)
  const activeQuizQuestions = quizResourceId ? getResourceQuiz(quizResourceId) : []
  const activeQuizScore = quizResourceId ? getQuizScore(store.quizzes[quizResourceId]) : undefined
  const activeQuizAnswers = quizResourceId ? getQuizAnswers(store.quizzes[quizResourceId]) : undefined

  const items = week.resources.map((resource) => {
    const completed = store.completed.includes(resource.id)
    const resourceEvidences = evidencesByResource.get(resource.id) ?? []
    const defaultPracticalTitle = resource.practicalTasks?.find((task) => !task.action)?.title
    const hasPokemonAction = resource.practicalTasks?.some((task) => task.action === 'pokemon-api')
    const quizQuestions = getResourceQuiz(resource.id)
    const hasQuiz = quizQuestions.length > 0
    const quizResult = store.quizzes[resource.id]
    const quizScore = getQuizScore(quizResult)

    return {
      key: resource.id,
      label: (
        <div className="course-content__row">
          <Text strong className="course-content__row-title">
            {resource.title}
          </Text>
        </div>
      ),
      children: (
        <div className="course-content__panel">
          <div className="course-content__items">
            <div className="course-content__item course-content__item--material">
              <ReadOutlined className="course-content__item-icon" aria-hidden />
              <Text type="secondary" className="course-content__item-topic">
                {resource.topic}
              </Text>
              <Space size={8} wrap className="course-content__item-actions course-content__item-actions--material">
                <Button
                  className="app-trail-action-btn"
                  type="primary"
                  size="small"
                  icon={<LinkOutlined />}
                  href={resource.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Abrir
                </Button>
                {!readOnly && (
                  <Button
                    className="app-trail-action-btn"
                    variant="outlined"
                    size="small"
                    onClick={() =>
                      onAddEvidence(week.id, resource.id, defaultPracticalTitle)
                    }
                  >
                    Registrar evidência
                  </Button>
                )}
                {hasQuiz && !readOnly && quizScore == null && (
                  <Button
                    className="app-trail-action-btn"
                    variant="outlined"
                    size="small"
                    icon={<FileTextOutlined />}
                    onClick={() => setQuizResourceId(resource.id)}
                  >
                    Fazer teste
                  </Button>
                )}
                {hasPokemonAction && (
                  <Button
                    className="app-trail-action-btn"
                    variant="outlined"
                    size="small"
                    icon={<ApiOutlined />}
                    onClick={onOpenPokemonApi}
                  >
                    Explorar API Pokémon
                  </Button>
                )}
                <Button
                  size="small"
                  shape="circle"
                  type={completed ? 'primary' : 'default'}
                  icon={completed ? <CheckOutlined /> : undefined}
                  disabled={readOnly}
                  aria-label={
                    completed
                      ? `Marcar "${resource.title}" como pendente`
                      : `Marcar "${resource.title}" como concluído`
                  }
                  aria-pressed={completed}
                  onClick={() => onToggleComplete(resource.id)}
                />
              </Space>
            </div>

            {hasQuiz && quizScore != null && (
              <QuizResultSummary
                title={`Teste — ${resource.title}`}
                score={quizScore}
                total={quizQuestions.length}
                onReview={() => setQuizResourceId(resource.id)}
              />
            )}

            {resourceEvidences.length > 0 && (
              <div className="course-content__evidences">
                {resourceEvidences.map((evidence) => (
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
          </div>
        </div>
      ),
    }
  })

  return (
    <section className="course-content">
      <div className="course-content__header">
        <div>
          <Typography.Title level={4} className="week-block__title" style={{ marginBottom: 4 }}>
            Conteúdos selecionados
          </Typography.Title>
        <Text type="secondary">
          {week.resources.length} conteúdo{week.resources.length === 1 ? '' : 's'}
        </Text>
        </div>
      </div>

      <Collapse
        accordion
        bordered={false}
        className="course-content__collapse"
        activeKey={expandedKey}
        onChange={(key) => setExpandedKey(typeof key === 'string' ? key : undefined)}
        items={items}
        expandIcon={({ isActive }) => (
          <DownOutlined
            style={{
              transition: 'transform 0.2s',
              transform: isActive ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          />
        )}
      />

      <Modal
        open={quizResourceId != null && activeQuizQuestions.length > 0}
        title={activeQuizResource ? `Teste — ${activeQuizResource.title}` : 'Teste'}
        onCancel={() => setQuizResourceId(null)}
        footer={null}
        destroyOnHidden
        width={modalWidth}
        style={modalStyle}
        styles={modalStyles}
      >
        {activeQuizResource && activeQuizScore == null && onSaveQuiz && (
          <QuizForm
            title={activeQuizResource.title}
            questions={activeQuizQuestions}
            onClose={() => setQuizResourceId(null)}
            onSubmit={async (score, answers) => {
              await onSaveQuiz(activeQuizResource.id, score, answers)
            }}
          />
        )}
        {activeQuizResource && activeQuizScore != null && (
          <QuizReview
            title={activeQuizResource.title}
            score={activeQuizScore}
            total={activeQuizQuestions.length}
            questions={activeQuizQuestions}
            answers={activeQuizAnswers}
          />
        )}
      </Modal>
    </section>
  )
}
