import { useEffect, useRef, useState } from 'react'
import { Alert, Button, Form, Input, Select, Space } from 'antd'
import { EVIDENCE_TYPES } from '../../../shared/data/weeks'
import type { EvidenceInput } from '../../../shared/domain/evidence'
import type { Evidence, EvidenceAttachment } from '../../../shared/types/store'
import { removeEvidenceFile } from '../../services/evidenceAttachmentApi'
import { EvidenceAttachmentsField } from './EvidenceAttachmentsField'

interface EvidenceFormProps {
  userId: string
  defaultWeek?: number
  defaultResourceId?: string
  defaultTitle?: string
  lockWeek?: boolean
  initialEvidence?: Evidence | null
  loading?: boolean
  onSubmit: (input: EvidenceInput) => Promise<void>
  onCancel: () => void
}

export function EvidenceForm({
  userId,
  defaultWeek = 1,
  defaultResourceId,
  defaultTitle,
  lockWeek = false,
  initialEvidence = null,
  loading,
  onSubmit,
  onCancel,
}: EvidenceFormProps) {
  const [form] = Form.useForm<EvidenceInput>()
  const [error, setError] = useState<string | null>(null)
  const [attachments, setAttachments] = useState<EvidenceAttachment[]>([])
  const [selectedWeek, setSelectedWeek] = useState(defaultWeek)
  const initialAttachmentIdsRef = useRef<Set<string>>(new Set())
  const isEditing = initialEvidence != null

  useEffect(() => {
    if (initialEvidence) {
      form.setFieldsValue({
        week: initialEvidence.week,
        resourceId: initialEvidence.resourceId,
        type: initialEvidence.type,
        title: initialEvidence.title,
        url: initialEvidence.url ?? '',
        description: initialEvidence.description,
      })
      setAttachments(initialEvidence.attachments)
      setSelectedWeek(initialEvidence.week)
      initialAttachmentIdsRef.current = new Set(initialEvidence.attachments.map((item) => item.id))
      return
    }

    form.resetFields()
    form.setFieldsValue({
      week: defaultWeek,
      resourceId: defaultResourceId,
      type: EVIDENCE_TYPES[0],
      title: defaultTitle ?? '',
    })
    setAttachments([])
    setSelectedWeek(defaultWeek)
    initialAttachmentIdsRef.current = new Set()
  }, [initialEvidence, defaultWeek, defaultResourceId, defaultTitle, form])

  async function cleanupPendingAttachments(current: EvidenceAttachment[]) {
    const initialIds = initialAttachmentIdsRef.current
    const pending = current.filter((item) => !initialIds.has(item.id))
    await Promise.all(pending.map((item) => removeEvidenceFile(item.url)))
  }

  async function handleCancel() {
    try {
      await cleanupPendingAttachments(attachments)
    } catch {
      // Ignora falha de limpeza ao cancelar — usuário pode tentar de novo.
    }
    onCancel()
  }

  async function handleFinish(values: EvidenceInput) {
    setError(null)
    try {
      await onSubmit({
        ...values,
        url: values.url?.trim() || undefined,
        attachments,
      })
      initialAttachmentIdsRef.current = new Set(attachments.map((item) => item.id))
      if (!isEditing) {
        form.resetFields()
        form.setFieldsValue({
          week: defaultWeek,
          resourceId: defaultResourceId,
          type: EVIDENCE_TYPES[0],
          title: defaultTitle ?? '',
        })
        setAttachments([])
        setSelectedWeek(defaultWeek)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar.')
    }
  }

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ week: defaultWeek, type: EVIDENCE_TYPES[0], resourceId: defaultResourceId, title: defaultTitle ?? '' }}
      onFinish={handleFinish}
      onValuesChange={(changed) => {
        if (changed.week != null) setSelectedWeek(changed.week)
      }}
    >
      {error && <Alert type="error" showIcon title={error} style={{ marginBottom: 16 }} />}

      <Form.Item name="week" label="Semana" rules={[{ required: true }]}>
        <Select
          disabled={lockWeek}
          options={[1, 2, 3, 4].map((w) => ({ value: w, label: `Semana ${w}` }))}
        />
      </Form.Item>

      <Form.Item name="resourceId" hidden>
        <Input />
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

      <EvidenceAttachmentsField
        userId={userId}
        week={selectedWeek}
        value={attachments}
        busy={loading}
        onChange={setAttachments}
      />

      <Form.Item
        name="description"
        label="O que foi aplicado e o que mudou?"
        rules={[{ required: true, message: 'Descrição é obrigatória.' }]}
        style={{ marginTop: 16 }}
      >
        <Input.TextArea
          rows={4}
          placeholder="Descreva o problema, o conceito aplicado, a mudança realizada e o resultado observado."
        />
      </Form.Item>

      <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
        <Space>
          <Button onClick={handleCancel}>Cancelar</Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            {isEditing ? 'Salvar alterações' : 'Salvar evidência'}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  )
}
