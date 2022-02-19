import { useMemo } from "react"
import { applyMiddleware, createStore, Store } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import { createLogger } from "redux-logger"
import thunk from "redux-thunk"
import reducers from "./reducers"

export type RootState = ReturnType<typeof reducers>

let store: Store<RootState> | undefined

function initStore(initialState: RootState): Store<RootState> {
  const logger = createLogger()
  const middlewares = process.env.NODE_ENV === "production" ? [thunk] : [thunk, logger]
  return createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middlewares)))
}

export const initializeStore = (preloadedState: RootState) => {
  let _store = store ?? initStore(preloadedState)

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export function useStore(initialState: RootState) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}
