import cookie from "cookie"
import { AppContext } from "next/app"
import { NextRequest } from "next/server"
import combineURLs from "./api/helpers/combineURLs"

export type EmptyObject = Record<string, never>
interface FetcherOptions {
  method?: "get" | "GET" | "post" | "POST" | "put" | "PUT" | "delete" | "DELETE"
  body?: any
  context?: NextRequest
}

export async function fetcher<T>(url: string, options?: FetcherOptions): Promise<T> {
  const u = combineURLs(process.env.NEXT_PUBLIC_API_URL, url)

  let xsrf: string = ""

  if (typeof document !== "undefined") {
    xsrf = cookie.parse(document.cookie)["universal-launcher-csrf"]
  } else {
    if (options?.context) {
      xsrf = options.context.cookies["universal-launcher-csrf"]
    }
  }

  try {
    const response = await fetch(u, {
      method: options?.method || "GET",
      body: options?.body ? JSON.stringify(options.body) : undefined,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": xsrf,
      },
    })

    if (!response.ok) {
      throw new APIError(response)
    } else if (response.status != 200) {
      throw new APIError(response)
    }

    return (await response.json()) as T
  } catch (error) {
    throw error
  }
}

export class APIError extends Error {
  public isFetcherError = true
  public response: Response

  constructor(response: Response) {
    super(response.statusText)
    this.response = response
    this.name = "APIError"
  }
}
