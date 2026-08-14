import { useEffect, useState } from 'react'
import { Button, Card, Input, Slider, Space, Tag, Typography } from 'antd'
import type { Evaluation } from '../../../shared/types/evaluation'

const { Text, Paragraph } = Typography
const { TextArea } = Input

interface WeekEvaluationPanelProps {
  weekId: number
  accent: string
  evaluation?: Evaluation
  readOnly: boolean
  saving?: boolean
  onSave?: (overall: number, notes: string) => Promise<void>
}

export function WeekEvaluationPanel({
  weekId,
  accent,
  evaluation,
  readOnly,
  saving,
  onSave,
}: WeekEvaluationPanelProps) {
  const [overall, setOverall] = useState(evaluation?.scores.overall ?? 3)
  const [notes, setNotes] = useState(evaluation?.notes ?? '')

  useEffect(() => {
    setOverall(evaluation?.scores.overall ?? 3)
    setNotes(evaluation?.notes ?? '')
  }, [evaluation])

  const evaluated = evaluation != null

  return (
    <Card
      size="small"
      title={
        <Space>
          <Text strong>Avaliação do avaliador</Text>
          {evaluated ? (
            <Tag color={accent}>Semana {weekId} · {evaluation.scores.overall}/5</Tag>
          ) : (
            <Tag>Ainda não avaliado</Tag>
          )}
        </Space>
      }
      style={{ marginTop: 16 }}
    >
      {readOnly && !evaluated ? (
        <Paragraph type="secondary" style={{ marginBottom: 0 }}>
          O avaliador ainda não registrou feedback desta semana.
        </Paragraph>
      ) : (
        <>
          <Space style={{ width: '100%', justifyContent: 'space-between', marginBottom: 8 }}>
            <Text type="secondary" style={{ fontSize: 12 }}>
              Nota geral da semana (conteúdo, aplicação e evidências)
            </Text>
            <Tag>{overall}/5</Tag>
          </Space>
          <Slider
            min={1}
            max={5}
            step={1}
            marks={{ 1: '1', 2: '2', 3: '3', 4: '4', 5: '5' }}
            value={overall}
            disabled={readOnly}
            onChange={setOverall}
          />
          <TextArea
            rows={3}
            value={notes}
            disabled={readOnly}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Feedback qualitativo: o que evoluiu, o que falta e próxima ação."
            style={{ marginTop: 12 }}
          />
          {!readOnly && onSave && (
            <div style={{ marginTop: 12, textAlign: 'right' }}>
              <Button type="primary" loading={saving} onClick={() => onSave(overall, notes)}>
                Salvar avaliação da semana
              </Button>
            </div>
          )}
          {readOnly && evaluation?.updatedAt && (
            <Text type="secondary" style={{ fontSize: 11, display: 'block', marginTop: 8 }}>
              Atualizado em {new Date(evaluation.updatedAt).toLocaleString('pt-BR')}
            </Text>
          )}
        </>
      )}
    </Card>
  )
}
