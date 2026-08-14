import { useState } from 'react'
import {
  DatabaseOutlined,
  EditOutlined,
  ReloadOutlined,
  StopOutlined,
  TeamOutlined,
  TrophyOutlined,
  UserOutlined,
} from '@ant-design/icons'
import {
  Alert,
  App,
  Button,
  Card,
  Col,
  Form,
  Input,
  Modal,
  Popconfirm,
  Progress,
  Row,
  Select,
  Space,
  Spin,
  Statistic,
  Switch,
  Table,
  Tag,
  Typography,
} from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { BackOfficeStats, BackOfficeUserRow, UpdateBackOfficeUserInput } from '../../../shared/types/backoffice'
import type { UserRole } from '../../../shared/types/evaluation'

const { Title, Text, Paragraph } = Typography

interface BackOfficePanelProps {
  stats: BackOfficeStats | null
  loading: boolean
  saving?: boolean
  error: string | null
  currentUserId?: string
  onReload: () => void
  onUpdateUser: (input: UpdateBackOfficeUserInput) => Promise<void>
  onSelectLearner?: (userId: string) => void
}

const roleLabels = {
  admin: 'Administrador',
  learner: 'Participante',
} as const

interface EditUserFormValues {
  email: string
  role: UserRole
  active: boolean
}

export function BackOfficePanel({
  stats,
  loading,
  saving = false,
  error,
  currentUserId,
  onReload,
  onUpdateUser,
  onSelectLearner,
}: BackOfficePanelProps) {
  const { message } = App.useApp()
  const [form] = Form.useForm<EditUserFormValues>()
  const [editingUser, setEditingUser] = useState<BackOfficeUserRow | null>(null)

  function openEditModal(user: BackOfficeUserRow) {
    setEditingUser(user)
    form.setFieldsValue({
      email: user.email,
      role: user.role,
      active: user.active,
    })
  }

  function closeEditModal() {
    setEditingUser(null)
    form.resetFields()
  }

  async function handleToggleActive(user: BackOfficeUserRow) {
    if (currentUserId === user.userId) {
      message.warning('Você não pode inativar sua própria conta.')
      return
    }

    try {
      await onUpdateUser({
        userId: user.userId,
        email: user.email,
        role: user.role,
        active: !user.active,
      })
      message.success(user.active ? 'Usuário inativado.' : 'Usuário ativado.')
    } catch (err) {
      message.error(err instanceof Error ? err.message : 'Não foi possível alterar o status.')
    }
  }

  async function handleSaveEdit() {
    if (!editingUser) return

    try {
      const values = await form.validateFields()
      if (currentUserId === editingUser.userId && !values.active) {
        message.warning('Você não pode inativar sua própria conta.')
        return
      }

      await onUpdateUser({
        userId: editingUser.userId,
        email: values.email,
        role: values.role,
        active: values.active,
      })
      message.success('Usuário atualizado.')
      closeEditModal()
    } catch (err) {
      if (err instanceof Error && err.message) {
        message.error(err.message)
      }
    }
  }

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
            <Tag>{row.weekEvaluations}/4 sem.</Tag>
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
    {
      title: 'Ações',
      key: 'actions',
      width: 130,
      fixed: 'right',
      render: (_, row) => {
        const isSelf = currentUserId === row.userId

        return (
          <Space orientation="vertical" size={0} className="backoffice-user-actions">
            <Button type="link" size="small" icon={<EditOutlined />} onClick={() => openEditModal(row)}>
              Editar
            </Button>
            <Popconfirm
              title={row.active ? 'Inativar este usuário?' : 'Ativar este usuário?'}
              description={
                row.active
                  ? 'O usuário não poderá acessar a plataforma enquanto estiver inativo.'
                  : 'O usuário voltará a acessar a plataforma normalmente.'
              }
              okText={row.active ? 'Inativar' : 'Ativar'}
              cancelText="Cancelar"
              disabled={isSelf}
              onConfirm={() => handleToggleActive(row)}
            >
              <Button
                type="link"
                size="small"
                danger={row.active}
                icon={<StopOutlined />}
                disabled={isSelf}
                loading={saving}
              >
                {row.active ? 'Inativar' : 'Ativar'}
              </Button>
            </Popconfirm>
            {row.role === 'learner' && onSelectLearner ? (
              <Button type="link" size="small" onClick={() => onSelectLearner(row.userId)}>
                Ver trilha
              </Button>
            ) : null}
          </Space>
        )
      },
    },
  ]

  return (
    <div className="backoffice-panel">
      <Row justify="space-between" align="middle" wrap gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col>
          <Title level={3} style={{ marginBottom: 4 }}>
            Back Office
          </Title>
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
              scroll={{ x: 1300 }}
              size="middle"
              className="backoffice-users-table"
            />
          </Card>
        </>
      ) : null}

      <Modal
        title="Editar usuário"
        open={!!editingUser}
        onCancel={closeEditModal}
        onOk={handleSaveEdit}
        okText="Salvar"
        cancelText="Cancelar"
        confirmLoading={saving}
        destroyOnHidden
      >
        <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              { required: true, message: 'Informe o e-mail.' },
              { type: 'email', message: 'E-mail inválido.' },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="usuario@email.com" />
          </Form.Item>

          <Form.Item
            name="role"
            label="Perfil"
            rules={[{ required: true, message: 'Selecione o perfil.' }]}
          >
            <Select
              options={[
                { value: 'learner', label: roleLabels.learner },
                { value: 'admin', label: roleLabels.admin },
              ]}
            />
          </Form.Item>

          <Form.Item name="active" label="Status da conta" valuePropName="checked">
            <Switch checkedChildren="Ativo" unCheckedChildren="Inativo" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
