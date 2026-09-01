import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { App, Button, Form, Input, Modal, Radio, Space } from 'antd'
import { useEffect } from 'react'
import type { QuizItem } from '../../../shared/data/weeks'

interface QuizEditorFormValues {
  questions: Array<{
    q: string
    options: string[]
    answer: number
  }>
}

interface QuizEditorModalProps {
  open: boolean
  resourceTitle: string
  initialQuestions: QuizItem[]
  saving?: boolean
  onCancel: () => void
  onSave: (questions: QuizItem[]) => void
  onRemove: () => void
}

export function QuizEditorModal({
  open,
  resourceTitle,
  initialQuestions,
  saving,
  onCancel,
  onSave,
  onRemove,
}: QuizEditorModalProps) {
  const { modal } = App.useApp()
  const [form] = Form.useForm<QuizEditorFormValues>()

  useEffect(() => {
    if (!open) return
    form.setFieldsValue({
      questions:
        initialQuestions.length > 0
          ? initialQuestions.map((question) => ({
              q: question.q,
              options: [...question.options],
              answer: question.answer,
            }))
          : [{ q: '', options: ['', ''], answer: 0 }],
    })
  }, [form, initialQuestions, open])

  function handleRemoveQuiz() {
    modal.confirm({
      title: 'Remover teste?',
      content: `O teste de "${resourceTitle}" será excluído. Participantes não poderão mais respondê-lo.`,
      okText: 'Remover',
      okButtonProps: { danger: true },
      cancelText: 'Cancelar',
      onOk: onRemove,
    })
  }

  return (
    <Modal
      open={open}
      title={`Teste — ${resourceTitle}`}
      onCancel={onCancel}
      width={720}
      destroyOnHidden
      footer={
        <Space wrap style={{ width: '100%', justifyContent: 'space-between' }}>
          <Button danger onClick={handleRemoveQuiz} disabled={initialQuestions.length === 0}>
            Remover teste
          </Button>
          <Space wrap>
            <Button onClick={onCancel}>Cancelar</Button>
            <Button
              type="primary"
              loading={saving}
              onClick={async () => {
                const values = await form.validateFields()
                onSave(
                  values.questions.map((question) => ({
                    q: question.q.trim(),
                    options: question.options.map((option) => option.trim()),
                    answer: question.answer,
                  })),
                )
              }}
            >
              Salvar teste
            </Button>
          </Space>
        </Space>
      }
    >
      <Form form={form} layout="vertical">
        <Form.List name="questions">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, questionIndex) => (
                <div
                  key={field.key}
                  style={{
                    marginBottom: 24,
                    paddingBottom: 16,
                    borderBottom: '1px solid var(--ant-color-border-secondary)',
                  }}
                >
                  <Space align="start" style={{ width: '100%', justifyContent: 'space-between' }}>
                    <Form.Item
                      {...field}
                      name={[field.name, 'q']}
                      label={`Pergunta ${questionIndex + 1}`}
                      rules={[{ required: true, message: 'Enunciado obrigatório.' }]}
                      style={{ flex: 1, marginBottom: 12 }}
                    >
                      <Input.TextArea rows={2} placeholder="Enunciado da pergunta" />
                    </Form.Item>
                    {fields.length > 1 && (
                      <Button
                        type="text"
                        danger
                        icon={<MinusCircleOutlined />}
                        aria-label={`Remover pergunta ${questionIndex + 1}`}
                        onClick={() => remove(field.name)}
                      />
                    )}
                  </Space>

                  <Form.List name={[field.name, 'options']}>
                    {(optionFields, optionActions) => (
                      <>
                        <Form.Item label="Alternativas" required style={{ marginBottom: 8 }}>
                          {optionFields.map((optionField, optionIndex) => (
                            <Space key={optionField.key} align="baseline" style={{ display: 'flex', marginBottom: 8 }}>
                              <Form.Item
                                {...optionField}
                                name={optionField.name}
                                rules={[{ required: true, message: 'Alternativa obrigatória.' }]}
                                style={{ flex: 1, marginBottom: 0 }}
                              >
                                <Input placeholder={`Alternativa ${optionIndex + 1}`} />
                              </Form.Item>
                              {optionFields.length > 2 && (
                                <Button
                                  type="text"
                                  danger
                                  icon={<MinusCircleOutlined />}
                                  aria-label={`Remover alternativa ${optionIndex + 1}`}
                                  onClick={() => optionActions.remove(optionField.name)}
                                />
                              )}
                            </Space>
                          ))}
                          <Button
                            type="dashed"
                            onClick={() => optionActions.add('')}
                            icon={<PlusOutlined />}
                            block
                          >
                            Adicionar alternativa
                          </Button>
                        </Form.Item>

                        <Form.Item
                          name={[field.name, 'answer']}
                          label="Resposta correta"
                          rules={[{ required: true, message: 'Selecione a alternativa correta.' }]}
                        >
                          <Radio.Group>
                            <Space direction="vertical">
                              {optionFields.map((_, optionIndex) => (
                                <Radio key={optionIndex} value={optionIndex}>
                                  Alternativa {optionIndex + 1}
                                </Radio>
                              ))}
                            </Space>
                          </Radio.Group>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </div>
              ))}
              <Button type="dashed" onClick={() => add({ q: '', options: ['', ''], answer: 0 })} icon={<PlusOutlined />} block>
                Adicionar pergunta
              </Button>
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  )
}
