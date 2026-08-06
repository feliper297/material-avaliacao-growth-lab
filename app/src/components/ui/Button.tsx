import { type ButtonHTMLAttributes } from 'react'

type Variant = 'default' | 'primary' | 'accent' | 'soft' | 'danger' | 'ghost'
type Size = 'default' | 'small' | 'icon'

const variantClass: Record<Variant, string> = {
  default: 'border-line bg-surface text-text hover:border-accent/35',
  primary: 'bg-text text-bg border-transparent',
  accent: 'bg-accent text-white border-transparent',
  soft: 'bg-accent-soft text-accent border-transparent',
  danger: 'bg-red-soft text-red border-transparent',
  ghost: 'border-white/20 bg-white/10 text-white',
}

const sizeClass: Record<Size, string> = {
  default: 'px-3 py-2 text-xs rounded-xl',
  small: 'px-2.5 py-1.5 text-[11px] rounded-[10px]',
  icon: 'w-9 h-9 p-0 rounded-xl',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
}

export function Button({
  variant = 'default',
  size = 'default',
  loading,
  className = '',
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-1.5 border font-bold transition hover:-translate-y-px disabled:opacity-60 disabled:pointer-events-none ${variantClass[variant]} ${sizeClass[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? 'Salvando…' : children}
    </button>
  )
}
