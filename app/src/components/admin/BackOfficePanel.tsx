import {
  DatabaseOutlined,
  ReloadOutlined,
  TeamOutlined,
  TrophyOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Alert, Button, Card, Col, Progress, Row, Space, Spin, Statistic, Table, Tabs, Tag, Typography } from 'antd'
import { useState } from 'react'
import type { ColumnsType } from 'antd/es/table'
import type { BackOfficeStats, BackOfficeUserRow } from '../../../shared/types/backoffice'
import { TrailEditorPanel } from './TrailEditorPanel'

const { Title, Text, Paragraph } = Typography

interface BackOfficePanelProps {
  stats: BackOfficeStats | null
  loading: boolean
  error: string | null
  weekCount: number
  onReload: () => void
}

const roleLabels = {
  admin: 'Administrador',
  learner: 'Participante',
} as const

function BackOfficeOverview({
  stats,
  loading,
  error,
  weekCount,
  onReload,
}: BackOfficePanelProps) {
  const columns: ColumnsType<BackOfficeUserRow> = [
    {
      title: 'Usuário',
      dataIndex: 'email',
      key: 'email',
      minWidth: 280,
      ellipsis: false,
      render: (email: string) => (
        <Space className="backoffice-user-email" size={8}>
          <UserOutlined />
          <Text strong>{email}</Text>
        </Space>
      ),
    },
    {
      title: 'Perfil',
      dataIndex: 'role',
      key: 'role',
      width: 140,
      render: (role: BackOfficeUserRow['role']) => (
        <Tag color={role === 'admin' ? 'gold' : 'blue'}>{roleLabels[role]}</Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'active',
      key: 'active',
      width: 100,
      render: (active: boolean) => (
        <Tag color={active ? 'success' : 'default'}>{active ? 'Ativo' : 'Inativo'}</Tag>
      ),
    },
    {
      title: 'Progresso',
      dataIndex: 'progressPercent',
      key: 'progressPercent',
      width: 160,
      render: (value: number, row) =>
        row.role === 'learner' ? (
          <Progress percent={value} size="small" status={value >= 100 ? 'success' : 'active'} />
        ) : (
          <Text type="secondary">—</Text>
        ),
    },
    {
      title: 'Conteúdos',
      dataIndex: 'completedCount',
      key: 'completedCount',
      width: 110,
      align: 'center',
    },
    {
      title: 'Testes',
      dataIndex: 'quizCount',
      key: 'quizCount',
      width: 90,
      align: 'center',
    },
    {
      title: 'Evidências',
      dataIndex: 'evidenceCount',
      key: 'evidenceCount',
      width: 110,
      align: 'center',
    },
    {
      title: 'Avaliações',
      key: 'evaluations',
      width: 130,
      render: (_, row) =>
        row.role === 'learner' ? (
          <Space size={4} wrap>
            <Tag>
              {row.weekEvaluations}/{weekCount} sem.
            </Tag>
            {row.hasFinalEvaluation ? <Tag color="success">Final</Tag> : <Tag>Final pend.</Tag>}
          </Space>
        ) : (
          <Text type="secondary">—</Text>
        ),
    },
    {
      title: 'Última atividade',
      dataIndex: 'lastActivity',
      key: 'lastActivity',
      width: 170,
      render: (value: string | null) =>
        value ? new Date(value).toLocaleString('pt-BR') : <Text type="secondary">Sem registro</Text>,
    },
  ]

  return (
    <>
      <Row justify="space-between" align="middle" wrap gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col>
          <Paragraph type="secondary" style={{ marginBottom: 0 }}>
            Visão operacional do sistema — usuários, progresso e indicadores consolidados.
          </Paragraph>
        </Col>
        <Col>
          <Button icon={<ReloadOutlined />} onClick={onReload} loading={loading}>
            Atualizar
          </Button>
        </Col>
      </Row>

      {error && (
        <Alert
          type="error"
          showIcon
          title="Não foi possível carregar o back office"
          description={error}
          style={{ marginBottom: 16 }}
          action={
            <Button size="small" onClick={onReload}>
              Tentar novamente
            </Button>
          }
        />
      )}

      {loading && !stats ? (
        <Card>
          <div style={{ display: 'grid', placeItems: 'center', padding: 48 }}>
            <Spin size="large" />
          </div>
        </Card>
      ) : stats ? (
        <>
          <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
            {[
              {
                label: 'Usuários cadastrados',
                value: stats.totalUsers,
                icon: <TeamOutlined />,
                color: '#0958d9',
              },
              {
                label: 'Participantes',
                value: stats.learnerCount,
                icon: <UserOutlined />,
                color: '#237804',
              },
              {
                label: 'Evidências no sistema',
                value: stats.totalEvidences,
                icon: <DatabaseOutlined />,
                color: '#531dab',
              },
              {
                label: 'Avaliações registradas',
                value: stats.totalEvaluations,
                icon: <TrophyOutlined />,
                color: '#d48806',
              },
            ].map((item) => (
              <Col xs={12} md={6} key={item.label}>
                <Card size="small">
                  <Statistic
                    title={item.label}
                    value={item.value}
                    prefix={item.icon}
                    styles={{ content: { color: item.color, fontSize: 24 } }}
                  />
                </Card>
              </Col>
            ))}
          </Row>

          <Card title="Usuários do sistema" size="small">
            <Table
              rowKey="userId"
              columns={columns}
              dataSource={stats.users}
              pagination={{ pageSize: 8, showSizeChanger: false }}
              scroll={{ x: 1200 }}
              size="middle"
              className="backoffice-users-table"
            />
          </Card>
        </>
      ) : null}
    </>
  )
}

export function BackOfficePanel({ stats, loading, error, weekCount, onReload }: BackOfficePanelProps) {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="backoffice-panel">
      <Title level={3} style={{ marginBottom: 16 }}>
        Back Office
      </Title>

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        destroyInactiveTabPane={false}
        items={[
          {
            key: 'overview',
            label: 'Visão geral',
            children: (
              <BackOfficeOverview
                stats={stats}
                loading={loading}
                error={error}
                weekCount={weekCount}
                onReload={onReload}
              />
            ),
          },
          {
            key: 'editor',
            label: 'Editor da trilha',
            children: <TrailEditorPanel />,
          },
        ]}
      />
    </div>
  )
}
