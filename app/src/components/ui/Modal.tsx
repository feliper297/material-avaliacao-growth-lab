import { type ReactNode, useEffect } from 'react'
import { Button } from './Button'

interface ModalProps {
  open: boolean
  title: string
  eyebrow?: string
  onClose: () => void
  children: ReactNode
}

export function Modal({ open, title, eyebrow, onClose, children }: ModalProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(6,8,13,.55)] p-5 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="max-h-[86vh] w-full max-w-2xl overflow-auto rounded-3xl border border-line bg-surface-solid shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-line bg-surface-solid px-5 py-4">
          <div>
            {eyebrow && (
              <div className="text-[10px] font-extrabold uppercase tracking-widest text-muted">{eyebrow}</div>
            )}
            <h3 id="modal-title" className="text-base font-bold">
              {title}
            </h3>
          </div>
          <Button size="icon" onClick={onClose} aria-label="Fechar">
            ×
          </Button>
        </header>
        <div className="p-5">{children}</div>
      </div>
    </div>
  )
}
