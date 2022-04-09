import { Reducer } from "react"
import { User } from "../../typings/auth"
import { FETCH_USER, LOGIN_USER, LOGOUT_USER } from "../constants/auth"

export interface AuthState {
  user?: User
}

export interface AuthAction {
  type: string
  payload?: any
}

const initialState: AuthState = {}

export const globalReducer: Reducer<AuthState, AuthAction> = (
  state = initialState,
  action = { type: "" }
) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, ...action.payload }
    case LOGOUT_USER:
      return { ...state, user: undefined }
    case FETCH_USER:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
