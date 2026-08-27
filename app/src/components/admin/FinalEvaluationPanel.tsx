import { useEffect, useMemo, useState } from 'react'
import {
  Alert,
  App,
  Button,
  Card,
  Col,
  Input,
  Row,
  Space,
  Statistic,
  Tag,
  Typography,
  theme as antdTheme,
} from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import type { Evaluation, EvaluationAttachment } from '../../../shared/types/evaluation'
import { SCORE_DIMENSIONS } from '../../../shared/types/store'
import { calculateAverage } from '../../../shared/domain/progress'
import { EvaluationAttachmentsField } from './EvaluationAttachmentsField'
import { ColoredScoreDisplay, EvaluationScoreSlider, FeedbackDisplay } from './evaluationDisplay'

const { Title, Text, Paragraph } = Typography
const { TextArea } = Input

interface FinalEvaluationPanelProps {
  learnerId: string
  evaluation: Evaluation | null
  readOnly: boolean
  saving?: boolean
  onSave?: (scores: Record<string, number>, notes: string, attachments: EvaluationAttachment[]) => Promise<void>
}

export function FinalEvaluationPanel({
  learnerId,
  evaluation,
  readOnly,
  saving,
  onSave,
}: FinalEvaluationPanelProps) {
  const { message } = App.useApp()
  const { token } = antdTheme.useToken()
  const [scores, setScores] = useState<Record<string, number>>({})
  const [notes, setNotes] = useState('')
  const [attachments, setAttachments] = useState<EvaluationAttachment[]>([])
  const [dirty, setDirty] = useState(false)
  const [attachmentsSaving, setAttachmentsSaving] = useState(false)

  useEffect(() => {
    const initial: Record<string, number> = {}
    SCORE_DIMENSIONS.forEach((_, index) => {
      initial[String(index)] = evaluation?.scores[String(index)] ?? 3
    })
    setScores(initial)
    setNotes(evaluation?.notes ?? '')
    setAttachments(evaluation?.attachments ?? [])
    setDirty(false)
  }, [evaluation])

  const average = useMemo(
    () => calculateAverage(scores, SCORE_DIMENSIONS.length),
    [scores],
  )

  function updateScore(index: number, value: number) {
    setScores((prev) => ({ ...prev, [String(index)]: value }))
    setDirty(true)
  }

  async function handleAttachmentsChange(next: EvaluationAttachment[]) {
    const previous = attachments
    setAttachments(next)
    setDirty(true)
    if (readOnly || !onSave) return

    setAttachmentsSaving(true)
    try {
      await onSave(scores, notes, next)
      setDirty(false)
      message.success('Prints atualizados.')
    } catch (err) {
      setAttachments(previous)
      message.error(err instanceof Error ? err.message : 'Falha ao salvar prints.')
    } finally {
      setAttachmentsSaving(false)
    }
  }

  return (
    <div id="assessment" className="week-section final-evaluation-section">
      <Card styles={{ body: { padding: 0 } }}>
        <div
          className="week-section-header week-section-header--expanded"
          style={{ borderBottom: `1px solid ${token.colorBorderSecondary}` }}
        >
          <div style={{ flex: '1 1 auto', minWidth: 0 }}>
            <Title level={3} style={{ margin: 0 }}>
              Avaliação final do ciclo
            </Title>
            <Paragraph type="secondary" style={{ margin: '4px 0 0' }}>
              {readOnly
                ? 'Consolidação das seis dimensões registrada pelo avaliador ao fim dos 30 dias.'
                : 'Registre a avaliação completa do participante com base em evidências observáveis ao longo do ciclo.'}
            </Paragraph>
          </div>
        </div>

        <div className="week-section-body is-expanded">
          {!readOnly && (
            <Alert
              type="info"
              showIcon
              style={{ marginBottom: 16 }}
              title="Somente o admin pode editar esta avaliação. O participante visualiza o resultado em modo leitura."
            />
          )}

          <section className="week-block">
            <div className="week-two-col-grid">
              {SCORE_DIMENSIONS.map((dimension, index) => {
                const evaluated = evaluation?.scores[String(index)] != null
                const scoreValue = scores[String(index)] ?? 3
                return (
                  <Card key={dimension} size="small" className="week-grid-card final-evaluation-dimension-card">
                    <Space style={{ width: '100%', justifyContent: 'space-between', marginBottom: 4 }}>
                      <Space size={6} wrap>
                        <Text strong style={{ fontSize: 12 }}>
                          {dimension}
                        </Text>
                        {!evaluated && readOnly && (
                          <Tag color="default" style={{ fontSize: 11 }}>
                            Ainda não avaliado
                          </Tag>
                        )}
                      </Space>
                      <Tag
                        color={readOnly && evaluated ? token.colorPrimary : undefined}
                        style={{ fontWeight: 600, flex: 'none' }}
                      >
                        {scoreValue}/5
                      </Tag>
                    </Space>
                    {readOnly ? (
                      <ColoredScoreDisplay value={scoreValue} accent={token.colorPrimary} />
                    ) : (
                      <EvaluationScoreSlider
                        value={scoreValue}
                        accent={token.colorPrimary}
                        onChange={(value) => updateScore(index, value)}
                      />
                    )}
                  </Card>
                )
              })}
            </div>
          </section>

          <section className="week-block week-block--panels">
            <Card size="small" className="week-grid-card" title="Parecer geral">
              {readOnly ? (
                <FeedbackDisplay text={notes} />
              ) : (
                <TextArea
                  rows={5}
                  value={notes}
                  onChange={(e) => {
                    setNotes(e.target.value)
                    setDirty(true)
                  }}
                  placeholder="Síntese final: evolução observada, pontos fortes, gaps críticos e recomendação para o próximo ciclo."
                />
              )}
              <div style={{ marginTop: 16 }}>
                <EvaluationAttachmentsField
                  learnerId={learnerId}
                  scope="final"
                  week={null}
                  value={attachments}
                  readOnly={readOnly}
                  busy={attachmentsSaving || saving}
                  onChange={handleAttachmentsChange}
                />
              </div>
            </Card>
          </section>

          <section className="week-block week-block--panels">
            <Card size="small" className="week-grid-card">
              <Row justify="space-between" align="middle" gutter={[16, 16]}>
                <Col>
                  <Statistic title="Média final" value={Number(average.toFixed(1))} suffix="/ 5" />
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    Meta sugerida: média ≥ 3,5 e nenhuma dimensão crítica abaixo de 3.
                  </Text>
                </Col>
                {!readOnly && onSave && (
                  <Col>
                    <Space direction="vertical" align="end" size={4} className="final-evaluation-footer__actions">
                      {dirty && (
                        <Text type="warning" style={{ fontSize: 12 }}>
                          <ExclamationCircleOutlined /> Alterações não salvas
                        </Text>
                      )}
                      <Button
                        type="primary"
                        loading={saving || attachmentsSaving}
                        onClick={async () => {
                          if (!onSave) return
                          await onSave(scores, notes, attachments)
                          setDirty(false)
                        }}
                      >
                        Salvar avaliação final
                      </Button>
                    </Space>
                  </Col>
                )}
              </Row>
              {readOnly && evaluation?.updatedAt && (
                <Text type="secondary" style={{ fontSize: 11, display: 'block', marginTop: 12 }}>
                  Atualizado em {new Date(evaluation.updatedAt).toLocaleString('pt-BR')}
                </Text>
              )}
            </Card>
          </section>
        </div>
      </Card>
    </div>
  )
}
