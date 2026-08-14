import { useEffect, useMemo, useState } from 'react'
import {
  Alert,
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
import type { Evaluation } from '../../../shared/types/evaluation'
import { SCORE_DIMENSIONS } from '../../../shared/types/store'
import { calculateAverage } from '../../../shared/domain/progress'
import { ColoredScoreDisplay, EvaluationScoreSlider, FeedbackDisplay } from './evaluationDisplay'

const { Title, Text, Paragraph } = Typography
const { TextArea } = Input

interface FinalEvaluationPanelProps {
  evaluation: Evaluation | null
  readOnly: boolean
  saving?: boolean
  onSave?: (scores: Record<string, number>, notes: string) => Promise<void>
}

export function FinalEvaluationPanel({
  evaluation,
  readOnly,
  saving,
  onSave,
}: FinalEvaluationPanelProps) {
  const { token } = antdTheme.useToken()
  const [scores, setScores] = useState<Record<string, number>>({})
  const [notes, setNotes] = useState('')
  const [dirty, setDirty] = useState(false)

  useEffect(() => {
    const initial: Record<string, number> = {}
    SCORE_DIMENSIONS.forEach((_, index) => {
      initial[String(index)] = evaluation?.scores[String(index)] ?? 3
    })
    setScores(initial)
    setNotes(evaluation?.notes ?? '')
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

  return (
    <div id="assessment" style={{ scrollMarginTop: 72, marginTop: 40 }}>
      <Title level={3} style={{ marginBottom: 4 }}>
        Avaliação final do ciclo
      </Title>
      <Paragraph type="secondary">
        {readOnly
          ? 'Consolidação das seis dimensões registrada pelo avaliador ao fim dos 30 dias.'
          : 'Registre a avaliação completa do participante com base em evidências observáveis ao longo do ciclo.'}
      </Paragraph>

      {!readOnly && (
        <Alert
          type="info"
          showIcon
          style={{ marginBottom: 16 }}
          title="Somente o admin pode editar esta avaliação. O participante visualiza o resultado em modo leitura."
        />
      )}

      <Row gutter={[16, 16]} style={{ alignItems: 'stretch' }}>
        {SCORE_DIMENSIONS.map((dimension, index) => {
          const evaluated = evaluation?.scores[String(index)] != null
          const scoreValue = scores[String(index)] ?? 3
          return (
            <Col xs={24} md={12} key={dimension} style={{ display: 'flex' }}>
              <Card size="small" className="final-evaluation-dimension-card" style={{ width: '100%' }}>
                <Space style={{ width: '100%', justifyContent: 'space-between', marginBottom: 4 }}>
                  <Space size={6}>
                    <Text strong style={{ fontSize: 12 }}>
                      {dimension}
                    </Text>
                    {!evaluated && readOnly && (
                      <Tag color="default" style={{ fontSize: 11 }}>
                        Ainda não avaliado
                      </Tag>
                    )}
                  </Space>
                  <Tag color={readOnly && evaluated ? token.colorPrimary : undefined} style={{ fontWeight: 600 }}>
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
            </Col>
          )
        })}

        <Col span={24}>
          <Card size="small" title="Parecer geral">
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
          </Card>
        </Col>

        <Col span={24}>
          <Card size="small">
            <Row justify="space-between" align="middle" gutter={[16, 16]}>
              <Col>
                <Statistic title="Média final" value={Number(average.toFixed(1))} suffix="/ 5" />
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Meta sugerida: média ≥ 3,5 e nenhuma dimensão crítica abaixo de 3.
                </Text>
              </Col>
              {!readOnly && onSave && (
                <Col>
                  <Space direction="vertical" align="end" size={4}>
                    {dirty && (
                      <Text type="warning" style={{ fontSize: 12 }}>
                        <ExclamationCircleOutlined /> Alterações não salvas
                      </Text>
                    )}
                    <Button
                      type="primary"
                      loading={saving}
                      onClick={() => onSave(scores, notes)}
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
        </Col>
      </Row>
    </div>
  )
}
