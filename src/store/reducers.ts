import { combineReducers } from "redux"
import { globalReducer } from "./modules/global"

const reducers = {
  global: globalReducer,
}

export default combineReducers(reducers)
