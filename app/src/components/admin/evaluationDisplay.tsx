import { Radio, Space, theme as antdTheme } from 'antd'
import { linkifyText } from '../../utils/linkifyText'

const DEFAULT_MARKS = { 1: '1', 2: '2', 3: '3', 4: '4', 5: '5' }
const SCALE_VALUES = [1, 2, 3, 4, 5] as const

/** Espaço entre os números da escala e o campo de feedback. */
export const EVALUATION_FEEDBACK_GAP = 16

interface EvaluationScoreSliderProps {
  value: number
  accent: string
  readOnly?: boolean
  onChange?: (value: number) => void
  onChangeComplete?: (value: number) => void
  marks?: Record<number, string>
}

/** Nota 1–5 em radio buttons. */
export function EvaluationScoreSlider({
  value,
  accent,
  readOnly = false,
  onChange,
  onChangeComplete,
  marks = DEFAULT_MARKS,
}: EvaluationScoreSliderProps) {
  const { token } = antdTheme.useToken()

  return (
    <Radio.Group
      className="evaluation-score-radios"
      value={value}
      disabled={readOnly}
      onChange={(e) => {
        const next = Number(e.target.value)
        onChange?.(next)
        onChangeComplete?.(next)
      }}
      aria-label={readOnly ? `Nota ${value} de 5` : 'Selecione a nota de 1 a 5'}
    >
      <Space wrap size={8}>
        {SCALE_VALUES.map((mark) => {
          const selected = mark === value
          return (
            <Radio.Button
              key={mark}
              value={mark}
              style={
                selected
                  ? {
                      borderColor: accent,
                      color: accent,
                      background: `${accent}14`,
                      fontWeight: 600,
                    }
                  : {
                      color: token.colorTextSecondary,
                    }
              }
            >
              {marks[mark] ?? mark}
            </Radio.Button>
          )
        })}
      </Space>
    </Radio.Group>
  )
}

interface ColoredScoreDisplayProps {
  value: number
  accent: string
  marks?: Record<number, string>
}

/** Exibe nota com cor visível (modo leitura). */
export function ColoredScoreDisplay({ value, accent, marks = DEFAULT_MARKS }: ColoredScoreDisplayProps) {
  return <EvaluationScoreSlider value={value} accent={accent} marks={marks} readOnly />
}

interface FeedbackDisplayProps {
  text: string
  belowScale?: boolean
}

/** Bloco de feedback legível para o avaliado (somente leitura). */
export function FeedbackDisplay({ text, belowScale = false }: FeedbackDisplayProps) {
  const { token } = antdTheme.useToken()

  return (
    <div
      className={['feedback-display', belowScale ? 'evaluation-feedback-below-scale' : '']
        .filter(Boolean)
        .join(' ')}
      style={{
        padding: '12px 16px',
        background: token.colorFillAlter,
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadius,
        color: token.colorText,
        fontSize: token.fontSize,
        fontWeight: 500,
        lineHeight: 1.65,
        whiteSpace: 'pre-wrap',
      }}
    >
      {text.trim() ? linkifyText(text.trim()) : '—'}
    </div>
  )
}
