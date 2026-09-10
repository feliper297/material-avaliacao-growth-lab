import { useEffect, useState } from 'react'
import { Alert, Button, Form, Input, Typography } from 'antd'
import { ArrowLeftOutlined, MailOutlined } from '@ant-design/icons'
import { AuthLayout } from './AuthLayout'
import {
  mapAuthError,
  PASSWORD_RESET_RESEND_COOLDOWN_SEC,
  parseRateLimitSeconds,
  requestPasswordReset,
} from '../../services/authApi'

const { Paragraph, Text } = Typography

interface ForgotPasswordFormValues {
  email: string
}

interface ForgotPasswordScreenProps {
  onBack: () => void
}

function formatCountdown(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${String(seconds).padStart(2, '0')}`
}

export function ForgotPasswordScreen({ onBack }: ForgotPasswordScreenProps) {
  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sentEmail, setSentEmail] = useState<string | null>(null)
  const [resendAvailableAt, setResendAvailableAt] = useState<number | null>(null)
  const [secondsLeft, setSecondsLeft] = useState(0)
  const [form] = Form.useForm<ForgotPasswordFormValues>()

  useEffect(() => {
    if (!resendAvailableAt) {
      setSecondsLeft(0)
      return
    }

    function tick() {
      const remaining = Math.max(0, Math.ceil((resendAvailableAt! - Date.now()) / 1000))
      setSecondsLeft(remaining)
    }

    tick()
    const interval = window.setInterval(tick, 1000)
    return () => window.clearInterval(interval)
  }, [resendAvailableAt])

  function startResendCooldown(seconds = PASSWORD_RESET_RESEND_COOLDOWN_SEC) {
    setResendAvailableAt(Date.now() + seconds * 1000)
  }

  async function sendResetLink(email: string, isResend = false) {
    if (isResend) {
      setResending(true)
    } else {
      setLoading(true)
    }
    setError(null)

    try {
      await requestPasswordReset(email)
      setSentEmail(email.trim())
      startResendCooldown()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Falha ao enviar e-mail.'
      const rateLimitSeconds = parseRateLimitSeconds(message)
      if (rateLimitSeconds != null) {
        startResendCooldown(rateLimitSeconds)
      }
      setError(mapAuthError(message))
    } finally {
      setLoading(false)
      setResending(false)
    }
  }

  async function handleSubmit(values: ForgotPasswordFormValues) {
    await sendResetLink(values.email)
  }

  async function handleResend() {
    if (!sentEmail || secondsLeft > 0) return
    await sendResetLink(sentEmail, true)
  }

  if (sentEmail) {
    const canResend = secondsLeft <= 0

    return (
      <AuthLayout title="E-mail enviado">
        <Alert
          type="success"
          showIcon
          title="Link de redefinição enviado"
          description={
            <>
              Enviamos um e-mail para <Text strong>{sentEmail}</Text> com o link para criar uma nova
              senha.
            </>
          }
          style={{ marginBottom: 16 }}
        />

        <div
          style={{
            marginBottom: 20,
            padding: '12px 14px',
            borderRadius: 8,
            background: '#f5f9ff',
            border: '1px solid #d6e4ff',
          }}
        >
          <Text strong style={{ display: 'block', marginBottom: 8 }}>
            Próximos passos
          </Text>
          <ol style={{ margin: 0, paddingLeft: 20, color: 'rgba(0,0,0,0.65)' }}>
            <li>Abra a caixa de entrada desse e-mail.</li>
            <li>Clique no botão ou link de redefinição de senha.</li>
            <li>Crie uma nova senha na tela que abrir.</li>
          </ol>
          <Paragraph type="secondary" style={{ margin: '12px 0 0', fontSize: 13 }}>
            O link expira em <Text strong>1 hora</Text>. Se não encontrar o e-mail, confira também a
            pasta de spam ou lixo eletrônico.
          </Paragraph>
        </div>

        {error && (
          <Alert
            type="error"
            showIcon
            role="alert"
            aria-live="assertive"
            title={error}
            style={{ marginBottom: 16 }}
            closable
            onClose={() => setError(null)}
          />
        )}

        <Button
          type="default"
          block
          size="large"
          loading={resending}
          disabled={!canResend}
          onClick={handleResend}
          style={{ marginBottom: 12 }}
        >
          {canResend ? 'Reenviar link' : `Reenviar link em ${formatCountdown(secondsLeft)}`}
        </Button>

        <Paragraph type="secondary" style={{ marginBottom: 24, textAlign: 'center', fontSize: 13 }}>
          {canResend
            ? 'Você já pode solicitar um novo envio se o e-mail não chegou.'
            : `Por segurança, aguarde ${formatCountdown(secondsLeft)} para solicitar um novo link.`}
        </Paragraph>

        <Button type="primary" block size="large" onClick={onBack}>
          Voltar ao login
        </Button>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout title="Esqueci minha senha">
      <Paragraph type="secondary" style={{ marginTop: -8, marginBottom: 24, textAlign: 'center' }}>
        Informe o e-mail da sua conta. Enviaremos um link para redefinir a senha.
      </Paragraph>

      {error && (
        <Alert
          type="error"
          showIcon
          role="alert"
          aria-live="assertive"
          title={error}
          style={{ marginBottom: 16 }}
          closable
          onClose={() => setError(null)}
        />
      )}

      <Form
        form={form}
        className="login-form"
        layout="vertical"
        onFinish={handleSubmit}
        onValuesChange={() => error && setError(null)}
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            { required: true, message: 'Informe seu e-mail.' },
            { type: 'email', message: 'E-mail inválido.' },
          ]}
        >
          <Input
            prefix={<MailOutlined aria-hidden />}
            placeholder="seu@email.com"
            size="large"
            autoComplete="email"
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: 12, marginTop: 8 }}>
          <Button type="primary" htmlType="submit" loading={loading} block size="large">
            Enviar link de redefinição
          </Button>
        </Form.Item>

        <Button type="link" block icon={<ArrowLeftOutlined />} onClick={onBack} style={{ padding: 0 }}>
          Voltar ao login
        </Button>
      </Form>
    </AuthLayout>
  )
}
