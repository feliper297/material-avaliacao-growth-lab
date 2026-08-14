import { useEffect, useState } from 'react'
import { Alert, Button, Form, Input, Select, Space } from 'antd'
import { EVIDENCE_TYPES } from '../../../shared/data/weeks'
import type { EvidenceInput } from '../../../shared/domain/evidence'
import type { Evidence } from '../../../shared/types/store'

interface EvidenceFormProps {
  defaultWeek?: number
  initialEvidence?: Evidence | null
  loading?: boolean
  onSubmit: (input: EvidenceInput) => Promise<void>
  onCancel: () => void
}

export function EvidenceForm({
  defaultWeek = 1,
  initialEvidence = null,
  loading,
  onSubmit,
  onCancel,
}: EvidenceFormProps) {
  const [form] = Form.useForm<EvidenceInput>()
  const [error, setError] = useState<string | null>(null)
  const isEditing = initialEvidence != null

  useEffect(() => {
    if (initialEvidence) {
      form.setFieldsValue({
        week: initialEvidence.week,
        type: initialEvidence.type,
        title: initialEvidence.title,
        url: initialEvidence.url ?? '',
        description: initialEvidence.description,
      })
      return
    }

    form.resetFields()
    form.setFieldsValue({ week: defaultWeek, type: EVIDENCE_TYPES[0] })
  }, [initialEvidence, defaultWeek, form])

  async function handleFinish(values: EvidenceInput) {
    setError(null)
    try {
      await onSubmit(values)
      if (!isEditing) {
        form.resetFields()
        form.setFieldsValue({ week: defaultWeek, type: EVIDENCE_TYPES[0] })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar.')
    }
  }

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ week: defaultWeek, type: EVIDENCE_TYPES[0] }}
      onFinish={handleFinish}
    >
      {error && <Alert type="error" showIcon title={error} style={{ marginBottom: 16 }} />}

      <Form.Item name="week" label="Semana" rules={[{ required: true }]}>
        <Select options={[1, 2, 3, 4].map((w) => ({ value: w, label: `Semana ${w}` }))} />
      </Form.Item>

      <Form.Item name="type" label="Tipo de evidência" rules={[{ required: true }]}>
        <Select options={EVIDENCE_TYPES.map((t) => ({ value: t, label: t }))} />
      </Form.Item>

      <Form.Item name="title" label="Título" rules={[{ required: true, message: 'Título é obrigatório.' }]}>
        <Input placeholder="Ex.: Refatoração do fluxo de estorno" />
      </Form.Item>

      <Form.Item
        name="url"
        label="Link"
        rules={[
          {
            validator: (_, value) => {
              if (!value || !String(value).trim()) return Promise.resolve()
              try {
                const parsed = new URL(String(value).trim())
                if (!['http:', 'https:'].includes(parsed.protocol)) {
                  return Promise.reject(new Error('URL deve usar http ou https.'))
                }
                return Promise.resolve()
              } catch {
                return Promise.reject(new Error('URL inválida.'))
              }
            },
          },
        ]}
      >
        <Input placeholder="https://..." />
      </Form.Item>

      <Form.Item
        name="description"
        label="O que foi aplicado e o que mudou?"
        rules={[{ required: true, message: 'Descrição é obrigatória.' }]}
      >
        <Input.TextArea
          rows={4}
          placeholder="Descreva o problema, o conceito aplicado, a mudança realizada e o resultado observado."
        />
      </Form.Item>

      <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
        <Space>
          <Button onClick={onCancel}>Cancelar</Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            {isEditing ? 'Salvar alterações' : 'Salvar evidência'}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  )
}
