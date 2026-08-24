export type AppRole = 'admin' | 'learner'

export interface AuthSubject {
  userId: string
  role: AppRole
}

export class AuthorizationError extends Error {
  readonly status: 401 | 403

  constructor(status: 401 | 403, message: string) {
    super(message)
    this.status = status
    this.name = 'AuthorizationError'
  }
}

export function isAdmin(subject: AuthSubject): boolean {
  return subject.role === 'admin'
}

/** Participante só acessa o próprio recurso; admin acessa qualquer learner. */
export function canAccessLearnerData(subject: AuthSubject, learnerId: string): boolean {
  if (isAdmin(subject)) return true
  return subject.userId === learnerId
}

export function assertAuthenticated(subject: AuthSubject | null): asserts subject is AuthSubject {
  if (!subject) {
    throw new AuthorizationError(401, 'Usuário não autenticado.')
  }
}

export function assertAdmin(subject: AuthSubject): void {
  if (!isAdmin(subject)) {
    throw new AuthorizationError(403, 'Ação permitida apenas para administrador.')
  }
}

export function assertLearnerAccess(subject: AuthSubject, learnerId: string): void {
  if (!canAccessLearnerData(subject, learnerId)) {
    throw new AuthorizationError(403, 'Sem permissão para acessar dados deste participante.')
  }
}
