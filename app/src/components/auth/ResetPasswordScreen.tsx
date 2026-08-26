import { useState } from 'react'
import { Alert, App, Button, Form, Input } from 'antd'
import { LockOutlined } from '@ant-design/icons'
import { AuthLayout } from './AuthLayout'
import { clearAuthCallbackHash, mapAuthError, updatePassword } from '../../services/authApi'

interface ResetPasswordFormValues {
  password: string
  confirmPassword: string
}

interface ResetPasswordScreenProps {
  onComplete: () => void
}

export function ResetPasswordScreen({ onComplete }: ResetPasswordScreenProps) {
  const { message } = App.useApp()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form] = Form.useForm<ResetPasswordFormValues>()

  async function handleSubmit(values: ResetPasswordFormValues) {
    setLoading(true)
    setError(null)
    try {
      await updatePassword(values.password)
      clearAuthCallbackHash()
      message.success('Senha redefinida com sucesso.')
      onComplete()
    } catch (err) {
      setError(mapAuthError(err instanceof Error ? err.message : 'Falha ao redefinir senha.'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout title="Nova senha">
      <Alert
        type="info"
        showIcon
        title="Defina uma nova senha"
        description="Escolha uma senha com pelo menos 6 caracteres para concluir a recuperação."
        style={{ marginBottom: 24 }}
      />

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
          name="password"
          label="Nova senha"
          rules={[
            { required: true, message: 'Informe a nova senha.' },
            { min: 6, message: 'Mínimo de 6 caracteres.' },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined aria-hidden />}
            placeholder="••••••"
            size="large"
            autoComplete="new-password"
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Confirmar senha"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Confirme a nova senha.' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) return Promise.resolve()
                return Promise.reject(new Error('As senhas não coincidem.'))
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined aria-hidden />}
            placeholder="••••••"
            size="large"
            autoComplete="new-password"
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0, marginTop: 8 }}>
          <Button type="primary" htmlType="submit" loading={loading} block size="large">
            Salvar nova senha
          </Button>
        </Form.Item>
      </Form>
    </AuthLayout>
  )
}
