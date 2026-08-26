import { Card, Typography } from 'antd'
import type { ReactNode } from 'react'
import { BrandLogo } from '../BrandLogo'

const { Paragraph } = Typography

interface AuthLayoutProps {
  title: string
  children: ReactNode
}

export function AuthLayout({ title, children }: AuthLayoutProps) {
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
          <BrandLogo variant="login" />
          <Paragraph type="secondary" style={{ marginTop: 12, marginBottom: 0 }}>
            Trilha de evolução pessoal
          </Paragraph>
        </div>

        <Card bordered={false} style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
          <Typography.Title
            level={2}
            style={{ textAlign: 'center', marginTop: 0, marginBottom: 24, fontSize: 20 }}
          >
            {title}
          </Typography.Title>
          {children}
        </Card>
      </div>
    </div>
  )
}
