import { combineReducers } from "redux"
import { globalReducer } from "./reducers/global"

const reducers = {
  global: globalReducer,
}

export default combineReducers(reducers)
