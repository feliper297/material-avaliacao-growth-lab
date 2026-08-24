import { Grid } from 'antd'
import type { CSSProperties } from 'react'

export const MOBILE_BREAKPOINT = 'lg' as const
export const SIDEBAR_WIDTH = 280
export const CONTENT_PADDING_DESKTOP = 32
export const CONTENT_PADDING_MOBILE = 16

export function useBreakpointLayout() {
  const screens = Grid.useBreakpoint()
  const isMobile = !screens[MOBILE_BREAKPOINT]
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

  return {
    screens,
    isMobile,
    isTablet,
    isCompact,
    contentPadding,
    modalWidth,
    modalStyle,
    modalStyles,
  }
}
