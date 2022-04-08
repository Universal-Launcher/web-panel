import { Reducer } from "react"
import { SET_GLOBAL } from "../constants/global"

export interface GlobalState {}

export interface GlobalAction {
  type: string
  payload?: any
}

const initialState: GlobalState = {}

export const globalReducer: Reducer<GlobalState, GlobalAction> = (
  state = initialState,
  action = { type: "" }
) => {
  switch (action.type) {
    case SET_GLOBAL:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
