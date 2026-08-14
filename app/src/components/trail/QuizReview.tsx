import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons'
import { Alert, Space, Tag, Typography, theme as antdTheme } from 'antd'
import type { QuizItem } from '../../../shared/data/weeks'

const { Text, Paragraph } = Typography

interface QuizReviewProps {
  title: string
  questions: QuizItem[]
  answers: number[]
}

export function QuizReview({ title, questions, answers }: QuizReviewProps) {
  const { token } = antdTheme.useToken()
  const score = questions.reduce((sum, item, index) => sum + (answers[index] === item.answer ? 1 : 0), 0)

  return (
    <div>
      <Alert
        type={score >= 2 ? 'success' : 'warning'}
        showIcon
        title={`${score} acerto${score === 1 ? '' : 's'} · ${questions.length - score} erro${questions.length - score === 1 ? '' : 's'} em "${title}"`}
        style={{ marginBottom: 16 }}
      />

      <Space orientation="vertical" size={16} style={{ width: '100%' }}>
        {questions.map((item, index) => {
          const selected = answers[index]
          const isCorrect = selected === item.answer

          return (
            <div
              key={index}
              style={{
                padding: '12px 14px',
                borderRadius: token.borderRadiusLG,
                border: `1px solid ${isCorrect ? token.colorSuccessBorder : token.colorErrorBorder}`,
                background: isCorrect ? token.colorSuccessBg : token.colorErrorBg,
              }}
            >
              <Space align="start" size={8} style={{ marginBottom: 10 }}>
                {isCorrect ? (
                  <CheckCircleFilled style={{ color: token.colorSuccess, marginTop: 3 }} />
                ) : (
                  <CloseCircleFilled style={{ color: token.colorError, marginTop: 3 }} />
                )}
                <div style={{ flex: 1 }}>
                  <Text strong>
                    {index + 1}. {item.q}
                  </Text>
                  <div style={{ marginTop: 6 }}>
                    <Tag color={isCorrect ? 'success' : 'error'}>{isCorrect ? 'Acertou' : 'Errou'}</Tag>
                  </div>
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
                  } else if (isSelected) {
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

              {!isCorrect && (
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
