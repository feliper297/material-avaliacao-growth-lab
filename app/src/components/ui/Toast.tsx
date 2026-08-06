import { useEffect } from 'react'

export function Toast({ message, visible }: { message: string; visible: boolean }) {
  useEffect(() => {
    if (!visible || !message) return
    // aria-live for screen readers
  }, [visible, message])

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-5 right-5 z-[200] rounded-xl bg-text px-4 py-3 text-xs font-bold text-bg shadow-card transition ${visible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0 pointer-events-none'}`}
    >
      {message}
    </div>
  )
}
