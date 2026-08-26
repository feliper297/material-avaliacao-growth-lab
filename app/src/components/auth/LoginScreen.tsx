import { useState } from 'react'
import { Alert, Button, Form, Input } from 'antd'
import { LockOutlined, MailOutlined } from '@ant-design/icons'
import { AuthLayout } from './AuthLayout'
import { mapAuthError } from '../../services/authApi'
import { supabase } from '../../lib/supabase'

interface LoginFormValues {
  email: string
  password: string
}

interface LoginScreenProps {
  onForgotPassword: () => void
}

export function LoginScreen({ onForgotPassword }: LoginScreenProps) {
  const [loading, setLoading] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)
  const [form] = Form.useForm<LoginFormValues>()

  async function handleLogin(values: LoginFormValues) {
    setLoading(true)
    setLoginError(null)
    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    })
    setLoading(false)
    if (error) {
      setLoginError(mapAuthError(error.message))
    }
  }

  return (
    <AuthLayout title="Entrar">
      {loginError && (
        <Alert
          type="error"
          showIcon
          role="alert"
          aria-live="assertive"
          title={loginError}
          style={{ marginBottom: 16 }}
          closable
          onClose={() => setLoginError(null)}
        />
      )}

      <Form
        form={form}
        className="login-form"
        layout="vertical"
        onFinish={handleLogin}
        onValuesChange={() => loginError && setLoginError(null)}
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
            placeholder="admin@gmail.com"
            size="large"
            autoComplete="email"
          />
        </Form.Item>

        <Form.Item
          name="password"
          label="Senha"
          rules={[{ required: true, message: 'Informe sua senha.' }]}
        >
          <Input.Password
            prefix={<LockOutlined aria-hidden />}
            placeholder="••••••"
            size="large"
            autoComplete="current-password"
          />
        </Form.Item>

        <div style={{ textAlign: 'right', marginBottom: 16, marginTop: -8 }}>
          <Button type="link" onClick={onForgotPassword} style={{ padding: 0, height: 'auto' }}>
            Esqueci minha senha
          </Button>
        </div>

        <Form.Item style={{ marginBottom: 0 }}>
          <Button type="primary" htmlType="submit" loading={loading} block size="large">
            Entrar
          </Button>
        </Form.Item>
      </Form>
    </AuthLayout>
  )
}
