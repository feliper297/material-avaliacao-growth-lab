import { useEffect, useRef, useState } from 'react'
import { DeleteOutlined, InboxOutlined } from '@ant-design/icons'
import { Alert, App, Button, Image, Typography, Upload, type UploadProps } from 'antd'
import type { EvaluationAttachment } from '../../../shared/types/evaluation'
import { removeEvaluationPrint, uploadEvaluationPrint } from '../../services/evaluationAttachmentApi'

const { Text } = Typography
const { Dragger } = Upload

interface EvaluationAttachmentsFieldProps {
  learnerId: string
  scope: 'week' | 'final'
  week: number | null
  value: EvaluationAttachment[]
  readOnly?: boolean
  onChange?: (attachments: EvaluationAttachment[]) => void
}

export function EvaluationAttachmentsField({
  learnerId,
  scope,
  week,
  value,
  readOnly = false,
  onChange,
}: EvaluationAttachmentsFieldProps) {
  const { message } = App.useApp()
  const [uploading, setUploading] = useState(false)
  const attachmentsRef = useRef(value)

  useEffect(() => {
    attachmentsRef.current = value
  }, [value])

  async function handleUpload(file: File) {
    const attachment = await uploadEvaluationPrint(file, learnerId, scope, week)
    const next = [...attachmentsRef.current, attachment]
    attachmentsRef.current = next
    onChange?.(next)
  }

  const uploadProps: UploadProps = {
    accept: 'image/*',
    showUploadList: false,
    multiple: true,
    disabled: uploading,
    beforeUpload: async (file) => {
      setUploading(true)
      try {
        await handleUpload(file)
        message.success('Print anexado.')
      } catch (err) {
        message.error(err instanceof Error ? err.message : 'Falha ao enviar print.')
      } finally {
        setUploading(false)
      }
      return false
    },
  }

  async function handleRemove(attachment: EvaluationAttachment) {
    try {
      await removeEvaluationPrint(attachment.url)
      const next = attachmentsRef.current.filter((item) => item.id !== attachment.id)
      attachmentsRef.current = next
      onChange?.(next)
      message.success('Print removido.')
    } catch (err) {
      message.error(err instanceof Error ? err.message : 'Falha ao remover print.')
    }
  }

  if (readOnly && value.length === 0) {
    return null
  }

  return (
    <div className="evaluation-attachments">
      {!readOnly && (
        <>
          <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>
            Prints de referência (opcional)
          </Text>
          <Alert
            type="info"
            showIcon
            style={{ marginBottom: 12 }}
            title="Como anexar"
            description="Arraste o print para a área abaixo ou clique nela para selecionar uma imagem do computador. Você pode remover qualquer foto antes de salvar a avaliação."
          />
          <Dragger {...uploadProps} className="evaluation-attachments__dropzone">
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Arraste o print aqui</p>
            <p className="ant-upload-hint">ou clique para selecionar do computador</p>
          </Dragger>
        </>
      )}

      {readOnly && value.length > 0 && (
        <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>
          Prints anexados
        </Text>
      )}

      {value.length > 0 && (
        <div className="evaluation-attachments__grid">
          {value.map((attachment) => (
            <div key={attachment.id} className="evaluation-attachments__item">
              <Image
                src={attachment.url}
                alt={attachment.name}
                className="evaluation-attachments__image"
                preview={{ mask: 'Ampliar' }}
              />
              <div className="evaluation-attachments__meta">
                <Text ellipsis className="evaluation-attachments__name">
                  {attachment.name}
                </Text>
                {!readOnly && (
                  <Button
                    danger
                    block
                    size="small"
                    icon={<DeleteOutlined />}
                    className="evaluation-attachments__remove"
                    aria-label={`Excluir print ${attachment.name}`}
                    onClick={() => handleRemove(attachment)}
                  >
                    Excluir print
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
