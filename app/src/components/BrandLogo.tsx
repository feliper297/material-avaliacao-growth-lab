const LOGO_1X = '/growth-lab-logo-hq.png'
const LOGO_2X = '/growth-lab-logo@2x.png'
const LOGO_3X = '/growth-lab-logo@3x.png'
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
      src={LOGO_1X}
      srcSet={`${LOGO_1X} 1x, ${LOGO_2X} 2x, ${LOGO_3X} 3x`}
      alt="Growth Lab"
      width={width}
      height={logoHeight(width)}
      className={className ?? (isSidebar ? 'brand-logo brand-logo--sidebar' : 'brand-logo brand-logo--login')}
      decoding="async"
      loading="eager"
    />
  )
}
