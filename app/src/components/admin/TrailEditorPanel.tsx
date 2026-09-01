import {
  DeleteOutlined,
  EditOutlined,
  FileTextOutlined,
  PlusOutlined,
  SaveOutlined,
} from '@ant-design/icons'
import {
  App,
  Button,
  Card,
  Collapse,
  Form,
  Input,
  Modal,
  Space,
  Tag,
  Typography,
} from 'antd'
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
  source?: string
  type?: string
  duration?: string
}

export function TrailEditorPanel() {
  const { message, modal } = App.useApp()
  const { weeks, quizzes, saveCatalog, saving, reload, loading } = useTrailCatalogContext()
  const [draft, setDraft] = useState<TrailCatalog>(() => ({ weeks: [], quizzes: {} }))
  const [dirty, setDirty] = useState(false)

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
    if (!dirty) {
      setDraft({ weeks, quizzes })
    }
  }, [weeks, quizzes, dirty])

  function updateDraft(next: TrailCatalog) {
    setDraft(next)
    setDirty(true)
  }

  async function handleSaveCatalog() {
    const errors = validateCatalog(draft)
    if (errors.length > 0) {
      message.error(errors[0])
      return
    }
    try {
      await saveCatalog(draft)
      setDirty(false)
      message.success('Trilha salva com sucesso.')
    } catch (err) {
      message.error(err instanceof Error ? err.message : 'Falha ao salvar trilha.')
    }
  }

  function confirmRemoveWeek(week: TrailWeek) {
    modal.confirm({
      title: `Remover semana ${week.id}?`,
      content: `"${week.title}" e todos os conteúdos/testes vinculados serão excluídos.`,
      okText: 'Remover',
      okButtonProps: { danger: true },
      cancelText: 'Cancelar',
      onOk: () => updateDraft(removeWeekFromCatalog(draft, week.id)),
    })
  }

  function confirmRemoveResource(resource: TrailResource) {
    modal.confirm({
      title: 'Remover conteúdo?',
      content: `"${resource.title}" será excluído. Evidências antigas dos participantes permanecem no sistema; o teste vinculado será removido.`,
      okText: 'Remover',
      okButtonProps: { danger: true },
      cancelText: 'Cancelar',
      onOk: () => updateDraft(removeResourceFromCatalog(draft, resource.id)),
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
        source: resource.source,
        type: resource.type,
        duration: resource.duration,
      })
    } else {
      resourceForm.resetFields()
    }
  }

  function saveWeekFromModal(values: WeekFormValues) {
    if (weekModal?.mode === 'edit' && weekModal.week) {
      updateDraft({
        ...draft,
        weeks: draft.weeks.map((week) =>
          week.id === weekModal.week!.id
            ? { ...week, title: values.title.trim(), objective: values.objective.trim() }
            : week,
        ),
      })
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

      updateDraft({
        ...draft,
        weeks: [...draft.weeks, newWeek],
      })
    }
    setWeekModal(null)
    weekForm.resetFields()
  }

  function saveResourceFromModal(values: ResourceFormValues) {
    if (!resourceModal) return
    const payload = {
      title: values.title,
      topic: values.topic,
      url: values.url,
      source: values.source,
      type: values.type,
      duration: values.duration,
    }

    if (resourceModal.mode === 'edit' && resourceModal.resource) {
      updateDraft({
        ...draft,
        weeks: draft.weeks.map((week) =>
          week.id === resourceModal.weekId
            ? {
                ...week,
                resources: week.resources.map((resource) =>
                  resource.id === resourceModal.resource!.id
                    ? {
                        ...resource,
                        title: payload.title.trim(),
                        topic: payload.topic.trim(),
                        url: payload.url.trim(),
                        source: payload.source?.trim() || resource.source,
                        type: payload.type?.trim() || resource.type,
                        duration: payload.duration?.trim() || resource.duration,
                      }
                    : resource,
                ),
              }
            : week,
        ),
      })
    } else {
      const resource = createDefaultResource(resourceModal.weekId, payload)
      updateDraft({
        ...draft,
        weeks: draft.weeks.map((week) =>
          week.id === resourceModal.weekId
            ? { ...week, resources: [...week.resources, resource] }
            : week,
        ),
      })
    }
    setResourceModal(null)
    resourceForm.resetFields()
  }

  function saveQuiz(resourceId: string, questions: QuizItem[]) {
    updateDraft({
      ...draft,
      quizzes: { ...draft.quizzes, [resourceId]: questions },
    })
    setQuizModal(null)
    message.success('Teste atualizado. Clique em "Salvar alterações" para publicar.')
  }

  function removeQuiz(resourceId: string) {
    const quizzes = { ...draft.quizzes }
    delete quizzes[resourceId]
    updateDraft({ ...draft, quizzes })
    setQuizModal(null)
    message.success('Teste removido. Clique em "Salvar alterações" para publicar.')
  }

  const collapseItems = draft.weeks.map((week) => ({
    key: String(week.id),
    label: (
      <Space wrap>
        <Text strong>{`Semana ${week.id} — ${week.title}`}</Text>
        <Tag>{week.resources.length} conteúdo{week.resources.length === 1 ? '' : 's'}</Tag>
      </Space>
    ),
    extra: (
      <Space onClick={(event) => event.stopPropagation()} wrap>
        <Button size="small" icon={<EditOutlined />} onClick={() => openWeekModal('edit', week)}>
          Editar
        </Button>
        <Button size="small" danger icon={<DeleteOutlined />} onClick={() => confirmRemoveWeek(week)}>
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
              <Card key={resource.id} size="small" type="inner">
                <Space direction="vertical" style={{ width: '100%' }} size={8}>
                  <Space wrap style={{ justifyContent: 'space-between', width: '100%' }}>
                    <div>
                      <Text strong>{resource.title}</Text>
                      <br />
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        {resource.topic}
                      </Text>
                    </div>
                    <Space wrap>
                      <Tag color={quizCount > 0 ? 'blue' : 'default'}>
                        {quizCount > 0 ? `${quizCount} pergunta${quizCount === 1 ? '' : 's'}` : 'Sem teste'}
                      </Tag>
                      <Button
                        size="small"
                        icon={<FileTextOutlined />}
                        onClick={() =>
                          setQuizModal({ resourceId: resource.id, resourceTitle: resource.title })
                        }
                      >
                        {quizCount > 0 ? 'Editar teste' : 'Cadastrar teste'}
                      </Button>
                      <Button
                        size="small"
                        icon={<EditOutlined />}
                        onClick={() => openResourceModal('edit', week.id, resource)}
                      >
                        Editar
                      </Button>
                      <Button
                        size="small"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => confirmRemoveResource(resource)}
                      >
                        Remover
                      </Button>
                    </Space>
                  </Space>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    {resource.url}
                  </Text>
                </Space>
              </Card>
            )
          })}
          <Button
            type="dashed"
            icon={<PlusOutlined />}
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
      <Space wrap style={{ width: '100%', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <Typography.Title level={4} style={{ marginBottom: 4 }}>
            Editor da trilha
          </Typography.Title>
          <Paragraph type="secondary" style={{ marginBottom: 0 }}>
            Gerencie semanas, conteúdos e testes. As alterações só entram em vigor após salvar.
          </Paragraph>
        </div>
        <Space wrap>
          <Button type="primary" icon={<SaveOutlined />} loading={saving} onClick={() => void handleSaveCatalog()}>
            Salvar alterações
          </Button>
          <Button icon={<PlusOutlined />} onClick={() => openWeekModal('create')}>
            Adicionar semana
          </Button>
        </Space>
      </Space>

      {draft.weeks.length === 0 ? (
        <Card>
          <Paragraph type="secondary">Nenhuma semana cadastrada. Adicione a primeira semana.</Paragraph>
        </Card>
      ) : (
        <Collapse items={collapseItems} defaultActiveKey={collapseItems.map((item) => item.key)} />
      )}

      <Modal
        open={weekModal != null}
        title={weekModal?.mode === 'edit' ? 'Editar semana' : 'Nova semana'}
        onCancel={() => {
          setWeekModal(null)
          weekForm.resetFields()
        }}
        onOk={() => weekForm.submit()}
        okText="Salvar"
        destroyOnHidden
        width={640}
      >
        <Form form={weekForm} layout="vertical" onFinish={saveWeekFromModal}>
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
        destroyOnHidden
        width={640}
      >
        <Form form={resourceForm} layout="vertical" onFinish={saveResourceFromModal}>
          <Form.Item name="title" label="Nome" rules={[{ required: true, message: 'Nome obrigatório.' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="topic" label="Descrição" rules={[{ required: true, message: 'Descrição obrigatória.' }]}>
            <Input.TextArea rows={2} />
          </Form.Item>
          <Form.Item name="url" label="Link" rules={[{ required: true, message: 'Link obrigatório.' }]}>
            <Input placeholder="https://" />
          </Form.Item>
          <Form.Item name="source" label="Fonte">
            <Input placeholder="Referência" />
          </Form.Item>
          <Form.Item name="type" label="Tipo">
            <Input placeholder="Conteúdo" />
          </Form.Item>
          <Form.Item name="duration" label="Duração">
            <Input placeholder="10 min" />
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
