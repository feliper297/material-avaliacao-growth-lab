import { useState } from 'react'
import { Alert, Button, Form, Input, Select, Space } from 'antd'
import { EVIDENCE_TYPES } from '../../../shared/data/weeks'
import type { EvidenceInput } from '../../../shared/domain/evidence'

interface EvidenceFormProps {
  defaultWeek?: number
  loading?: boolean
  onSubmit: (input: EvidenceInput) => Promise<void>
  onCancel: () => void
}

export function EvidenceForm({ defaultWeek = 1, loading, onSubmit, onCancel }: EvidenceFormProps) {
  const [form] = Form.useForm<EvidenceInput>()
  const [error, setError] = useState<string | null>(null)

  async function handleFinish(values: EvidenceInput) {
    setError(null)
    try {
      await onSubmit(values)
      form.resetFields()
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

      <Form.Item name="url" label="Link" rules={[{ type: 'url', message: 'URL inválida.' }]}>
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
            Salvar evidência
          </Button>
        </Space>
      </Form.Item>
    </Form>
  )
}
