export interface User {
  id: number
  email: string
  username: string
}

export interface Session {
  user?: User
}
