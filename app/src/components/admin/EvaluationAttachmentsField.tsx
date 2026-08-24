import { useEffect, useRef, useState } from 'react'
import { DeleteOutlined, InboxOutlined, PictureOutlined } from '@ant-design/icons'
import { App, Button, Image, Space, Typography, Upload, type UploadProps } from 'antd'
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
      onChange?.(value.filter((item) => item.id !== attachment.id))
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
          <Dragger {...uploadProps} className="evaluation-attachments__dropzone">
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Arraste o print aqui ou clique para anexar</p>
            <p className="ant-upload-hint">Imagens em qualquer formato · sem limite de quantidade</p>
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
                <Space size={6} align="start">
                  <PictureOutlined />
                  <Text ellipsis style={{ fontSize: 12, maxWidth: 140 }}>
                    {attachment.name}
                  </Text>
                </Space>
                {!readOnly && (
                  <Button
                    type="text"
                    size="small"
                    danger
                    icon={<DeleteOutlined />}
                    aria-label={`Remover print ${attachment.name}`}
                    onClick={() => handleRemove(attachment)}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
