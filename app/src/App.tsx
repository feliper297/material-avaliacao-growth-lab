import { useMemo, useState } from 'react'
import { ALL_RESOURCE_IDS, WEEKS, type TrailWeek } from '../shared/data/weeks'
import {
  calculateAverage,
  getCycleStatus,
  getOverallProgress,
} from '../shared/domain/progress'
import { SCORE_DIMENSIONS } from '../shared/types/store'
import { EvidenceForm } from './components/trail/EvidenceForm'
import { PromptPanel } from './components/trail/PromptPanel'
import { QuizForm } from './components/trail/QuizForm'
import { WeekSection } from './components/trail/WeekSection'
import { Button } from './components/ui/Button'
import { Card, EmptyState } from './components/ui/Card'
import { Modal } from './components/ui/Modal'
import { Toast } from './components/ui/Toast'
import { useStore } from './hooks/useStore'

export default function App() {
  const {
    store,
    loadStatus,
    saveStatus,
    error,
    toggleComplete,
    addEvidence,
    deleteEvidence,
    saveQuiz,
    saveScores,
    updateScore,
    setTheme,
    exportProgress,
  } = useStore()

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [evidenceOpen, setEvidenceOpen] = useState(false)
  const [evidenceWeek, setEvidenceWeek] = useState(1)
  const [quizWeek, setQuizWeek] = useState<TrailWeek | null>(null)
  const [prompt, setPrompt] = useState<{ topic: string; link: string; week: string } | null>(null)
  const [toast, setToast] = useState('')

  const progress = useMemo(
    () => getOverallProgress(store.completed.length, ALL_RESOURCE_IDS.length, store.evidences.length),
    [store],
  )
  const average = useMemo(() => calculateAverage(store.scores, SCORE_DIMENSIONS.length), [store.scores])

  function notify(message: string) {
    setToast(message)
    setTimeout(() => setToast(''), 2400)
  }

  async function handleToggle(id: string) {
    const wasDone = store.completed.includes(id)
    await toggleComplete(id)
    notify(wasDone ? 'Conteúdo marcado como pendente.' : 'Conteúdo concluído.')
  }

  if (loadStatus === 'loading') {
    return (
      <div className="grid min-h-screen place-items-center bg-bg text-muted">
        <p role="status">Carregando trilha…</p>
      </div>
    )
  }

  if (loadStatus === 'error') {
    return (
      <div className="grid min-h-screen place-items-center bg-bg p-6 text-center">
        <Card className="max-w-md p-6">
          <h1 className="text-lg font-bold text-red">Erro ao carregar</h1>
          <p className="mt-2 text-sm text-muted">{error}</p>
          <p className="mt-3 text-xs text-muted">
            Verifique se o BFF está rodando: <code className="font-mono">npm run dev:server</code>
          </p>
        </Card>
      </div>
    )
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-[276px_1fr]">
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-[min(310px,86vw)] overflow-y-auto border-r border-line bg-bg/85 p-5 backdrop-blur-xl transition-transform lg:static lg:w-auto lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-[105%]'}`}
      >
        <div className="mb-5 flex items-center gap-3 px-2">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-accent to-accent-2 font-extrabold text-white shadow-lg">
            G
          </div>
          <div>
            <strong className="block text-sm">Growth Lab</strong>
            <span className="text-[11px] text-muted">Product Design · 30 dias</span>
          </div>
        </div>

        <Card className="mb-4 p-4">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-extrabold uppercase tracking-widest text-muted">Progresso geral</div>
              <strong className="text-sm">{getCycleStatus(progress)}</strong>
            </div>
            <div
              className="grid h-12 w-12 place-items-center rounded-full text-[11px] font-bold"
              style={{ background: `conic-gradient(var(--color-accent) ${progress * 3.6}deg, var(--color-surface-soft) 0)` }}
            >
              {progress}%
            </div>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-surface-soft">
            <div className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2" style={{ width: `${progress}%` }} />
          </div>
          <div className="mt-2 flex justify-between text-[11px] text-muted">
            <span>
              {store.completed.length} de {ALL_RESOURCE_IDS.length} conteúdos
            </span>
            <span>
              {store.evidences.length} evidência{store.evidences.length === 1 ? '' : 's'}
            </span>
          </div>
        </Card>

        <nav className="grid gap-1 text-[13px] font-semibold">
          {[
            ['#overview', '01', 'Visão geral'],
            ...WEEKS.map((w) => [`#week-${w.id}`, `W${w.id}`, w.title.split(' ')[0] + '…']),
            ['#evidences', 'EV', 'Evidências'],
            ['#assessment', 'AV', 'Avaliação final'],
          ].map(([href, icon, label]) => (
            <a
              key={href}
              href={href}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-muted hover:bg-accent-soft hover:text-text"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="grid h-6 w-6 place-items-center rounded-lg bg-surface-soft text-[11px]">{icon}</span>
              {label}
            </a>
          ))}
        </nav>

        <p className="mt-4 px-2 text-[11px] text-muted">
          Estudar → explicar → testar → aplicar → registrar evidência. Conteúdo sem aplicação não conclui a etapa.
        </p>
      </aside>

      <main className="min-w-0">
        <header className="sticky top-0 z-20 flex h-[74px] items-center justify-between border-b border-line bg-bg/80 px-4 backdrop-blur-xl md:px-8">
          <div className="flex items-center gap-2">
            <Button size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)} aria-label="Abrir menu">
              ☰
            </Button>
            <span className="h-2 w-2 rounded-full bg-green shadow-[0_0_0_5px_var(--color-green-soft)]" />
            <b className="hidden text-sm md:inline">Trilha de evolução ativa</b>
            {saveStatus === 'saving' && <span className="text-xs text-muted">Salvando…</span>}
            {saveStatus === 'error' && (
              <span className="text-xs font-semibold text-red" role="alert">
                Erro ao salvar
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              size="icon"
              onClick={() => setTheme(store.theme === 'light' ? 'dark' : 'light')}
              aria-label="Alternar tema"
            >
              ◐
            </Button>
            <Button className="hidden md:inline-flex" onClick={() => { exportProgress(); notify('Progresso exportado.') }}>
              ↓ Exportar
            </Button>
            <Button variant="primary" onClick={() => window.print()}>
              Imprimir
            </Button>
          </div>
        </header>

        <div className="mx-auto w-full max-w-6xl px-4 py-8 pb-20 md:px-7">
          <section
            id="overview"
            className="relative grid min-h-[330px] gap-7 overflow-hidden rounded-[28px] bg-gradient-to-br from-[#11141d] via-[#33246c] to-[#11141d] p-8 text-white shadow-2xl lg:grid-cols-[1.3fr_.7fr]"
          >
            <div>
              <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[11px] font-bold">
                ◆ Desenvolvimento aplicado à sprint
              </span>
              <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
                Evolução visível, não apenas conteúdo assistido.
              </h1>
              <p className="mt-3 max-w-2xl text-sm text-white/70">
                Trilha de 30 dias para qualidade, raciocínio de produto, sistemas, IA e autonomia — com aplicação em
                demandas reais.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <a href="#week-1" className="rounded-xl bg-white px-3 py-2 text-xs font-bold text-[#151720]">
                  Começar trilha
                </a>
                <Button
                  variant="ghost"
                  onClick={() =>
                    setPrompt({
                      topic: 'Trilha completa de Product Design',
                      link: '',
                      week: 'Ciclo de 30 dias',
                    })
                  }
                >
                  Abrir tutor de IA
                </Button>
              </div>
            </div>
            <Card className="border-white/15 bg-white/10 p-4 text-white shadow-none backdrop-blur-md">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold">Mapa do ciclo</h3>
                  <small className="text-white/60">30 dias · quatro checkpoints</small>
                </div>
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-[9px] font-bold">Hoje</span>
              </div>
              <div className="grid grid-cols-7 gap-1.5">
                {Array.from({ length: 28 }, (_, i) => {
                  const day = i + 1
                  const doneDays = Math.round((progress / 100) * 30)
                  const isDone = day <= doneDays
                  const isToday = day === Math.min(doneDays + 1, 28)
                  return (
                    <div
                      key={day}
                      className={`grid aspect-square place-items-center rounded-lg text-[9px] ${isDone ? 'bg-accent/85 text-white' : 'border border-white/10 bg-white/10 text-white/65'} ${isToday ? 'ring-1 ring-white' : ''}`}
                    >
                      {day}
                    </div>
                  )
                })}
              </div>
            </Card>
          </section>

          <section className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[
              ['↗', `${progress}%`, 'Progresso de aprendizagem'],
              ['✓', String(store.completed.length), 'Conteúdos concluídos'],
              ['◇', String(store.evidences.length), 'Evidências registradas'],
              ['★', average.toFixed(1), 'Média de avaliação'],
            ].map(([icon, value, label]) => (
              <Card key={label} className="p-4">
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-accent-soft text-xs font-black text-accent">
                  {icon}
                </div>
                <span className="mt-2 block text-2xl font-extrabold tracking-tight">{value}</span>
                <span className="text-[11px] text-muted">{label}</span>
              </Card>
            ))}
          </section>

          {WEEKS.map((week) => (
            <WeekSection
              key={week.id}
              week={week}
              store={store}
              onToggleComplete={handleToggle}
              onOpenPrompt={(topic, link, weekLabel) => setPrompt({ topic, link, week: weekLabel })}
              onOpenQuiz={setQuizWeek}
              onAddEvidence={(id) => {
                setEvidenceWeek(id)
                setEvidenceOpen(true)
              }}
            />
          ))}

          <section id="evidences" className="scroll-mt-24 mt-10">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <div className="text-[10px] font-extrabold uppercase tracking-widest text-muted">Portfólio interno</div>
                <h2 className="text-2xl font-bold tracking-tight">Evidências de evolução</h2>
                <p className="mt-1 text-sm text-muted">
                  Registre links do Figma, Loom, documentos, diagramas, comparações e decisões aplicadas.
                </p>
              </div>
              <Button
                variant="accent"
                onClick={() => {
                  setEvidenceWeek(1)
                  setEvidenceOpen(true)
                }}
              >
                + Nova evidência
              </Button>
            </div>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {store.evidences.length === 0 ? (
                <EmptyState
                  icon="◇"
                  title="Nenhuma evidência registrada"
                  description="Adicione a primeira aplicação da trilha."
                />
              ) : (
                store.evidences.map((e) => (
                  <Card key={e.id} className="flex min-h-44 flex-col gap-2 p-4">
                    <div className="flex flex-wrap gap-2 text-[10px] text-muted">
                      <span className="rounded-full bg-surface-soft px-2 py-0.5 font-bold">Semana {e.week}</span>
                      <span>{e.type}</span>
                    </div>
                    <h4 className="text-sm font-bold">{e.title}</h4>
                    <p className="flex-1 text-[11px] text-muted">{e.description}</p>
                    <footer className="flex items-center justify-between border-t border-line pt-2">
                      <span className="text-[10px] text-muted">
                        {new Date(e.createdAt).toLocaleDateString('pt-BR')}
                      </span>
                      <div className="flex gap-1.5">
                        {e.url && (
                          <a
                            className="rounded-[10px] border border-line px-2 py-1 text-[11px] font-bold"
                            href={e.url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Abrir ↗
                          </a>
                        )}
                        <Button
                          size="small"
                          variant="danger"
                          onClick={async () => {
                            if (!confirm('Remover esta evidência?')) return
                            await deleteEvidence(e.id)
                            notify('Evidência removida.')
                          }}
                        >
                          Excluir
                        </Button>
                      </div>
                    </footer>
                  </Card>
                ))
              )}
            </div>
          </section>

          <section id="assessment" className="scroll-mt-24 mt-10">
            <div className="mb-4">
              <div className="text-[10px] font-extrabold uppercase tracking-widest text-muted">Avaliação contínua</div>
              <h2 className="text-2xl font-bold tracking-tight">Régua de evolução</h2>
              <p className="mt-1 text-sm text-muted">
                Ajuste as seis dimensões com base em evidências observáveis. A nota não substitui o feedback
                qualitativo.
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {SCORE_DIMENSIONS.map((dimension, index) => (
                <Card key={dimension} className="p-4">
                  <label className="mb-2 flex justify-between text-[11px] font-bold">
                    <span>{dimension}</span>
                    <strong>{store.scores[String(index)] ?? 3}</strong>
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    step={1}
                    value={store.scores[String(index)] ?? 3}
                    className="w-full accent-accent"
                    onChange={(e) => updateScore(index, Number(e.target.value))}
                  />
                </Card>
              ))}
              <Card className="flex flex-wrap items-center justify-between gap-4 bg-gradient-to-br from-accent-soft to-transparent p-5 md:col-span-2">
                <div>
                  <div className="text-[10px] font-extrabold uppercase tracking-widest text-muted">Média atual</div>
                  <strong className="text-3xl font-extrabold">{average.toFixed(1)}</strong>
                  <p className="text-[11px] text-muted">Meta sugerida: média ≥ 3,5 e nenhuma dimensão crítica abaixo de 3.</p>
                </div>
                <Button variant="accent" loading={saveStatus === 'saving'} onClick={async () => { await saveScores(); notify('Avaliação salva.') }}>
                  Salvar avaliação
                </Button>
              </Card>
            </div>
          </section>

          <footer className="mt-10 rounded-2xl border border-line bg-surface-soft p-4 text-[11px] text-muted">
            <strong className="text-text">Persistência (ADR-007):</strong> dados salvos via BFF em{' '}
            <code className="font-mono">server/data/store.json</code> — mock de desenvolvimento, não produção.
          </footer>
        </div>
      </main>

      <Modal open={evidenceOpen} title="Nova evidência" eyebrow="Registro de aplicação" onClose={() => setEvidenceOpen(false)}>
        <EvidenceForm
          defaultWeek={evidenceWeek}
          loading={saveStatus === 'saving'}
          onCancel={() => setEvidenceOpen(false)}
          onSubmit={async (input) => {
            await addEvidence(input)
            setEvidenceOpen(false)
            notify('Evidência registrada.')
          }}
        />
      </Modal>

      <Modal
        open={!!quizWeek}
        title={quizWeek ? `Semana ${quizWeek.id} — ${quizWeek.title}` : 'Mini teste'}
        eyebrow="Verificação de conhecimento"
        onClose={() => setQuizWeek(null)}
      >
        {quizWeek && (
          <QuizForm
            week={quizWeek}
            onSubmit={async (score) => {
              await saveQuiz(quizWeek.id, score)
              notify('Teste corrigido.')
            }}
          />
        )}
      </Modal>

      <Modal
        open={!!prompt}
        title={prompt?.topic.slice(0, 58) ?? 'Estudar com IA'}
        eyebrow="Tutor socrático"
        onClose={() => setPrompt(null)}
      >
        {prompt && <PromptPanel topic={prompt.topic} link={prompt.link} week={prompt.week} />}
      </Modal>

      <Toast message={toast} visible={!!toast} />
    </div>
  )
}
