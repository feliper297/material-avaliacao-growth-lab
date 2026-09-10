import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { App, Button, Form, Input, Modal, Radio, Typography } from 'antd'
import { useEffect } from 'react'
import type { QuizItem } from '../../../shared/data/weeks'
import { useBreakpointLayout } from '../../hooks/useBreakpointLayout'

const { Text } = Typography

function normalizeOptionLabel(value: unknown): string {
  if (typeof value === 'string') return value.trim()
  if (value == null) return ''
  return String(value).trim()
}

function normalizeQuestionsForForm(questions: QuizItem[]): QuizEditorFormValues['questions'] {
  return questions.map((question) => ({
    q: typeof question.q === 'string' ? question.q : String(question.q ?? ''),
    options: (question.options ?? []).map((option) => normalizeOptionLabel(option)),
    answer: typeof question.answer === 'number' ? question.answer : Number(question.answer) || 0,
  }))
}

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
  onSave: (questions: QuizItem[]) => void | Promise<void>
  onRemove: () => void | Promise<void>
}

function QuestionBlock({
  field,
  questionIndex,
  canRemoveQuestion,
  onRemoveQuestion,
}: {
  field: { name: number; key: number }
  questionIndex: number
  canRemoveQuestion: boolean
  onRemoveQuestion: () => void
}) {
  const form = Form.useFormInstance<QuizEditorFormValues>()
  const watchedOptions = Form.useWatch(['questions', field.name, 'options'], form)
  const options = Array.isArray(watchedOptions) ? watchedOptions : []

  return (
    <section className="quiz-editor-question" aria-labelledby={`quiz-question-${field.key}`}>
      <div className="quiz-editor-question__header">
        <Form.Item
          name={[field.name, 'q']}
          label={`Pergunta ${questionIndex + 1}`}
          rules={[{ required: true, message: 'Enunciado obrigatório.' }]}
          className="quiz-editor-question__enunciado"
        >
          <Input.TextArea
            id={`quiz-question-${field.key}`}
            rows={3}
            placeholder="Digite o enunciado da pergunta"
            showCount
            maxLength={500}
          />
        </Form.Item>
        {canRemoveQuestion && (
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            aria-label={`Remover pergunta ${questionIndex + 1}`}
            onClick={onRemoveQuestion}
            className="quiz-editor-question__remove"
          />
        )}
      </div>

      <Form.List name={[field.name, 'options']}>
        {(optionFields, optionActions) => (
          <>
            <Text className="quiz-editor-question__label">
              Alternativas <Text type="danger">*</Text>
            </Text>
            <div className="quiz-editor-options">
              {optionFields.map((optionField, optionIndex) => (
                <div key={optionField.key} className="quiz-editor-option-row">
                  <Form.Item
                    name={optionField.name}
                    rules={[{ required: true, message: 'Alternativa obrigatória.' }]}
                    className="quiz-editor-option-row__input"
                  >
                    <Input placeholder={`Alternativa ${optionIndex + 1}`} />
                  </Form.Item>
                  {optionFields.length > 2 && (
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      aria-label={`Remover alternativa ${optionIndex + 1}`}
                      onClick={() => optionActions.remove(optionField.name)}
                    />
                  )}
                </div>
              ))}
            </div>
            <Button
              type="dashed"
              onClick={() => optionActions.add('')}
              icon={<PlusOutlined />}
              block
              className="quiz-editor-add-option"
            >
              Adicionar alternativa
            </Button>

            <Form.Item
              name={[field.name, 'answer']}
              label="Resposta correta"
              rules={[{ required: true, message: 'Selecione a alternativa correta.' }]}
              className="quiz-editor-question__answer"
            >
              <Radio.Group className="quiz-editor-answer-group">
                {optionFields.map((_, optionIndex) => {
                  const label = normalizeOptionLabel(options[optionIndex])
                  return (
                    <Radio key={optionIndex} value={optionIndex} className="quiz-editor-answer-option">
                      {label ? `Alternativa ${optionIndex + 1} — ${label}` : `Alternativa ${optionIndex + 1}`}
                    </Radio>
                  )
                })}
              </Radio.Group>
            </Form.Item>
          </>
        )}
      </Form.List>
    </section>
  )
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
  const { isPhone } = useBreakpointLayout()
  const [form] = Form.useForm<QuizEditorFormValues>()
  const isEditing = initialQuestions.length > 0

  useEffect(() => {
    if (!open) return
    form.setFieldsValue({
      questions:
        initialQuestions.length > 0
          ? normalizeQuestionsForForm(initialQuestions)
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
      title={isEditing ? `Editar teste — ${resourceTitle}` : `Criar teste — ${resourceTitle}`}
      onCancel={onCancel}
      centered
      width={isPhone ? 'min(100vw - 32px, 720px)' : 720}
      destroyOnHidden
      className="quiz-editor-modal"
      styles={{
        body: {
          maxHeight: 'min(70dvh, 640px)',
          overflowY: 'auto',
          paddingTop: 8,
        },
      }}
      footer={
        <div className="quiz-editor-modal__footer">
          {isEditing ? (
            <Button danger onClick={handleRemoveQuiz} loading={saving}>
              Remover teste
            </Button>
          ) : (
            <span />
          )}
          <div className="quiz-editor-modal__footer-actions">
            <Button onClick={onCancel} disabled={saving}>
              Cancelar
            </Button>
            <Button
              type="primary"
              loading={saving}
              onClick={async () => {
                const values = await form.validateFields()
                await onSave(
                  values.questions.map((question) => ({
                    q: normalizeOptionLabel(question.q),
                    options: question.options.map((option) => normalizeOptionLabel(option)),
                    answer: question.answer,
                  })),
                )
              }}
            >
              Salvar teste
            </Button>
          </div>
        </div>
      }
    >
      <Form form={form} layout="vertical" className="quiz-editor-form">
        <Form.List name="questions">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, questionIndex) => (
                <QuestionBlock
                  key={field.key}
                  field={field}
                  questionIndex={questionIndex}
                  canRemoveQuestion={fields.length > 1}
                  onRemoveQuestion={() => remove(field.name)}
                />
              ))}
              <Button
                type="dashed"
                onClick={() => add({ q: '', options: ['', ''], answer: 0 })}
                icon={<PlusOutlined />}
                block
              >
                Adicionar pergunta
              </Button>
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  )
}
