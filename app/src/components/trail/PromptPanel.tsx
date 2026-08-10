import { useState } from 'react'
import { CopyOutlined, ExportOutlined } from '@ant-design/icons'
import { Button, Input, Space, Typography, theme as antdTheme } from 'antd'
import { buildPrompt } from '../../lib/promptTemplate'

const { Paragraph } = Typography
const { TextArea } = Input

interface PromptPanelProps {
  topic: string
  link: string
  week: string
}

export function PromptPanel({ topic, link, week }: PromptPanelProps) {
  const { token } = antdTheme.useToken()
  const [context, setContext] = useState('')
  const prompt = buildPrompt(topic, link, week, context.trim())

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(prompt)
    } catch {
      const area = document.createElement('textarea')
      area.value = prompt
      document.body.appendChild(area)
      area.select()
      document.execCommand('copy')
      area.remove()
    }
  }

  return (
    <Space orientation="vertical" style={{ width: '100%' }} size={12}>
      <div>
        <label htmlFor="prompt-context" style={{ fontSize: 12, fontWeight: 600, display: 'block' }}>
          Contexto da demanda real
        </label>
        <TextArea
          id="prompt-context"
          rows={3}
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="Ex.: Estou desenhando um dashboard financeiro..."
          style={{ marginTop: 4 }}
        />
      </div>
      <Paragraph
        style={{
          maxHeight: 320,
          overflow: 'auto',
          whiteSpace: 'pre-wrap',
          fontFamily: token.fontFamilyCode,
          fontSize: 12,
          background: token.colorFillTertiary,
          padding: 12,
          borderRadius: token.borderRadius,
          marginBottom: 0,
        }}
      >
        {prompt}
      </Paragraph>
      <Space wrap style={{ justifyContent: 'flex-end', width: '100%' }}>
        <Button icon={<CopyOutlined />} onClick={copyPrompt}>
          Copiar prompt
        </Button>
        <Button type="primary" icon={<ExportOutlined />} href="https://chatgpt.com/studymode" target="_blank" rel="noreferrer">
          Abrir Study Mode
        </Button>
      </Space>
    </Space>
  )
}
