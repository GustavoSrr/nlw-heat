import React, { createContext, ReactNode, useContext, useEffect, useState } from "react"

import { api } from "../services/api"
import * as AuthSession from 'expo-auth-session'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { GITHUB_CLIENT_ID } from '@env'

type User = {
  name: string;
  login: string;
  avatar_url: string;
  id: string;
}

type AuthContextData = {
  user: User | null;
  isSigningIn: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextData)

type AuthProvider = {
  children: ReactNode;
}

type AuthResponse = {
  token: string;
  user: User;
}

type AuthorizationResponse = {
  params: {
    code?: string;
    error?: string;
  }
  type?: string;
}

export function AuthProvider(props: AuthProvider) {
  const [isSigningIn, setIsSigningIn] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  async function signIn() {
    try {
      setIsSigningIn(true);
      const authUrl = `https://github.com/login/oauth/authorize?scope=read:user&client_id=${GITHUB_CLIENT_ID}`
      const authSessionResponse = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse

      if (authSessionResponse.type === 'success' && authSessionResponse.params.error !== 'access_denied') {
        const response = await api.post<AuthResponse>('authenticate', {
          code: authSessionResponse.params.code
        })
        const { user, token } = response.data

        api.defaults.headers.common['Authorization'] = `Bearer ${token}`

        await AsyncStorage.setItem('@dowhile:user', JSON.stringify(user))
        await AsyncStorage.setItem('@dowhile:token', token)

        setUser(user);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSigningIn(false);
    }
  }

  async function signOut() {
    setUser(null)
    await AsyncStorage.removeItem('@dowhile:token')
    await AsyncStorage.removeItem('@dowhile:user')
  }

  useEffect(() => {
    async function loadData() {
      const tokenStorage = await AsyncStorage.getItem('@dowhile:token')
      const userStorage = await AsyncStorage.getItem('@dowhile:user')

      if(tokenStorage && userStorage) {
        api.defaults.headers.common['Authorization'] = `Bearer ${tokenStorage}`
        setUser(JSON.parse(userStorage))
      }

      setIsSigningIn(false)
    }

    loadData()
  }, [])

  return (
    <AuthContext.Provider value={{ user, isSigningIn, signIn, signOut }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const value = useContext(AuthContext)
  return value
}