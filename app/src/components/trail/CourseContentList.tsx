import {
  ApiOutlined,
  CheckOutlined,
  LinkOutlined,
  ReadOutlined,
} from '@ant-design/icons'
import { Button, Collapse, Space, Typography } from 'antd'
import { useMemo, useState } from 'react'
import type { TrailWeek } from '../../../shared/data/weeks'
import {
  groupEvidencesByResource,
} from '../../../shared/domain/evidence-resource'
import type { AppStore, Evidence } from '../../../shared/types/store'
import { EvidenceItem } from './EvidenceItem'

const { Text, Paragraph } = Typography

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
}: CourseContentListProps) {
  const [expandedKey, setExpandedKey] = useState<string | undefined>()

  const evidencesByResource = useMemo(
    () => groupEvidencesByResource(store.evidences, week),
    [store.evidences, week],
  )

  const items = week.resources.map((resource) => {
    const completed = store.completed.includes(resource.id)
    const resourceEvidences = evidencesByResource.get(resource.id) ?? []
    const defaultPracticalTitle = resource.practicalTasks?.find((task) => !task.action)?.title
    const hasPokemonAction = resource.practicalTasks?.some((task) => task.action === 'pokemon-api')

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
          <Paragraph type="secondary" style={{ margin: '0 0 12px' }}>
            {resource.topic}
          </Paragraph>

          <div className="course-content__items">
            <div className="course-content__item">
              <ReadOutlined className="course-content__item-icon" aria-hidden />
              <div className="course-content__item-body">
                <Text strong>{resource.title}</Text>
                <Text type="secondary" className="course-content__item-meta">
                  {resource.source} • {resource.type} • {resource.duration}
                </Text>
              </div>
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
      />
    </section>
  )
}
