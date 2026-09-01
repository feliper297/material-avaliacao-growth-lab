import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import type { QuizItem, TrailWeek } from '../../shared/data/weeks'
import { getCycleStatus, getOverallProgress, getWeekProgress, resourceHasQuiz } from '../../shared/domain/progress'
import { getQuizScore } from '../../shared/domain/quiz'
import { getResourceQuizFromCatalog } from '../../shared/domain/trail-catalog'
import type { AppStore } from '../../shared/types/store'

function sanitize(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\x00-\x7F]/g, (char) => {
      const map: Record<string, string> = {
        '·': '-',
        '—': '-',
        '→': '->',
      }
      return map[char] ?? ''
    })
}

export function exportProgressPdf(
  store: AppStore,
  weeks: TrailWeek[],
  quizzes: Record<string, QuizItem[]>,
  userEmail?: string,
): void {
  const totalResources = weeks.flatMap((week) => week.resources).length
  const progress = getOverallProgress(store.completed.length, totalResources)
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const margin = 14
  let y = margin

  doc.setFontSize(18)
  doc.text(sanitize('Growth Lab - Relatorio de Progresso'), margin, y)
  y += 8

  doc.setFontSize(10)
  doc.setTextColor(100)
  doc.text(sanitize(`Gerado em ${new Date().toLocaleString('pt-BR')}`), margin, y)
  y += 5
  if (userEmail) {
    doc.text(sanitize(`Participante: ${userEmail}`), margin, y)
    y += 5
  }
  doc.setTextColor(0)

  doc.setFontSize(12)
  y += 4
  doc.text(sanitize(`Status: ${getCycleStatus(progress)}`), margin, y)
  y += 6
  doc.text(sanitize(`Progresso geral: ${progress}%`), margin, y)
  y += 6
  doc.text(
    sanitize(`Conteudos concluidos: ${store.completed.length} de ${totalResources}`),
    margin,
    y,
  )
  y += 6
  doc.text(sanitize(`Evidencias registradas: ${store.evidences.length}`), margin, y)
  y += 10

  const weekRows = weeks.map((week) => {
    const weekProgress = getWeekProgress(week, store, quizzes)
    const quizzesDone = week.resources.filter((r) => store.quizzes[r.id] != null).length
    const quizzesAvailable = week.resources.filter((r) => resourceHasQuiz(r.id, quizzes)).length
    const evidenceCount = store.evidences.filter((e) => e.week === week.id).length
    return [
      sanitize(`Semana ${week.id}`),
      sanitize(week.title),
      `${weekProgress}%`,
      sanitize(`${quizzesDone}/${quizzesAvailable} testes`),
      String(evidenceCount),
    ]
  })

  autoTable(doc, {
    startY: y,
    head: [['Semana', 'Tema', 'Progresso', 'Testes', 'Evidencias']],
    body: weekRows,
    styles: { fontSize: 9, cellPadding: 2 },
    headStyles: { fillColor: [9, 88, 217] },
    margin: { left: margin, right: margin },
  })

  y = (doc as jsPDF & { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 10

  if (store.evidences.length > 0) {
    doc.setFontSize(13)
    doc.text(sanitize('Evidencias de evolucao'), margin, y)
    y += 6

    const evidenceRows = store.evidences.map((e) => [
      sanitize(`S${e.week}`),
      sanitize(e.type),
      sanitize(e.title),
      sanitize(e.description.slice(0, 120) + (e.description.length > 120 ? '...' : '')),
    ])

    autoTable(doc, {
      startY: y,
      head: [['Semana', 'Tipo', 'Titulo', 'Descricao']],
      body: evidenceRows,
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { fillColor: [35, 120, 4] },
      margin: { left: margin, right: margin },
    })

    y = (doc as jsPDF & { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 10
  }

  const quizEntries = weeks.flatMap((week) =>
    week.resources
      .filter((r) => store.quizzes[r.id] != null)
      .map((r) => {
        const questions = getResourceQuizFromCatalog(r.id, quizzes)
        return {
          week: week.id,
          title: r.title,
          score: getQuizScore(store.quizzes[r.id]) ?? 0,
          total: questions.length || 3,
        }
      }),
  )

  if (quizEntries.length > 0) {
    if (y > 250) {
      doc.addPage()
      y = margin
    }

    doc.setFontSize(13)
    doc.text(sanitize('Testes de conhecimento'), margin, y)
    y += 6

    autoTable(doc, {
      startY: y,
      head: [['Semana', 'Conteudo', 'Acertos', 'Erros']],
      body: quizEntries.map((q) => [
        sanitize(`S${q.week}`),
        sanitize(q.title),
        String(q.score),
        String(q.total - q.score),
      ]),
      styles: { fontSize: 9, cellPadding: 2 },
      headStyles: { fillColor: [9, 88, 217] },
      margin: { left: margin, right: margin },
    })
  }

  doc.save(`growth-lab-relatorio-${new Date().toISOString().slice(0, 10)}.pdf`)
}

export function openPrintReport(
  store: AppStore,
  weeks: TrailWeek[],
  quizzes: Record<string, QuizItem[]>,
  userEmail?: string,
): void {
  const totalResources = weeks.flatMap((week) => week.resources).length
  const progress = getOverallProgress(store.completed.length, totalResources)
  const printWindow = window.open('', '_blank', 'noopener,noreferrer,width=900,height=700')
  if (!printWindow) {
    window.print()
    return
  }

  const weekSections = weeks.map((week) => {
    const weekProgress = getWeekProgress(week, store, quizzes)
    const quizItems = week.resources
      .filter((r) => store.quizzes[r.id] != null)
      .map((r) => {
        const total = getResourceQuizFromCatalog(r.id, quizzes).length || 3
        return `<li>${escapeHtml(r.title)}: ${getQuizScore(store.quizzes[r.id]) ?? 0}/${total} acertos</li>`
      })
      .join('')
    const evidences = store.evidences
      .filter((e) => e.week === week.id)
      .map((e) => `<li><strong>${escapeHtml(e.title)}</strong> (${escapeHtml(e.type)})</li>`)
      .join('')

    return `
      <section class="week">
        <h2>Semana ${week.id} — ${escapeHtml(week.title)} (${weekProgress}%)</h2>
        ${quizItems ? `<h3>Testes</h3><ul>${quizItems}</ul>` : ''}
        ${evidences ? `<h3>Evidencias</h3><ul>${evidences}</ul>` : ''}
      </section>
    `
  }).join('')

  printWindow.document.write(`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <title>Growth Lab — Relatorio</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 24px; color: #111; line-height: 1.5; }
    h1 { font-size: 22px; margin-bottom: 4px; }
    .meta { color: #666; font-size: 13px; margin-bottom: 20px; }
    .summary { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 24px; }
    .summary div { border: 1px solid #ddd; border-radius: 8px; padding: 12px; }
    .summary strong { display: block; font-size: 18px; margin-top: 4px; }
    .week { margin-bottom: 20px; page-break-inside: avoid; }
    .week h2 { font-size: 16px; margin-bottom: 8px; border-bottom: 1px solid #eee; padding-bottom: 4px; }
    .week h3 { font-size: 13px; margin: 8px 0 4px; color: #444; }
    ul { margin: 0; padding-left: 20px; font-size: 13px; }
    @media print { body { margin: 12mm; } }
  </style>
</head>
<body>
  <h1>Growth Lab — Relatorio de Progresso</h1>
  <p class="meta">
    Gerado em ${new Date().toLocaleString('pt-BR')}
    ${userEmail ? `<br />Participante: ${escapeHtml(userEmail)}` : ''}
  </p>
  <div class="summary">
    <div>Status<strong>${escapeHtml(getCycleStatus(progress))}</strong></div>
    <div>Progresso geral<strong>${progress}%</strong></div>
    <div>Conteudos<strong>${store.completed.length} / ${totalResources}</strong></div>
    <div>Evidencias<strong>${store.evidences.length}</strong></div>
  </div>
  ${weekSections}
  <script>
    window.onload = function() {
      window.focus();
      window.print();
    };
  </script>
</body>
</html>`)
  printWindow.document.close()
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
