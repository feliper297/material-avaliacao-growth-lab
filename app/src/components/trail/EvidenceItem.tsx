import {
  CheckCircleFilled,
  CloseCircleFilled,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  FileOutlined,
  FileSearchOutlined,
  LinkOutlined,
} from '@ant-design/icons'
import { Button, Space, Tag, Typography, theme as antdTheme } from 'antd'
import type { QuizItem } from '../../../shared/data/weeks'
import type { Evidence } from '../../../shared/types/store'
import { linkifyText } from '../../utils/linkifyText'

const { Text, Paragraph } = Typography

interface EvidenceItemProps {
  evidence: Evidence
  accent: string
  readOnly?: boolean
  onEdit?: (evidence: Evidence) => void
  onDelete?: (evidence: Evidence) => void
}

export function EvidenceItem({ evidence, accent, readOnly = false, onEdit, onDelete }: EvidenceItemProps) {
  const { token } = antdTheme.useToken()

  return (
    <article
      className="evidence-item"
      style={{
        borderLeft: `3px solid ${accent}`,
        borderRadius: token.borderRadiusLG,
        background: `linear-gradient(135deg, ${accent}0d 0%, ${token.colorFillAlter} 48%)`,
        border: `1px solid ${token.colorBorderSecondary}`,
        borderLeftWidth: 3,
        borderLeftColor: accent,
        padding: '14px 16px',
        marginBottom: 10,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: token.borderRadius,
            background: `${accent}1a`,
            color: accent,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 'none',
          }}
        >
          <FileSearchOutlined />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <Space wrap size={[8, 4]} style={{ marginBottom: 6 }}>
            <Text strong style={{ fontSize: 14 }}>
              {evidence.title}
            </Text>
            <Tag color={accent} style={{ margin: 0 }}>
              {evidence.type}
            </Tag>
          </Space>
          <Paragraph
            style={{
              fontSize: 13,
              color: token.colorTextSecondary,
              margin: '0 0 10px',
              lineHeight: 1.6,
            }}
            ellipsis={{ rows: 3, expandable: true, symbol: 'ver mais' }}
          >
            {linkifyText(evidence.description, accent)}
          </Paragraph>
          <Text type="secondary" style={{ fontSize: 11, display: 'block', marginBottom: 8 }}>
            {new Date(evidence.createdAt).toLocaleString('pt-BR')}
          </Text>
          <Space size={8} wrap className="evidence-item__actions">
            {evidence.url && (
              <Button
                size="small"
                type="primary"
                icon={<LinkOutlined />}
                href={evidence.url}
                target="_blank"
                rel="noreferrer"
              >
                Abrir link
              </Button>
            )}
            {evidence.attachments.map((attachment) => (
              <Button
                key={attachment.id}
                size="small"
                variant="outlined"
                icon={<FileOutlined />}
                href={attachment.url}
                target="_blank"
                rel="noreferrer"
              >
                {attachment.name}
              </Button>
            ))}
            {!readOnly && onEdit && (
              <Button
                size="small"
                variant="outlined"
                icon={<EditOutlined />}
                onClick={() => onEdit(evidence)}
              >
                Editar
              </Button>
            )}
            {!readOnly && onDelete && (
              <Button
                size="small"
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={() => onDelete(evidence)}
              >
                Excluir
              </Button>
            )}
          </Space>
        </div>
      </div>
    </article>
  )
}

function QuizScoreTag({ score, total }: { score: number; total: number }) {
  const errors = total - score
  return (
    <Space size={6} wrap>
      <Tag color="success">{score} acerto{score === 1 ? '' : 's'}</Tag>
      <Tag color={errors > 0 ? 'error' : 'default'}>
        {errors} erro{errors === 1 ? '' : 's'}
      </Tag>
    </Space>
  )
}

interface QuizResultSummaryProps {
  title: string
  score: number
  total: number
  onReview?: () => void
}

export function QuizResultSummary({ title, score, total, onReview }: QuizResultSummaryProps) {
  const { token } = antdTheme.useToken()

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        padding: '10px 12px',
        marginBottom: 8,
        borderRadius: token.borderRadius,
        background: token.colorFillAlter,
        border: `1px solid ${token.colorBorderSecondary}`,
      }}
    >
      <div style={{ minWidth: 0, flex: 1 }}>
        <Text strong style={{ fontSize: 12, display: 'block', marginBottom: 6 }}>
          {title}
        </Text>
        <QuizScoreTag score={score} total={total} />
      </div>
      {onReview && (
        <Button
          type="default"
          size="small"
          aria-label={`Revisar teste ${title}`}
          icon={<EyeOutlined />}
          onClick={onReview}
          style={{ flexShrink: 0, whiteSpace: 'nowrap' }}
        >
          Revisar
        </Button>
      )}
    </div>
  )
}

export function InlineQuizResult({ score, total }: { score: number; total: number }) {
  const { token } = antdTheme.useToken()

  return (
    <div
      style={{
        marginTop: 10,
        padding: '8px 10px',
        borderRadius: token.borderRadius,
        background: token.colorFillAlter,
        border: `1px solid ${token.colorBorderSecondary}`,
        width: '100%',
      }}
    >
      <Space wrap size={[8, 4]}>
        <Tag color="processing" style={{ margin: 0 }}>
          Teste concluído
        </Tag>
        <QuizScoreTag score={score} total={total} />
      </Space>
    </div>
  )
}

interface QuizReviewProps {
  title: string
  score: number
  total: number
  questions: QuizItem[]
  answers?: number[]
}

export function QuizReview({ title, score, total, questions, answers }: QuizReviewProps) {
  const { token } = antdTheme.useToken()
  const hasDetailedAnswers = answers != null && answers.length === questions.length

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          marginBottom: 16,
        }}
      >
        <Text strong>{title}</Text>
        <QuizScoreTag score={score} total={total} />
      </div>

      {!hasDetailedAnswers && (
        <Paragraph type="secondary">
          Este teste foi respondido antes do registro detalhado de respostas — apenas a
          pontuação final está disponível para revisão.
        </Paragraph>
      )}

      {hasDetailedAnswers &&
        questions.map((question, qi) => {
          const selected = answers![qi]
          return (
            <div
              key={qi}
              style={{
                marginBottom: 20,
                paddingBottom: 16,
                borderBottom:
                  qi < questions.length - 1 ? `1px solid ${token.colorBorderSecondary}` : 'none',
              }}
            >
              <Text strong style={{ display: 'block', marginBottom: 10 }}>
                {qi + 1}. {question.q}
              </Text>
              <Space direction="vertical" style={{ width: '100%' }} size={6}>
                {question.options.map((option, oi) => {
                  const isSelected = oi === selected
                  const isCorrectOption = oi === question.answer
                  const isWrongSelection = isSelected && !isCorrectOption

                  let borderColor = token.colorBorderSecondary
                  let background = 'transparent'
                  if (isCorrectOption) {
                    borderColor = token.colorSuccessBorder
                    background = token.colorSuccessBg
                  } else if (isWrongSelection) {
                    borderColor = token.colorErrorBorder
                    background = token.colorErrorBg
                  }

                  return (
                    <div
                      key={oi}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '6px 10px',
                        borderRadius: token.borderRadius,
                        border: `1px solid ${borderColor}`,
                        background,
                      }}
                    >
                      {isCorrectOption ? (
                        <CheckCircleFilled style={{ color: token.colorSuccess, flexShrink: 0 }} />
                      ) : isWrongSelection ? (
                        <CloseCircleFilled style={{ color: token.colorError, flexShrink: 0 }} />
                      ) : (
                        <span style={{ width: 14, flexShrink: 0 }} />
                      )}
                      <Text style={{ flex: 1 }}>{option}</Text>
                      {isSelected && (
                        <Tag style={{ margin: 0, flexShrink: 0 }}>Sua resposta</Tag>
                      )}
                    </div>
                  )
                })}
              </Space>
            </div>
          )
        })}
    </div>
  )
}
