import { useCallback, useEffect, useState } from 'react'
import { Card, Input, Space, Tag, Typography, theme as antdTheme } from 'antd'
import type { Evaluation } from '../../../shared/types/evaluation'
import {
  ColoredScoreDisplay,
  EvaluationScoreSlider,
  FeedbackDisplay,
} from './evaluationDisplay'

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
  const { token } = antdTheme.useToken()
  const [overall, setOverall] = useState(evaluation?.scores.overall ?? 3)
  const [notes, setNotes] = useState(evaluation?.notes ?? '')

  useEffect(() => {
    setOverall(evaluation?.scores.overall ?? 3)
    setNotes(evaluation?.notes ?? '')
  }, [evaluation])

  const evaluated = evaluation != null
  const displayScore = readOnly ? (evaluation?.scores.overall ?? overall) : overall

  const persistEvaluation = useCallback(
    async (nextOverall: number, nextNotes: string) => {
      if (readOnly || !onSave) return
      await onSave(nextOverall, nextNotes)
    },
    [onSave, readOnly],
  )

  async function handleScoreComplete(value: number) {
    setOverall(value)
    await persistEvaluation(value, notes)
  }

  async function handleNotesBlur() {
    await persistEvaluation(overall, notes)
  }

  return (
    <Card
      className="week-evaluation-panel-card"
      size="small"
      title={
        <Space>
          <Text strong>Avaliação do avaliador</Text>
          {evaluated || !readOnly ? (
            <Tag color={accent} style={{ fontWeight: 600 }}>
              Semana {weekId} · {displayScore}/5
            </Tag>
          ) : (
            <Tag>Ainda não avaliado</Tag>
          )}
          {saving ? <Tag color="processing">Salvando…</Tag> : null}
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
            <Text style={{ fontSize: 12, color: token.colorTextSecondary }}>
              Nota geral da semana (conteúdo, aplicação e evidências)
            </Text>
            <Tag color={accent} style={{ fontWeight: 600, margin: 0 }}>
              {displayScore}/5
            </Tag>
          </Space>

          <div>
            {readOnly ? (
              <ColoredScoreDisplay value={displayScore} accent={accent} />
            ) : (
              <EvaluationScoreSlider
                value={overall}
                accent={accent}
                onChange={setOverall}
                onChangeComplete={handleScoreComplete}
              />
            )}

            {readOnly ? (
              <FeedbackDisplay text={notes} belowScale />
            ) : (
              <div className="evaluation-feedback-below-scale">
                <TextArea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  onBlur={handleNotesBlur}
                  placeholder="Feedback qualitativo: o que evoluiu, o que falta e próxima ação."
                />
              </div>
            )}
          </div>

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
