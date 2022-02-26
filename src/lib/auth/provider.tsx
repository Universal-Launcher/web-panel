import { useRouter } from "next/router"
import React from "react"
import useSWR from "swr"
import { Session } from "./types"
import { useAuth } from "./hooks"
import AuthContext from "./context"

function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: user, mutate: mutateUser } = useSWR<Session>("/api/user")
  const auth = useAuth()

  const { push, pathname, query } = useRouter()

  const logout = async () => {
    await auth.logout()
    push("/")
  }

  return (
    <AuthContext.Provider value={{ user, mutateUser, logout, login: auth.login }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
