interface BrandLogoProps {
  variant?: 'login' | 'sidebar'
  className?: string
}

const LOGO_SRC = '/growth-lab-logo.png'

export function BrandLogo({ variant = 'login', className }: BrandLogoProps) {
  const isSidebar = variant === 'sidebar'

  return (
    <img
      src={LOGO_SRC}
      alt="Growth Lab"
      className={className ?? (isSidebar ? 'brand-logo brand-logo--sidebar' : 'brand-logo brand-logo--login')}
      decoding="async"
    />
  )
}
