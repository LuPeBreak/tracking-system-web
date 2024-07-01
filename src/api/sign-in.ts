import { api } from '@/lib/axios'

export interface SignInBody {
  email: string
  password: string
}

export interface SignInResponse {
  token: string
}

export async function signIn({ email, password }: SignInBody) {
  const token = await api.post<SignInResponse>('sessions/password', { email,password })
  return token
}
