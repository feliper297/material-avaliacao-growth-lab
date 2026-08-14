import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons'
import { Alert, Space, Tag, Typography, theme as antdTheme } from 'antd'
import type { QuizItem } from '../../../shared/data/weeks'

const { Text, Paragraph } = Typography

interface QuizReviewProps {
  title: string
  questions: QuizItem[]
  score: number
  answers?: number[]
}

export function QuizReview({ title, questions, score, answers }: QuizReviewProps) {
  const { token } = antdTheme.useToken()
  const hasDetailedAnswers = answers != null && answers.length === questions.length
  const computedScore = hasDetailedAnswers
    ? questions.reduce((sum, item, index) => sum + (answers[index] === item.answer ? 1 : 0), 0)
    : score
  const errors = questions.length - computedScore

  return (
    <div>
      <Alert
        type={computedScore >= 2 ? 'success' : 'warning'}
        showIcon
        title={`${computedScore} acerto${computedScore === 1 ? '' : 's'} · ${errors} erro${errors === 1 ? '' : 's'} em "${title}"`}
        style={{ marginBottom: 16 }}
      />

      {!hasDetailedAnswers && (
        <Alert
          type="info"
          showIcon
          title="Revisão parcial"
          description="Este teste foi salvo antes do registro detalhado das respostas. Abaixo estão as questões com a alternativa correta de cada uma."
          style={{ marginBottom: 16 }}
        />
      )}

      <Space orientation="vertical" size={16} style={{ width: '100%' }}>
        {questions.map((item, index) => {
          const selected = hasDetailedAnswers ? answers[index] : undefined
          const isCorrect = selected === item.answer
          const isWrong = selected != null && !isCorrect

          return (
            <div
              key={index}
              style={{
                padding: '12px 14px',
                borderRadius: token.borderRadiusLG,
                border: `1px solid ${
                  !hasDetailedAnswers
                    ? token.colorBorderSecondary
                    : isCorrect
                      ? token.colorSuccessBorder
                      : token.colorErrorBorder
                }`,
                background: !hasDetailedAnswers
                  ? token.colorFillAlter
                  : isCorrect
                    ? token.colorSuccessBg
                    : token.colorErrorBg,
              }}
            >
              <Space align="start" size={8} style={{ marginBottom: 10 }}>
                {hasDetailedAnswers ? (
                  isCorrect ? (
                    <CheckCircleFilled style={{ color: token.colorSuccess, marginTop: 3 }} />
                  ) : (
                    <CloseCircleFilled style={{ color: token.colorError, marginTop: 3 }} />
                  )
                ) : null}
                <div style={{ flex: 1 }}>
                  <Text strong>
                    {index + 1}. {item.q}
                  </Text>
                  {hasDetailedAnswers && (
                    <div style={{ marginTop: 6 }}>
                      <Tag color={isCorrect ? 'success' : 'error'}>{isCorrect ? 'Acertou' : 'Errou'}</Tag>
                    </div>
                  )}
                </div>
              </Space>

              <Space orientation="vertical" size={6} style={{ width: '100%' }}>
                {item.options.map((option, optionIndex) => {
                  const isSelected = selected === optionIndex
                  const isCorrectOption = item.answer === optionIndex

                  let borderColor = token.colorBorderSecondary
                  let background = token.colorBgContainer

                  if (isCorrectOption) {
                    borderColor = token.colorSuccess
                    background = token.colorSuccessBg
                  } else if (isSelected && isWrong) {
                    borderColor = token.colorError
                    background = token.colorErrorBg
                  }

                  return (
                    <div
                      key={optionIndex}
                      style={{
                        padding: '8px 10px',
                        borderRadius: token.borderRadius,
                        border: `1px solid ${borderColor}`,
                        background,
                      }}
                    >
                      <Space wrap size={[8, 4]}>
                        <Text style={{ color: isSelected || isCorrectOption ? token.colorText : token.colorTextSecondary }}>
                          {option}
                        </Text>
                        {isSelected && <Tag color={isCorrect ? 'success' : 'error'}>Sua resposta</Tag>}
                        {isCorrectOption && <Tag color="success">Resposta correta</Tag>}
                      </Space>
                    </div>
                  )
                })}
              </Space>

              {isWrong && (
                <Paragraph type="secondary" style={{ marginTop: 10, marginBottom: 0, fontSize: 12 }}>
                  A alternativa correta era: <Text strong>{item.options[item.answer]}</Text>
                </Paragraph>
              )}
            </div>
          )
        })}
      </Space>
    </div>
  )
}
