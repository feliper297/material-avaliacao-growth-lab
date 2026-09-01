import {
  AimOutlined,
  ApiOutlined,
  AppstoreOutlined,
  BlockOutlined,
  CheckCircleOutlined,
  ClusterOutlined,
  CodeOutlined,
  GroupOutlined,
  InboxOutlined,
  NodeIndexOutlined,
  NumberOutlined,
  QuestionOutlined,
  ReadOutlined,
  RobotOutlined,
  SwapOutlined,
  TableOutlined,
} from '@ant-design/icons'
import { Avatar, Card, Tag, Typography, theme as antdTheme } from 'antd'
import { useState, type ComponentType } from 'react'
import type { QuizItem } from '../../../shared/data/weeks'
import { weekAccentHex, type TrailWeek } from '../../../shared/data/weeks'
import { isWeekClosed } from '../../../shared/domain/progress'
import type { AppStore, Evidence } from '../../../shared/types/store'
import type { Evaluation, EvaluationAttachment } from '../../../shared/types/evaluation'
import { CourseContentList } from './CourseContentList'
import { PokemonApiModal } from './PokemonApiModal'
import { WeekEvaluationPanel } from '../admin/WeekEvaluationPanel'
import { useBreakpointLayout } from '../../hooks/useBreakpointLayout'

const { Title, Paragraph } = Typography

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
  CodeOutlined,
  RobotOutlined,
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
  onAddEvidence: (weekId: number, resourceId?: string, defaultTitle?: string) => void
  onEditEvidence: (evidence: Evidence) => void
  onDeleteEvidence: (evidence: Evidence) => void
  getResourceQuiz: (resourceId: string) => QuizItem[]
  onSaveQuiz?: (resourceId: string, score: number, answers: number[]) => Promise<void>
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
  onAddEvidence,
  onEditEvidence,
  onDeleteEvidence,
  getResourceQuiz,
  onSaveQuiz,
}: WeekSectionProps) {
  const { token } = antdTheme.useToken()
  const { modalWidth, modalStyle, modalStyles } = useBreakpointLayout()
  const accent = weekAccentHex(week.id)
  const weekClosed = isWeekClosed(week, store)
  const [pokemonModalOpen, setPokemonModalOpen] = useState(false)

  return (
    <div id={`week-${week.id}`} className="week-section">
      <Card styles={{ body: { padding: 0 } }}>
        <div
          className="week-section-header week-section-header--expanded"
          style={{
            borderBottom: `1px solid ${token.colorBorderSecondary}`,
          }}
        >
          <div style={{ flex: '1 1 auto', minWidth: 0 }}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', width: '100%' }}>
              <Avatar shape="square" size={44} style={{ background: accent, fontWeight: 600, flex: 'none' }}>
                {String(week.id).padStart(2, '0')}
              </Avatar>
              <div style={{ minWidth: 0, flex: '1 1 auto' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    flexWrap: 'wrap',
                  }}
                >
                  <Title level={3} style={{ margin: 0, textWrap: 'balance' }}>
                    {week.title}
                  </Title>
                  {weekClosed && (
                    <Tag
                      icon={<CheckCircleOutlined />}
                      color="success"
                      style={{ margin: 0, fontWeight: 500 }}
                    >
                      Concluído
                    </Tag>
                  )}
                </div>
                <Paragraph type="secondary" style={{ margin: '4px 0 0', fontWeight: 400 }}>
                  {week.objective}
                </Paragraph>
              </div>
            </div>
          </div>
        </div>
        <div className="week-section-body is-expanded">
          <CourseContentList
            week={week}
            store={store}
            readOnly={readOnly}
            accent={accent}
            onToggleComplete={onToggleComplete}
            onAddEvidence={onAddEvidence}
            onEditEvidence={onEditEvidence}
            onDeleteEvidence={onDeleteEvidence}
            onOpenPokemonApi={() => setPokemonModalOpen(true)}
            getResourceQuiz={getResourceQuiz}
            onSaveQuiz={onSaveQuiz}
          />

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
        </div>
      </Card>

      <PokemonApiModal
        open={pokemonModalOpen}
        onClose={() => setPokemonModalOpen(false)}
        width={modalWidth}
        style={modalStyle}
        styles={modalStyles}
      />
    </div>
  )
}

/** Mantido para referência de ícones em outros módulos, se necessário. */
export function resourceIcon(key: string) {
  const IconComponent = RESOURCE_ICONS[key] ?? QuestionOutlined
  return <IconComponent />
}
