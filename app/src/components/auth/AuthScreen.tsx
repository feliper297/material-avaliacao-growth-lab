import { useState } from 'react'
import { ForgotPasswordScreen } from './ForgotPasswordScreen'
import { LoginScreen } from './LoginScreen'

type AuthView = 'login' | 'forgot'

export function AuthScreen() {
  const [view, setView] = useState<AuthView>('login')

  if (view === 'forgot') {
    return <ForgotPasswordScreen onBack={() => setView('login')} />
  }

  return <LoginScreen onForgotPassword={() => setView('forgot')} />
}
