import { Grid } from 'antd'
import { useEffect, useState, type CSSProperties } from 'react'

/** Viewports abaixo de 992px usam drawer em vez da sidebar fixa. */
export const SIDEBAR_COLLAPSE_QUERY = '(max-width: 991px)'
export const PHONE_QUERY = '(max-width: 575px)'
export const TABLET_QUERY = '(min-width: 576px) and (max-width: 991px)'
export const MOBILE_BREAKPOINT = 'lg' as const
export const SIDEBAR_WIDTH = 280
export const SIDEBAR_COLLAPSED_WIDTH = 72
export const CONTENT_PADDING_DESKTOP = 32
export const CONTENT_PADDING_TABLET = 24
export const CONTENT_PADDING_MOBILE = 16

export type ViewportTier = 'phone' | 'tablet' | 'desktop'

function readViewportTier(): ViewportTier {
  if (typeof window === 'undefined') return 'phone'
  if (window.matchMedia(PHONE_QUERY).matches) return 'phone'
  if (window.matchMedia(TABLET_QUERY).matches) return 'tablet'
  return 'desktop'
}

export function useBreakpointLayout() {
  const screens = Grid.useBreakpoint()
  const [viewport, setViewport] = useState<ViewportTier>(readViewportTier)

  useEffect(() => {
    const phoneMq = window.matchMedia(PHONE_QUERY)
    const tabletMq = window.matchMedia(TABLET_QUERY)
    const desktopMq = window.matchMedia('(min-width: 992px)')

    const syncViewport = () => setViewport(readViewportTier())

    syncViewport()
    phoneMq.addEventListener('change', syncViewport)
    tabletMq.addEventListener('change', syncViewport)
    desktopMq.addEventListener('change', syncViewport)

    return () => {
      phoneMq.removeEventListener('change', syncViewport)
      tabletMq.removeEventListener('change', syncViewport)
      desktopMq.removeEventListener('change', syncViewport)
    }
  }, [])

  const isPhone = viewport === 'phone'
  const isTablet = viewport === 'tablet'
  const isDesktop = viewport === 'desktop'
  /** Mobile + tablet: menu em drawer, layout compacto. */
  const isMobile = !isDesktop
  const isCompact = isMobile

  const contentPadding = isPhone
    ? CONTENT_PADDING_MOBILE
    : isTablet
      ? CONTENT_PADDING_TABLET
      : CONTENT_PADDING_DESKTOP

  const modalWidth = isPhone ? 'calc(100vw - 32px)' : isTablet ? 560 : 640

  const modalStyle: CSSProperties | undefined = isPhone
    ? { top: 16, maxWidth: 'calc(100vw - 32px)', margin: '0 auto', paddingBottom: 0 }
    : isTablet
      ? { maxWidth: 'calc(100vw - 48px)' }
      : undefined

  const modalStyles = {
    body: {
      maxHeight: isPhone ? 'calc(100dvh - 120px)' : 'calc(100vh - 120px)',
      overflowY: 'auto' as const,
    },
  }

  const gridGutter: [number, number] = isPhone ? [0, 8] : isTablet ? [12, 12] : [16, 16]
  const sectionGutter: [number, number] = isPhone ? [0, 8] : isTablet ? [12, 10] : [16, 12]
  const layoutGutter = isPhone ? 0 : isTablet ? 16 : 24

  return {
    screens,
    viewport,
    isPhone,
    isTablet,
    isDesktop,
    isMobile,
    isCompact,
    contentPadding,
    modalWidth,
    modalStyle,
    modalStyles,
    gridGutter,
    sectionGutter,
    layoutGutter,
  }
}
