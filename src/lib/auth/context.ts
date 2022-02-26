import { AxiosResponse } from "axios"
import React from "react"
import { API, EmptyObject } from "../api"
import { ValidationErrors } from "../errors"
import { Session } from "./types"

export async function logout(): Promise<void> {
  await API.delete<EmptyObject>("/user/auth")
}

export async function login(email: string, password: string): Promise<AxiosResponse<Session>> {
  return await API.post<Session>("/user/auth", { email, password })
}

export async function getUser(): Promise<AxiosResponse<Session>> {
  return await API.get<Session>("/user/auth")
}

const AuthContext = React.createContext<{
  user: Session | undefined
  mutateUser: () => Promise<any>
  logout: () => Promise<void>
  login: (username: string, password: string) => Promise<AxiosResponse<Session>>
}>({
  user: undefined,
  mutateUser: async () => null,
  logout,
  login,
})

export default AuthContext