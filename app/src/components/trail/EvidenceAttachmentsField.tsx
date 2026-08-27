import { useEffect, useRef, useState } from 'react'
import { DeleteOutlined, InboxOutlined } from '@ant-design/icons'
import { App, Button, Image, Typography, Upload, type UploadProps } from 'antd'
import type { EvidenceAttachment } from '../../../shared/types/store'
import { removeEvidenceFile, uploadEvidenceFile } from '../../services/evidenceAttachmentApi'

const { Text } = Typography
const { Dragger } = Upload

interface EvidenceAttachmentsFieldProps {
  userId: string
  week: number
  value: EvidenceAttachment[]
  busy?: boolean
  onChange?: (attachments: EvidenceAttachment[]) => void
}

export function EvidenceAttachmentsField({
  userId,
  week,
  value,
  busy = false,
  onChange,
}: EvidenceAttachmentsFieldProps) {
  const { message, modal } = App.useApp()
  const [uploading, setUploading] = useState(false)
  const attachmentsRef = useRef(value)

  useEffect(() => {
    attachmentsRef.current = value
  }, [value])

  async function handleUpload(file: File) {
    const attachment = await uploadEvidenceFile(file, userId, week)
    const next = [...attachmentsRef.current, attachment]
    attachmentsRef.current = next
    onChange?.(next)
  }

  const uploadProps: UploadProps = {
    accept: 'image/*,.pdf',
    showUploadList: false,
    multiple: true,
    disabled: uploading || busy,
    beforeUpload: async (file) => {
      setUploading(true)
      try {
        await handleUpload(file)
        message.success('Arquivo anexado.')
      } catch (err) {
        message.error(err instanceof Error ? err.message : 'Falha ao enviar arquivo.')
      } finally {
        setUploading(false)
      }
      return false
    },
  }

  function confirmRemove(attachment: EvidenceAttachment) {
    modal.confirm({
      title: 'Remover este arquivo?',
      content: `"${attachment.name}" será excluído permanentemente.`,
      okText: 'Remover',
      okButtonProps: { danger: true },
      cancelText: 'Cancelar',
      onOk: () => handleRemove(attachment),
    })
  }

  async function handleRemove(attachment: EvidenceAttachment) {
    try {
      await removeEvidenceFile(attachment.url)
      const next = attachmentsRef.current.filter((item) => item.id !== attachment.id)
      attachmentsRef.current = next
      onChange?.(next)
      message.success('Arquivo removido.')
    } catch (err) {
      message.error(err instanceof Error ? err.message : 'Falha ao remover arquivo.')
      throw err
    }
  }

  return (
    <div className="evaluation-attachments">
      <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 8 }}>
        Arquivos (opcional)
      </Text>
      <Dragger {...uploadProps} className="evaluation-attachments__dropzone">
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Arraste arquivos aqui</p>
        <p className="ant-upload-hint">ou clique para selecionar — imagem ou PDF</p>
      </Dragger>

      {value.length > 0 && (
        <div className="evaluation-attachments__grid">
          {value.map((attachment) => {
            const isImage = /\.(jpe?g|png|webp|gif)(\?|$)/i.test(attachment.url)
              || attachment.name.match(/\.(jpe?g|png|webp|gif)$/i)

            return (
              <div key={attachment.id} className="evaluation-attachments__item">
                {isImage ? (
                  <Image
                    src={attachment.url}
                    alt={attachment.name}
                    className="evaluation-attachments__image"
                    preview={{ mask: 'Ampliar' }}
                  />
                ) : (
                  <div
                    className="evaluation-attachments__image"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'rgba(0,0,0,0.04)',
                      fontSize: 12,
                      padding: 8,
                      textAlign: 'center',
                    }}
                  >
                    PDF
                  </div>
                )}
                <div className="evaluation-attachments__meta">
                  <Text ellipsis className="evaluation-attachments__name">
                    {attachment.name}
                  </Text>
                  <Button
                    danger
                    block
                    size="small"
                    icon={<DeleteOutlined />}
                    className="evaluation-attachments__remove"
                    aria-label={`Excluir arquivo ${attachment.name}`}
                    disabled={busy || uploading}
                    onClick={() => confirmRemove(attachment)}
                  >
                    Excluir arquivo
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
