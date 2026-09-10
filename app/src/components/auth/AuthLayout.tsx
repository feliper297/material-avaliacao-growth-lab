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
    <div className="login-screen">
      <div className="login-screen__inner">
        <div className="login-screen__brand">
          <BrandLogo variant="login" />
          <Paragraph type="secondary" style={{ marginTop: 12, marginBottom: 0 }}>
            Trilha de evolução pessoal
          </Paragraph>
        </div>

        <Card bordered={false} className="login-screen__card">
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
