import { Slider, theme as antdTheme } from 'antd'

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

/** Slider de nota 1–5 — um único ponto por posição (sem handle + dot sobrepostos). */
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
    <div
      className={`evaluation-score-slider ${readOnly ? 'evaluation-score-slider--readonly' : 'evaluation-score-slider--editable'}`}
      style={{ ['--eval-accent' as string]: accent }}
      aria-label={readOnly ? `Nota ${value} de 5` : undefined}
    >
      <Slider
        min={1}
        max={5}
        step={1}
        marks={marks}
        value={value}
        onChange={onChange}
        onChangeComplete={onChangeComplete}
        tooltip={{ open: false }}
        styles={{
          track: { background: accent },
          rail: { background: `${accent}26` },
        }}
        style={{
          marginTop: 4,
          marginBottom: 0,
          ...(readOnly ? { pointerEvents: 'none' } : {}),
        }}
      />
      <div className="evaluation-scale-labels" aria-hidden>
        {SCALE_VALUES.map((mark) => (
          <span
            key={mark}
            className={mark === value ? 'evaluation-scale-labels__active' : undefined}
            style={{
              color: mark <= value ? accent : token.colorTextSecondary,
              fontWeight: mark === value ? 600 : 400,
            }}
          >
            {mark}
          </span>
        ))}
      </div>
    </div>
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
      className={belowScale ? 'evaluation-feedback-below-scale' : undefined}
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
      {text.trim() || '—'}
    </div>
  )
}
