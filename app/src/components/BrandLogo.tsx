const LOGO_SRC = '/growth-lab-logo.png'
const LOGO_RATIO = 164 / 316

interface BrandLogoProps {
  variant?: 'login' | 'sidebar'
  className?: string
}

function logoHeight(width: number) {
  return Math.round(width * LOGO_RATIO)
}

export function BrandLogo({ variant = 'login', className }: BrandLogoProps) {
  const isSidebar = variant === 'sidebar'
  const width = isSidebar ? 108 : 140

  return (
    <img
      src={LOGO_SRC}
      alt="Growth Lab"
      width={width}
      height={logoHeight(width)}
      className={className ?? (isSidebar ? 'brand-logo brand-logo--sidebar' : 'brand-logo brand-logo--login')}
      decoding="async"
      loading="eager"
    />
  )
}
