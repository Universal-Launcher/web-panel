import combineURLs from "./helpers/combineURLs"
import isAbsoluteURL from "./helpers/isAbsoluteURL"

export default function buildFulPath(baseURL: string, requestedURL: string) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL)
  }
  return requestedURL
}
