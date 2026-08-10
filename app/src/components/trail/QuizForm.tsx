import { useState } from 'react'
import { Alert, Button, Form, Radio, Space } from 'antd'
import type { TrailWeek } from '../../../shared/data/weeks'

interface QuizFormProps {
  week: TrailWeek
  onSubmit: (score: number) => Promise<void>
}

export function QuizForm({ week, onSubmit }: QuizFormProps) {
  const [result, setResult] = useState<{ type: 'success' | 'warning'; message: string } | null>(null)

  async function handleFinish(values: Record<string, number>) {
    let score = 0
    week.quiz.forEach((item, qi) => {
      if (values[`q${qi}`] === item.answer) score++
    })
    await onSubmit(score)
    setResult({
      type: score >= 2 ? 'success' : 'warning',
      message:
        score === 3
          ? '3/3 — Bom domínio dos fundamentos. Agora comprove aplicando na sprint.'
          : `${score}/3 — Revise o conteúdo e converse com o tutor de IA sobre as respostas incorretas.`,
    })
  }

  return (
    <Form layout="vertical" onFinish={handleFinish}>
      {week.quiz.map((item, qi) => (
        <Form.Item
          key={qi}
          name={`q${qi}`}
          label={`${qi + 1}. ${item.q}`}
          rules={[{ required: true, message: 'Responda todas as perguntas antes de corrigir.' }]}
        >
          <Radio.Group>
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

      <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
        <Button type="primary" htmlType="submit">
          Corrigir teste
        </Button>
      </Form.Item>
    </Form>
  )
}
