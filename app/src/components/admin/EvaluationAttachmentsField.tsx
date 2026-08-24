import { DeleteOutlined, PictureOutlined, UploadOutlined } from '@ant-design/icons'
import { App, Button, Image, Space, Typography, Upload, type UploadProps } from 'antd'
import type { EvaluationAttachment } from '../../../shared/types/evaluation'
import { removeEvaluationPrint, uploadEvaluationPrint } from '../../services/evaluationAttachmentApi'

const { Text } = Typography

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

  const uploadProps: UploadProps = {
    accept: 'image/jpeg,image/png,image/webp,image/gif',
    showUploadList: false,
    multiple: true,
    beforeUpload: async (file) => {
      try {
        const attachment = await uploadEvaluationPrint(file, learnerId, scope, week)
        onChange?.([...value, attachment])
        message.success('Print anexado.')
      } catch (err) {
        message.error(err instanceof Error ? err.message : 'Falha ao enviar print.')
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
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />} aria-label="Anexar print ao comentário">
              Anexar print
            </Button>
          </Upload>
          <Text type="secondary" style={{ fontSize: 11, display: 'block', marginTop: 6 }}>
            JPG, PNG, WEBP ou GIF · até 5 MB por imagem
          </Text>
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
