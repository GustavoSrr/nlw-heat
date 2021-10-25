import { createContext, ReactNode, useEffect, useState } from "react";

import { api } from "../services/api";
import 'dotenv/config'

type User = {
  name: string;
  login: string;
  avatar_url: string;
  id: string;
}

type AuthContextData = {
  user: User | null;
  signInUrl: string;
  signOut: () => void;
}

export const AuthContext = createContext({} as AuthContextData)

type AuthProvider = {
  children: ReactNode;
}

type AuthResponse = {
  token: string;
  user: {
    name: string;
    login: string;
    avatar_url: string;
    id: string;
  }
}

export function AuthProvider(props: AuthProvider) {
  const [user, setUser] = useState<User | null>(null)

  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=${process.env.GITHUB_CLIENT_ID}`

  async function signIn(gitHubCode: string) {
    const response = await api.post<AuthResponse>('authenticate', {
      code: gitHubCode
    })

    const { token, user } = response.data
    localStorage.setItem('@dowhile:token', token)

    api.defaults.headers.common.authorization = `Bearer ${token}`

    setUser(user)
  }

  async function signOut() {
    setUser(null)
    localStorage.removeItem('@dowhile:token')
  }

  useEffect(() => {
    const token = localStorage.getItem('@dowhile:token')

    if(token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`
      api.get<User>('profile').then(response => {
        setUser(response.data)
      })
    }
  }, [])

  useEffect(() => {
    const url = window.location.href
    const hasGitHubCode = url.includes('?code=')
    if(hasGitHubCode) {
      const [urlWithoutCode, gitHubCode] = url.split('?code=')

      window.history.pushState({}, '', urlWithoutCode)
      signIn(gitHubCode)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, signInUrl, signOut }}>
      {props.children}
    </AuthContext.Provider>
  )
}