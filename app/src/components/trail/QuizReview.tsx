import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons'
import { Alert, Button, Space, Tag, Typography, theme as antdTheme } from 'antd'
import type { QuizItem } from '../../../shared/data/weeks'

const { Text } = Typography

interface QuizReviewProps {
  title: string
  questions: QuizItem[]
  score: number
  answers?: number[]
  isLegacy?: boolean
  onRetake?: () => void
}

export function QuizReview({ title, questions, score, answers, isLegacy = false, onRetake }: QuizReviewProps) {
  const { token } = antdTheme.useToken()
  const hasDetailedAnswers = !isLegacy && answers != null && answers.length === questions.length
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

      {isLegacy && (
        <Alert
          type="warning"
          showIcon
          title="Revisão detalhada indisponível para este teste"
          description="Este teste foi salvo apenas com a nota final. Refaça o teste para registrar suas respostas e ver exatamente quais questões você acertou ou errou."
          style={{ marginBottom: 16 }}
          action={
            onRetake ? (
              <Button size="small" type="primary" onClick={onRetake}>
                Refazer teste
              </Button>
            ) : undefined
          }
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
                border: `1px solid ${token.colorBorderSecondary}`,
                background: token.colorBgContainer,
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

                  if (hasDetailedAnswers) {
                    if (isSelected && isCorrect) {
                      borderColor = token.colorSuccess
                      background = token.colorSuccessBg
                    } else if (isSelected && isWrong) {
                      borderColor = token.colorError
                      background = token.colorErrorBg
                    } else if (isWrong && isCorrectOption) {
                      borderColor = token.colorSuccess
                      background = token.colorSuccessBg
                    }
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
                      <Text
                        style={{
                          color:
                            hasDetailedAnswers && (isSelected || (isWrong && isCorrectOption))
                              ? token.colorText
                              : token.colorTextSecondary,
                        }}
                      >
                        {option}
                      </Text>
                    </div>
                  )
                })}
              </Space>
            </div>
          )
        })}
      </Space>
    </div>
  )
}
