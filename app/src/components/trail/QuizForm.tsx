import { useState } from 'react'
import { Alert, Button, Form, Radio, Space } from 'antd'
import type { QuizItem } from '../../../shared/data/weeks'

interface QuizFormProps {
  title: string
  questions: QuizItem[]
  onSubmit: (score: number) => Promise<void>
  onClose: () => void
}

export function QuizForm({ title, questions, onSubmit, onClose }: QuizFormProps) {
  const [result, setResult] = useState<{ type: 'success' | 'warning'; message: string } | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  async function handleFinish(values: Record<string, number>) {
    setSubmitError(null)
    let score = 0
    questions.forEach((item, qi) => {
      if (values[`q${qi}`] === item.answer) score++
    })

    setSubmitting(true)
    try {
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
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Não foi possível salvar o teste. Tente novamente.')
    } finally {
      setSubmitting(false)
    }
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

      {submitError && <Alert type="error" showIcon title={submitError} style={{ marginBottom: 16 }} />}
      {result && <Alert type={result.type} showIcon title={result.message} style={{ marginBottom: 16 }} />}

      <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
        {!submitted ? (
          <Button type="primary" htmlType="submit" loading={submitting}>
            Corrigir teste
          </Button>
        ) : (
          <Button type="primary" onClick={onClose}>
            Fechar
          </Button>
        )}
      </Form.Item>
    </Form>
  )
}
