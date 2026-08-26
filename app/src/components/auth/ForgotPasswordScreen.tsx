import { useState } from 'react'
import { Alert, Button, Form, Input, Typography } from 'antd'
import { ArrowLeftOutlined, MailOutlined } from '@ant-design/icons'
import { AuthLayout } from './AuthLayout'
import { mapAuthError, requestPasswordReset } from '../../services/authApi'

const { Paragraph, Text } = Typography

interface ForgotPasswordFormValues {
  email: string
}

interface ForgotPasswordScreenProps {
  onBack: () => void
}

export function ForgotPasswordScreen({ onBack }: ForgotPasswordScreenProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sentEmail, setSentEmail] = useState<string | null>(null)
  const [form] = Form.useForm<ForgotPasswordFormValues>()

  async function handleSubmit(values: ForgotPasswordFormValues) {
    setLoading(true)
    setError(null)
    try {
      await requestPasswordReset(values.email)
      setSentEmail(values.email.trim())
    } catch (err) {
      setError(mapAuthError(err instanceof Error ? err.message : 'Falha ao enviar e-mail.'))
    } finally {
      setLoading(false)
    }
  }

  if (sentEmail) {
    return (
      <AuthLayout title="E-mail enviado">
        <Alert
          type="success"
          showIcon
          title="Verifique sua caixa de entrada"
          description={
            <>
              Se existir uma conta para <Text strong>{sentEmail}</Text>, você receberá um link para
              redefinir sua senha. O link expira em alguns minutos.
            </>
          }
          style={{ marginBottom: 16 }}
        />
        <Paragraph type="secondary" style={{ marginBottom: 24 }}>
          Não recebeu? Confira a pasta de spam ou solicite novamente em alguns minutos.
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
