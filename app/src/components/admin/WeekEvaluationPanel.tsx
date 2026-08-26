import { useEffect, useState } from 'react'
import { App, Button, Card, Input, Typography, theme as antdTheme } from 'antd'
import type { Evaluation, EvaluationAttachment } from '../../../shared/types/evaluation'
import { EvaluationAttachmentsField } from './EvaluationAttachmentsField'
import {
  ColoredScoreDisplay,
  EvaluationScoreSlider,
  FeedbackDisplay,
} from './evaluationDisplay'

const { Text, Paragraph } = Typography
const { TextArea } = Input

interface WeekEvaluationPanelProps {
  weekId: number
  learnerId: string
  accent: string
  evaluation?: Evaluation
  readOnly: boolean
  saving?: boolean
  embedded?: boolean
  onSave?: (overall: number, notes: string, attachments: EvaluationAttachment[]) => Promise<void>
}

export function WeekEvaluationPanel({
  weekId,
  learnerId,
  accent,
  evaluation,
  readOnly,
  saving,
  embedded = false,
  onSave,
}: WeekEvaluationPanelProps) {
  const { message } = App.useApp()
  const { token } = antdTheme.useToken()
  const [overall, setOverall] = useState(evaluation?.scores.overall ?? 3)
  const [notes, setNotes] = useState(evaluation?.notes ?? '')
  const [attachments, setAttachments] = useState<EvaluationAttachment[]>(evaluation?.attachments ?? [])
  const [attachmentsSaving, setAttachmentsSaving] = useState(false)

  useEffect(() => {
    setOverall(evaluation?.scores.overall ?? 3)
    setNotes(evaluation?.notes ?? '')
    setAttachments(evaluation?.attachments ?? [])
  }, [evaluation])

  const evaluated = evaluation != null
  const displayScore = readOnly ? (evaluation?.scores.overall ?? overall) : overall

  async function handleSave() {
    if (readOnly || !onSave) return
    await onSave(overall, notes, attachments)
  }

  async function handleAttachmentsChange(next: EvaluationAttachment[]) {
    const previous = attachments
    setAttachments(next)
    if (readOnly || !onSave) return

    setAttachmentsSaving(true)
    try {
      await onSave(overall, notes, next)
      message.success('Prints atualizados.')
    } catch (err) {
      setAttachments(previous)
      message.error(err instanceof Error ? err.message : 'Falha ao salvar prints.')
    } finally {
      setAttachmentsSaving(false)
    }
  }

  const title = <Text strong>Avaliação do avaliador</Text>

  const body = readOnly && !evaluated ? (
    <Paragraph type="secondary" style={{ marginBottom: 0 }}>
      O avaliador ainda não registrou feedback desta semana.
    </Paragraph>
  ) : (
    <>
      <Text style={{ fontSize: 12, color: token.colorTextSecondary, display: 'block', marginBottom: 8 }}>
        Nota geral da semana (conteúdo, aplicação e evidências)
      </Text>

      <div>
        {readOnly ? (
          <ColoredScoreDisplay value={displayScore} accent={accent} />
        ) : (
          <EvaluationScoreSlider value={overall} accent={accent} onChange={setOverall} />
        )}

        {readOnly ? (
          <FeedbackDisplay text={notes} belowScale />
        ) : (
          <div className="evaluation-feedback-below-scale">
            <TextArea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Feedback qualitativo: o que evoluiu, o que falta e próxima ação."
            />
          </div>
        )}

        <div className="evaluation-feedback-below-scale">
          <EvaluationAttachmentsField
            learnerId={learnerId}
            scope="week"
            week={weekId}
            value={attachments}
            readOnly={readOnly}
            busy={attachmentsSaving || saving}
            onChange={handleAttachmentsChange}
          />
        </div>
      </div>

      {!readOnly && onSave && (
        <div className="week-evaluation-save" style={{ marginTop: 12, textAlign: 'right' }}>
          <Button type="primary" loading={saving || attachmentsSaving} onClick={handleSave}>
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
  )

  if (embedded) {
    return (
      <div
        className="week-evaluation-panel-embedded"
        style={{
          marginTop: 20,
        }}
      >
        <div style={{ marginBottom: 12 }}>{title}</div>
        {body}
      </div>
    )
  }

  return (
    <Card className="week-evaluation-panel-card" size="small" title={title} style={{ marginTop: 16 }}>
      {body}
    </Card>
  )
}

