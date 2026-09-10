import { DownOutlined, PlusOutlined } from '@ant-design/icons'
import { App, Button, Card, Collapse, Form, Input, Modal, Space, Typography } from 'antd'
import { useEffect, useState } from 'react'
import type { QuizItem, TrailResource, TrailWeek } from '../../../shared/data/weeks'
import {
  createDefaultResource,
  createDefaultWeek,
  createWeekId,
  removeResourceFromCatalog,
  removeWeekFromCatalog,
  validateCatalog,
} from '../../../shared/domain/trail-catalog'
import type { TrailCatalog } from '../../../shared/types/trail-catalog'
import { useTrailCatalogContext } from '../../context/TrailCatalogContext'
import { ensureTrailCatalogSeeded } from '../../services/trailCatalogApi'
import { useBreakpointLayout } from '../../hooks/useBreakpointLayout'
import { QuizEditorModal } from './QuizEditorModal'

const { Text, Paragraph } = Typography

interface WeekFormValues {
  title: string
  objective: string
  resources?: Array<{ title: string; topic: string; url: string }>
}

interface ResourceFormValues {
  title: string
  topic: string
  url: string
}

export function TrailEditorPanel() {
  const { message, modal } = App.useApp()
  const { isPhone } = useBreakpointLayout()
  const { weeks, quizzes, saveCatalog, saving, reload, loading } = useTrailCatalogContext()
  const [draft, setDraft] = useState<TrailCatalog>(() => ({ weeks: [], quizzes: {} }))
  const [expandedWeekKey, setExpandedWeekKey] = useState<string | undefined>()

  const [weekModal, setWeekModal] = useState<{ mode: 'create' | 'edit'; week?: TrailWeek } | null>(null)
  const [resourceModal, setResourceModal] = useState<{
    mode: 'create' | 'edit'
    weekId: number
    resource?: TrailResource
  } | null>(null)
  const [quizModal, setQuizModal] = useState<{ resourceId: string; resourceTitle: string } | null>(null)

  const [weekForm] = Form.useForm<WeekFormValues>()
  const [resourceForm] = Form.useForm<ResourceFormValues>()

  useEffect(() => {
    void ensureTrailCatalogSeeded().then(() => reload())
  }, [reload])

  useEffect(() => {
    setDraft({ weeks, quizzes })
  }, [weeks, quizzes])

  useEffect(() => {
    const weekKeys = draft.weeks.map((week) => String(week.id))
    setExpandedWeekKey((prev) => (prev != null && weekKeys.includes(prev) ? prev : undefined))
  }, [draft.weeks])

  function confirmRemoveWeek(week: TrailWeek) {
    modal.confirm({
      title: `Remover semana ${week.id}?`,
      content: `"${week.title}" e todos os conteúdos/testes vinculados serão excluídos.`,
      okText: 'Remover',
      okButtonProps: { danger: true },
      cancelText: 'Cancelar',
      onOk: () => publishCatalog(removeWeekFromCatalog(draft, week.id), 'Semana removida.'),
    })
  }

  function confirmRemoveResource(resource: TrailResource) {
    modal.confirm({
      title: 'Remover conteúdo?',
      content:
        'Tem certeza que deseja remover o conteúdo? Evidências antigas dos participantes permanecem no sistema; o teste vinculado será removido.',
      okText: 'Remover',
      okButtonProps: { danger: true },
      cancelText: 'Cancelar',
      onOk: () => publishCatalog(removeResourceFromCatalog(draft, resource.id), 'Conteúdo removido.'),
    })
  }

  function openWeekModal(mode: 'create' | 'edit', week?: TrailWeek) {
    setWeekModal({ mode, week })
    if (mode === 'edit' && week) {
      weekForm.setFieldsValue({ title: week.title, objective: week.objective })
    } else {
      weekForm.resetFields()
    }
  }

  function openResourceModal(mode: 'create' | 'edit', weekId: number, resource?: TrailResource) {
    setResourceModal({ mode, weekId, resource })
    if (mode === 'edit' && resource) {
      resourceForm.setFieldsValue({
        title: resource.title,
        topic: resource.topic,
        url: resource.url,
      })
    } else {
      resourceForm.resetFields()
    }
  }

  async function saveWeekFromModal(values: WeekFormValues) {
    let next: TrailCatalog

    if (weekModal?.mode === 'edit' && weekModal.week) {
      next = {
        ...draft,
        weeks: draft.weeks.map((week) =>
          week.id === weekModal.week!.id
            ? { ...week, title: values.title.trim(), objective: values.objective.trim() }
            : week,
        ),
      }
    } else {
      const weekId = createWeekId(draft.weeks)
      const resources =
        values.resources
          ?.filter((item) => item.title?.trim() && item.url?.trim())
          .map((item) =>
            createDefaultResource(weekId, {
              title: item.title,
              topic: item.topic || item.title,
              url: item.url,
            }),
          ) ?? []

      const newWeek = createDefaultWeek(draft.weeks, {
        title: values.title,
        objective: values.objective,
        resources,
      })

      next = {
        ...draft,
        weeks: [...draft.weeks, newWeek],
      }
    }

    const saved = await publishCatalog(
      next,
      weekModal?.mode === 'edit' ? 'Semana atualizada.' : 'Semana adicionada.',
    )

    if (saved) {
      setWeekModal(null)
      weekForm.resetFields()
    }
  }

  async function saveResourceFromModal(values: ResourceFormValues) {
    if (!resourceModal) return

    let next: TrailCatalog

    if (resourceModal.mode === 'edit' && resourceModal.resource) {
      next = {
        ...draft,
        weeks: draft.weeks.map((week) =>
          week.id === resourceModal.weekId
            ? {
                ...week,
                resources: week.resources.map((resource) =>
                  resource.id === resourceModal.resource!.id
                    ? {
                        ...resource,
                        title: values.title.trim(),
                        topic: values.topic.trim(),
                        url: values.url.trim(),
                      }
                    : resource,
                ),
              }
            : week,
        ),
      }
    } else {
      const resource = createDefaultResource(resourceModal.weekId, {
        title: values.title,
        topic: values.topic,
        url: values.url,
      })
      next = {
        ...draft,
        weeks: draft.weeks.map((week) =>
          week.id === resourceModal.weekId
            ? { ...week, resources: [...week.resources, resource] }
            : week,
        ),
      }
    }

    const saved = await publishCatalog(
      next,
      resourceModal.mode === 'edit' ? 'Conteúdo atualizado.' : 'Conteúdo adicionado à semana.',
    )

    if (saved) {
      setExpandedWeekKey(String(resourceModal.weekId))
      setResourceModal(null)
      resourceForm.resetFields()
    }
  }

  async function publishCatalog(next: TrailCatalog, successMessage: string): Promise<boolean> {
    const errors = validateCatalog(next)
    if (errors.length > 0) {
      message.error(errors[0])
      return false
    }

    setDraft(next)
    try {
      await saveCatalog(next)
      message.success(successMessage)
      return true
    } catch (err) {
      setDraft({ weeks, quizzes })
      message.error(err instanceof Error ? err.message : 'Falha ao salvar trilha.')
      return false
    }
  }

  async function saveQuiz(resourceId: string, questions: QuizItem[]) {
    const next = {
      ...draft,
      quizzes: { ...draft.quizzes, [resourceId]: questions },
    }
    const saved = await publishCatalog(next, 'Teste salvo. Participantes já podem respondê-lo.')
    if (saved) {
      setQuizModal(null)
    }
  }

  async function removeQuiz(resourceId: string) {
    const quizzes = { ...draft.quizzes }
    delete quizzes[resourceId]
    const next = { ...draft, quizzes }
    const saved = await publishCatalog(next, 'Teste removido.')
    if (saved) {
      setQuizModal(null)
    }
  }

  const collapseItems = draft.weeks.map((week) => ({
    key: String(week.id),
    label: (
      <Text strong className="trail-editor-week__title">
        {`Semana ${week.id} — ${week.title}`}
      </Text>
    ),
    extra: (
      <Space onClick={(event) => event.stopPropagation()} className="trail-editor-week__actions">
        <Button size="small" type="primary" onClick={() => openWeekModal('edit', week)}>
          Editar
        </Button>
        <Button size="small" variant="outlined" danger onClick={() => confirmRemoveWeek(week)}>
          Remover
        </Button>
      </Space>
    ),
    children: (
      <div>
        <Paragraph type="secondary">{week.objective}</Paragraph>
        <Space direction="vertical" style={{ width: '100%' }} size={12}>
          {week.resources.map((resource) => {
            const quizCount = draft.quizzes[resource.id]?.length ?? 0
            return (
              <Card key={resource.id} size="small" type="inner" className="trail-editor-resource">
                <div className="trail-editor-resource__header">
                  <Text strong className="trail-editor-resource__title">
                    {resource.title}
                  </Text>
                  <div className="trail-editor-resource__actions">
                    <Button
                      size="small"
                      type="primary"
                      className="trail-editor-resource__action-primary"
                      onClick={() =>
                        setQuizModal({ resourceId: resource.id, resourceTitle: resource.title })
                      }
                    >
                      {quizCount > 0 ? 'Editar teste' : 'Criar teste'}
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      className="trail-editor-resource__action-secondary"
                      onClick={() => openResourceModal('edit', week.id, resource)}
                    >
                      Editar
                    </Button>
                    <Button
                      size="small"
                      type="text"
                      danger
                      className="trail-editor-resource__action-tertiary"
                      onClick={() => confirmRemoveResource(resource)}
                    >
                      Remover
                    </Button>
                  </div>
                </div>
                <Text type="secondary" className="trail-editor-resource__topic">
                  {resource.topic}
                </Text>
              </Card>
            )
          })}
          <Button
            variant="outlined"
            onClick={() => openResourceModal('create', week.id)}
            block
          >
            Adicionar conteúdo
          </Button>
        </Space>
      </div>
    ),
  }))

  if (loading && draft.weeks.length === 0) {
    return (
      <Card>
        <Paragraph type="secondary">Carregando catálogo da trilha…</Paragraph>
      </Card>
    )
  }

  return (
    <div className="trail-editor-panel">
      <Card className="trail-editor-panel__card">
        <div className="trail-editor-panel__header">
          <Typography.Title level={4} style={{ margin: 0 }}>
            Editar Trilha
          </Typography.Title>
          <Space className="trail-editor-panel__header-actions">
            <Button type="primary" onClick={() => openWeekModal('create')}>
              Adicionar semana
            </Button>
          </Space>
        </div>

        <Paragraph type="secondary" className="trail-editor-panel__subtitle">
          Gerencie semanas, conteúdos e testes. As alterações são salvas automaticamente.
        </Paragraph>

        {draft.weeks.length === 0 ? (
          <Card size="small" type="inner">
            <Paragraph type="secondary">Nenhuma semana cadastrada. Adicione a primeira semana.</Paragraph>
          </Card>
        ) : (
          <Collapse
            accordion
            bordered={false}
            className="trail-editor-weeks-collapse"
            items={collapseItems}
            activeKey={expandedWeekKey}
            onChange={(key) => setExpandedWeekKey(typeof key === 'string' ? key : undefined)}
            expandIcon={({ isActive }) => (
              <DownOutlined
                style={{
                  transition: 'transform 0.2s',
                  transform: isActive ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              />
            )}
          />
        )}
      </Card>

      <Modal
        open={weekModal != null}
        title={weekModal?.mode === 'edit' ? 'Editar semana' : 'Nova semana'}
        onCancel={() => {
          setWeekModal(null)
          weekForm.resetFields()
        }}
        onOk={() => weekForm.submit()}
        okText="Salvar"
        confirmLoading={saving}
        destroyOnHidden
        width={640}
      >
        <Form form={weekForm} layout="vertical" onFinish={(values) => void saveWeekFromModal(values)}>
          <Form.Item name="title" label="Nome da semana" rules={[{ required: true, message: 'Nome obrigatório.' }]}>
            <Input placeholder="Ex.: Semana de Discovery" />
          </Form.Item>
          <Form.Item
            name="objective"
            label="Descrição / objetivo"
            rules={[{ required: true, message: 'Descrição obrigatória.' }]}
          >
            <Input.TextArea rows={3} placeholder="O que o participante deve alcançar nesta semana?" />
          </Form.Item>
          {weekModal?.mode === 'create' && (
            <Form.List name="resources">
              {(fields, { add, remove }) => (
                <>
                  <Typography.Text strong>Conteúdos iniciais (opcional)</Typography.Text>
                  {fields.map((field) => (
                    <Card key={field.key} size="small" style={{ marginTop: 12 }}>
                      <Form.Item
                        {...field}
                        name={[field.name, 'title']}
                        label="Nome"
                        rules={[{ required: true, message: 'Nome obrigatório.' }]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item {...field} name={[field.name, 'topic']} label="Descrição">
                        <Input.TextArea rows={2} />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        name={[field.name, 'url']}
                        label="Link"
                        rules={[{ required: true, message: 'Link obrigatório.' }]}
                      >
                        <Input placeholder="https://" />
                      </Form.Item>
                      <Button danger type="text" onClick={() => remove(field.name)}>
                        Remover conteúdo
                      </Button>
                    </Card>
                  ))}
                  <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />} block style={{ marginTop: 12 }}>
                    Adicionar conteúdo inicial
                  </Button>
                </>
              )}
            </Form.List>
          )}
        </Form>
      </Modal>

      <Modal
        open={resourceModal != null}
        title={resourceModal?.mode === 'edit' ? 'Editar conteúdo' : 'Novo conteúdo'}
        onCancel={() => {
          setResourceModal(null)
          resourceForm.resetFields()
        }}
        onOk={() => resourceForm.submit()}
        okText="Salvar"
        confirmLoading={saving}
        centered
        destroyOnHidden
        width={isPhone ? 'min(100vw - 32px, 640px)' : 640}
      >
        <Form form={resourceForm} layout="vertical" onFinish={(values) => void saveResourceFromModal(values)}>
          <Form.Item name="title" label="Nome" rules={[{ required: true, message: 'Nome obrigatório.' }]}>
            <Input placeholder="Nome do conteúdo" />
          </Form.Item>
          <Form.Item name="topic" label="Descrição" rules={[{ required: true, message: 'Descrição obrigatória.' }]}>
            <Input.TextArea rows={3} placeholder="Breve descrição do conteúdo" />
          </Form.Item>
          <Form.Item
            name="url"
            label="Link"
            rules={[
              { required: true, message: 'Link obrigatório.' },
              { type: 'url', warningOnly: true, message: 'Use um endereço completo (https://...).' },
            ]}
          >
            <Input placeholder="https://" />
          </Form.Item>
        </Form>
      </Modal>

      {quizModal && (
        <QuizEditorModal
          open
          resourceTitle={quizModal.resourceTitle}
          initialQuestions={draft.quizzes[quizModal.resourceId] ?? []}
          saving={saving}
          onCancel={() => setQuizModal(null)}
          onSave={(questions) => saveQuiz(quizModal.resourceId, questions)}
          onRemove={() => removeQuiz(quizModal.resourceId)}
        />
      )}
    </div>
  )
}
