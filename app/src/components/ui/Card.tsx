import { type ReactNode } from 'react'

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <article className={`rounded-[18px] border border-line bg-surface shadow-card ${className}`}>
      {children}
    </article>
  )
}

export function EmptyState({
  icon,
  title,
  description,
}: {
  icon: string
  title: string
  description: string
}) {
  return (
    <Card className="flex min-h-44 flex-col items-center justify-center border-dashed bg-transparent p-6 text-center shadow-none">
      <div className="text-2xl">{icon}</div>
      <strong className="mt-2 text-sm">{title}</strong>
      <p className="mt-1 text-xs text-muted">{description}</p>
    </Card>
  )
}
