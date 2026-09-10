import { Card, Statistic, Tag, Typography, theme as antdTheme } from 'antd'
import { CheckCircleOutlined } from '@ant-design/icons'

const { Title, Text, Paragraph } = Typography

interface FinalEvaluationPanelProps {
  weeksAverage: number | null
  allWeeksEvaluated: boolean
}

export function FinalEvaluationPanel({ weeksAverage, allWeeksEvaluated }: FinalEvaluationPanelProps) {
  const { token } = antdTheme.useToken()

  return (
    <div id="assessment" className="week-section final-evaluation-section">
      <Card styles={{ body: { padding: 0 } }}>
        <div
          className="week-section-header week-section-header--expanded"
          style={{ borderBottom: `1px solid ${token.colorBorderSecondary}` }}
        >
          <div style={{ flex: '1 1 auto', minWidth: 0 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                flexWrap: 'wrap',
              }}
            >
              <Title level={3} style={{ margin: 0 }}>
                Avaliação final do ciclo
              </Title>
              {allWeeksEvaluated && (
                <Tag
                  icon={<CheckCircleOutlined />}
                  color="success"
                  style={{ margin: 0, fontWeight: 500 }}
                >
                  Concluído
                </Tag>
              )}
            </div>
            <Paragraph type="secondary" style={{ margin: '4px 0 0' }}>
              Média calculada a partir das notas que o avaliador registrou em cada semana do ciclo.
            </Paragraph>
          </div>
        </div>

        <div className="week-section-body is-expanded">
          <section className="week-block week-block--panels">
            <Card size="small" className="week-grid-card">
              <Statistic
                title="Média final das semanas"
                value={weeksAverage != null ? Number(weeksAverage.toFixed(1)) : '—'}
                suffix={weeksAverage != null ? '/ 5' : undefined}
              />
              <Text type="secondary" style={{ fontSize: 12 }}>
                Meta sugerida: média ≥ 3,5 e nenhuma semana crítica abaixo de 3.
              </Text>
            </Card>
          </section>
        </div>
      </Card>
    </div>
  )
}
