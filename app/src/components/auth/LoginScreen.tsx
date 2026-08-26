import { useState } from 'react'
import {
  Alert,
  Button,
  Card,
  Form,
  Input,
  Typography,
} from 'antd'
import { LockOutlined, MailOutlined, TrophyOutlined } from '@ant-design/icons'
import { supabase } from '../../lib/supabase'

const { Title, Paragraph } = Typography

interface LoginFormValues {
  email: string
  password: string
}

export function LoginScreen() {
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
      setLoginError(
        error.message === 'Invalid login credentials'
          ? 'E-mail ou senha incorretos.'
          : error.message,
      )
    }
  }

  return (
    <div
      className="login-screen"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f0f5ff 0%, #e6f4ff 100%)',
        padding: 24,
      }}
    >
      <div style={{ width: '100%', maxWidth: 420 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: '#0958d9',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16,
            }}
          >
            <TrophyOutlined style={{ fontSize: 28, color: '#fff' }} aria-hidden />
          </div>
          <Title level={1} style={{ margin: 0, fontSize: 28 }}>
            Growth Lab
          </Title>
          <Paragraph type="secondary" style={{ marginTop: 4, marginBottom: 0 }}>
            Trilha de evolução pessoal
          </Paragraph>
        </div>

        <Card bordered={false} style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
          <Title level={2} style={{ textAlign: 'center', marginTop: 0, marginBottom: 24, fontSize: 20 }}>
            Entrar
          </Title>

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

            <Form.Item style={{ marginBottom: 0, marginTop: 8 }}>
              <Button type="primary" htmlType="submit" loading={loading} block size="large">
                Entrar
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  )
}
