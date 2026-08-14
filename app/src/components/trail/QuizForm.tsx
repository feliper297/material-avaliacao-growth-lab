import { useState } from 'react'
import { Alert, Button, Form, Radio, Space } from 'antd'
import type { QuizItem } from '../../../shared/data/weeks'

interface QuizFormProps {
  title: string
  questions: QuizItem[]
  onSubmit: (score: number) => Promise<void>
}

export function QuizForm({ title, questions, onSubmit }: QuizFormProps) {
  const [result, setResult] = useState<{ type: 'success' | 'warning'; message: string } | null>(null)
  const [submitted, setSubmitted] = useState(false)

  async function handleFinish(values: Record<string, number>) {
    let score = 0
    questions.forEach((item, qi) => {
      if (values[`q${qi}`] === item.answer) score++
    })
    await onSubmit(score)
    const errors = questions.length - score
    setSubmitted(true)
    setResult({
      type: score >= 2 ? 'success' : 'warning',
      message:
        score === questions.length
          ? `${score} acertos · 0 erros em "${title}". Resultado salvo — este teste não pode ser refeito.`
          : `${score} acerto${score === 1 ? '' : 's'} · ${errors} erro${errors === 1 ? '' : 's'} em "${title}". Resultado salvo — este teste não pode ser refeito.`,
    })
  }

  return (
    <Form layout="vertical" onFinish={handleFinish}>
      {questions.map((item, qi) => (
        <Form.Item
          key={qi}
          name={`q${qi}`}
          label={`${qi + 1}. ${item.q}`}
          rules={[{ required: true, message: 'Responda todas as perguntas antes de corrigir.' }]}
        >
          <Radio.Group disabled={submitted}>
            <Space orientation="vertical">
              {item.options.map((option, oi) => (
                <Radio key={oi} value={oi}>
                  {option}
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        </Form.Item>
      ))}

      {result && <Alert type={result.type} showIcon title={result.message} style={{ marginBottom: 16 }} />}

      {!submitted && (
        <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">
            Corrigir teste
          </Button>
        </Form.Item>
      )}
    </Form>
  )
}
