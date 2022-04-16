export function getLocalStorage(): Storage | undefined {
  if (typeof window !== "undefined") {
    return window.localStorage
  }
  return undefined
}
