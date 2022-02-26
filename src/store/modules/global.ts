/**
 * Gobal module store will allow us to shared appplication data through the whole application
 */

interface Action<T extends string> {
  type: T
}

interface ActionWithPayload<T extends string, P> extends Action<T> {
  payload: P
}

export function typedAction<T extends string>(type: T): { type: T }
export function typedAction<T extends string, P>(type: T, payload: P): { type: T; payload: P }
export function typedAction(
  type: string,
  payload?: unknown
): Action<string> | ActionWithPayload<string, unknown> {
  return { type, payload }
}

export interface GlobalState {}

const initialState: GlobalState = {}

export function setGlobal(
  state: GlobalState
): ActionWithPayload<"global/SET_GLOBAL", typeof state> {
  return typedAction("global/SET_GLOBAL", state)
}

type GlobalAction = ReturnType<typeof setGlobal>

export function globalReducer(state = initialState, actions: GlobalAction): GlobalState {
  switch (actions.type) {
    case "global/SET_GLOBAL":
      return {
        ...state,
        ...actions.payload,
      }

    default:
      return state
  }
}
