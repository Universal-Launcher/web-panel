import React from "react"
import { fetcher } from "../api"
import { Session } from "./types"

export async function logout(): Promise<void> {
  return await fetcher("/user/auth", {
    method: "delete",
  })
}

export async function login(email: string, password: string): Promise<Session> {
  return await fetcher<Session>("/user/auth", {
    method: "post",
    body: {
      email,
      password,
    },
  })
}

interface RegisterParams {
  username: string
  email: string
  password: string
  confirmation: string
}

export async function register(params: RegisterParams): Promise<Session> {
  return await fetcher<Session>("/user/auth/create", {
    method: "post",
    body: params,
  })
}

export async function getUser(): Promise<Session> {
  return await fetcher<Session>("/user/auth")
}

const AuthContext = React.createContext<{
  user: Session | undefined
  mutateUser: () => Promise<any>
  logout: () => Promise<void>
  login: (username: string, password: string) => Promise<Session>
  register: (params: RegisterParams) => Promise<Session>
  getUser: () => Promise<Session>
}>({
  user: undefined,
  mutateUser: async () => null,
  logout,
  login,
  register,
  getUser,
})

export default AuthContext
