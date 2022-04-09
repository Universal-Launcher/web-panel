import { APIError } from "../../api"

function isObject(val: any) {
  return val !== null && typeof val === "object"
}
export default function isApiError(payload: any): payload is APIError {
  return isObject(payload) && payload.isFetcherError === true
}
