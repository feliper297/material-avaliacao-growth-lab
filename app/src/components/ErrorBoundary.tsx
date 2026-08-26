import { Component, type ErrorInfo, type ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Growth Lab render error:', error, info.componentStack)
  }

  render() {
    if (this.state.error) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'grid',
            placeItems: 'center',
            padding: 24,
            fontFamily: 'system-ui, sans-serif',
            background: '#f5f5f5',
          }}
        >
          <div
            style={{
              maxWidth: 520,
              background: '#fff',
              border: '1px solid #ffd591',
              borderRadius: 8,
              padding: 24,
            }}
          >
            <h1 style={{ marginTop: 0, fontSize: 20 }}>Erro ao carregar o app</h1>
            <p style={{ color: '#595959' }}>
              Algo impediu a interface de abrir. Tente recarregar a página (Ctrl+Shift+R).
            </p>
            <pre
              style={{
                fontSize: 12,
                overflow: 'auto',
                background: '#fafafa',
                padding: 12,
                borderRadius: 4,
              }}
            >
              {this.state.error.message}
            </pre>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
