import { Dispatch } from "react"
import { fetcher } from "../../utils/api"
import { User } from "../../typings/auth"
import { LOGIN_USER, LOGOUT_USER } from "../constants/auth"
import { AuthAction, AuthState } from "../reducers/auth"

export function loginUser(email: string, password: string) {
  return async function (dispatch: Dispatch<any>) {
    let response: User

    try {
      response = await fetcher<User>("/user/auth", {
        method: "post",
        body: {
          email,
          password,
        },
      })
    } catch (error) {
      console.log((error as any).message)
      throw error
    }

    dispatch({
      type: LOGIN_USER,
      payload: {
        user: response,
      },
    })
  }
}

interface RegisterParams {
  username: string
  email: string
  password: string
  confirmation: string
}

export function registerUser(params: RegisterParams) {
  return async function () {
    try {
      await fetcher<void>("/user/auth/create", {
        method: "post",
        body: params,
      })
    } catch (error) {
      throw error
    }
  }
}

export function logoutUser() {
  return async function (dispatch: Dispatch<any>) {
    try {
      await fetcher<void>("/user/auth", {
        method: "delete",
      })
    } catch (error) {
      throw error
    }

    dispatch({
      type: LOGOUT_USER,
    })
  }
}

export function fetchUser() {
  return async function (dispatch: Dispatch<any>) {
    let response: User

    try {
      response = await fetcher<User>("/user/auth")
    } catch (error) {
      throw error
    }

    dispatch({
      type: LOGIN_USER,
      payload: {
        user: response,
      },
    })
  }
}
