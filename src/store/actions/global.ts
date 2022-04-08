import { SET_GLOBAL } from "../constants/global"
import { GlobalAction, GlobalState } from "../reducers/global"

export function setGlobal(payload: GlobalState): GlobalAction {
  return {
    type: SET_GLOBAL,
    payload,
  }
}
