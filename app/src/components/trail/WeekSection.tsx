import type { TrailWeek } from '../../../shared/data/weeks'
import type { AppStore } from '../../../shared/types/store'
import { getWeekProgress } from '../../../shared/domain/progress'
import { Button } from '../ui/Button'

const coverGradients: Record<string, string> = {
  'week-1': 'from-[#2a235d] to-[#6756ee]',
  'week-2': 'from-[#113d48] to-[#178a92]',
  'week-3': 'from-[#4a2a16] to-[#b66a28]',
  'week-4': 'from-[#3f183f] to-[#a33e8b]',
}

interface WeekSectionProps {
  week: TrailWeek
  store: AppStore
  onToggleComplete: (id: string) => void
  onOpenPrompt: (topic: string, link: string, weekLabel: string) => void
  onOpenQuiz: (week: TrailWeek) => void
  onAddEvidence: (weekId: number) => void
}

export function WeekSection({
  week,
  store,
  onToggleComplete,
  onOpenPrompt,
  onOpenQuiz,
  onAddEvidence,
}: WeekSectionProps) {
  const progress = getWeekProgress(week, store)
  const gradient = coverGradients[week.cover] ?? coverGradients['week-1']

  return (
    <section id={`week-${week.id}`} className="scroll-mt-24 mt-10">
      <article className="overflow-hidden rounded-[28px] border border-line bg-surface shadow-card">
        <header className={`relative grid gap-6 bg-gradient-to-br ${gradient} p-7 text-white md:grid-cols-[1fr_auto]`}>
          <div>
            <div className="text-[11px] font-extrabold uppercase tracking-widest text-white/65">
              Semana {week.id}
            </div>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">{week.title}</h2>
            <p className="mt-2 max-w-2xl text-sm text-white/75">{week.objective}</p>
          </div>
          <div
            className="relative grid h-24 w-24 place-items-center self-end rounded-full md:h-28 md:w-28"
            style={{
              background: `conic-gradient(#fff ${progress * 3.6}deg, rgba(255,255,255,.16) 0)`,
            }}
          >
            <div className="absolute inset-2 rounded-full bg-[rgba(26,25,46,.72)]" />
            <span className="relative text-center text-lg font-extrabold">
              {progress}%
              <small className="block text-[9px] font-semibold text-white/65">concluído</small>
            </span>
          </div>
        </header>

        <div className="grid gap-5 p-6 lg:grid-cols-[1.4fr_.6fr]">
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-bold">Conteúdos selecionados</h3>
              <span className="text-[11px] text-muted">{week.resources.length} itens · estudo curto</span>
            </div>
            <div className="grid gap-2.5">
              {week.resources.map((resource) => {
                const completed = store.completed.includes(resource.id)
                return (
                  <article
                    key={resource.id}
                    className={`grid gap-3 rounded-2xl border border-line bg-surface-solid p-4 md:grid-cols-[auto_1fr_auto] ${completed ? 'border-green/35 bg-gradient-to-r from-green-soft to-transparent' : ''}`}
                  >
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-surface-soft text-lg">
                      {resource.icon}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold">{resource.title}</h4>
                      <div className="mt-1 flex flex-wrap gap-2 text-[10px] text-muted">
                        <span>{resource.source}</span>
                        <span>•</span>
                        <span>{resource.duration}</span>
                        <span className="rounded-full bg-surface-soft px-2 py-0.5 font-bold">{resource.type}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5 md:justify-end">
                      <a
                        className="rounded-[10px] border border-line px-2.5 py-1.5 text-[11px] font-bold"
                        href={resource.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Abrir ↗
                      </a>
                      <Button
                        size="small"
                        variant="soft"
                        onClick={() =>
                          onOpenPrompt(resource.topic, resource.url, `Semana ${week.id} — ${week.title}`)
                        }
                      >
                        Estudar com IA
                      </Button>
                      <button
                        type="button"
                        title="Marcar como concluído"
                        className={`grid h-8 w-8 place-items-center rounded-[10px] border font-black ${completed ? 'border-green bg-green text-white' : 'border-line bg-surface'}`}
                        onClick={() => onToggleComplete(resource.id)}
                      >
                        {completed ? '✓' : '○'}
                      </button>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>

          <aside className="grid gap-3 content-start">
            <div className="rounded-2xl border border-line bg-surface-solid p-4">
              <h4 className="text-sm font-bold">Entrega da semana</h4>
              <ul className="mt-2 grid gap-2 text-[11px]">
                {week.deliverables.map((d) => (
                  <li key={d} className="grid grid-cols-[18px_1fr] gap-1.5">
                    <span className="font-black text-green">✓</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-line bg-surface-solid p-4 text-[11px] text-muted">
              Explique o conceito sem copiar a IA, mostre aplicação na sprint e registre o antes/depois ou a decisão
              tomada.
            </div>
          </aside>
        </div>

        <div className="grid gap-3 border-t border-line p-6 md:grid-cols-2">
          <div className="flex items-center justify-between gap-4 rounded-2xl border border-line bg-surface-soft p-4">
            <div>
              <h4 className="text-sm font-bold">Teste de conhecimento</h4>
              <p className="text-[10px] text-muted">
                {store.quizzes[String(week.id)] != null
                  ? `Última nota: ${store.quizzes[String(week.id)]}/3`
                  : 'Três perguntas para verificar entendimento.'}
              </p>
            </div>
            <Button variant="soft" size="small" onClick={() => onOpenQuiz(week)}>
              Fazer teste
            </Button>
          </div>
          <div className="flex items-center justify-between gap-4 rounded-2xl border border-line bg-surface-soft p-4">
            <div>
              <h4 className="text-sm font-bold">Aplicação prática</h4>
              <p className="text-[10px] text-muted">Registre Figma, fluxo, diagrama, protótipo ou documentação.</p>
            </div>
            <Button variant="soft" size="small" onClick={() => onAddEvidence(week.id)}>
              Adicionar evidência
            </Button>
          </div>
        </div>
      </article>
    </section>
  )
}
