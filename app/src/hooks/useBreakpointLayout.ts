import { Grid } from 'antd'
import { useEffect, useState, type CSSProperties } from 'react'

/** Viewports abaixo de 992px usam drawer em vez da sidebar fixa. */
export const SIDEBAR_COLLAPSE_QUERY = '(max-width: 991px)'
export const MOBILE_BREAKPOINT = 'lg' as const
export const SIDEBAR_WIDTH = 280
export const CONTENT_PADDING_DESKTOP = 32
export const CONTENT_PADDING_MOBILE = 16

function readIsMobileLayout() {
  if (typeof window === 'undefined') return true
  return window.matchMedia(SIDEBAR_COLLAPSE_QUERY).matches
}

export function useBreakpointLayout() {
  const screens = Grid.useBreakpoint()
  const [isMobileLayout, setIsMobileLayout] = useState(readIsMobileLayout)

  useEffect(() => {
    const mediaQuery = window.matchMedia(SIDEBAR_COLLAPSE_QUERY)
    const syncLayout = () => setIsMobileLayout(mediaQuery.matches)

    syncLayout()
    mediaQuery.addEventListener('change', syncLayout)
    return () => mediaQuery.removeEventListener('change', syncLayout)
  }, [])

  const isMobile = isMobileLayout
  const isTablet = !isMobile && !screens.xl
  const isCompact = isMobile || isTablet
  const contentPadding = isMobile ? CONTENT_PADDING_MOBILE : CONTENT_PADDING_DESKTOP
  const modalWidth = isMobile ? '100%' : 640

  const modalStyle: CSSProperties | undefined = isMobile
    ? { top: 16, maxWidth: 'calc(100vw - 32px)' }
    : undefined

  const modalStyles = {
    body: {
      maxHeight: 'calc(100vh - 120px)',
      overflowY: 'auto' as const,
    },
  }

  const gridGutter: [number, number] = isMobile ? [8, 8] : [16, 16]
  const sectionGutter: [number, number] = isMobile ? [8, 12] : [16, 12]
  const layoutGutter = isMobile ? 12 : 24

  return {
    screens,
    isMobile,
    isTablet,
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
