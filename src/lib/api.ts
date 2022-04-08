import axios, { Method } from "axios"

export type EmptyObject = Record<string, never>

interface FetcherOptions {
  method: Method
  body?: any
}

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  xsrfCookieName: "universal-launcher-csrf",
  headers: {
    "Content-Type": "application/json",
  },
})

export async function fetcher<T>(url: string, options?: FetcherOptions): Promise<T> {
  const response = await API.request<T>({
    url,
    method: options?.method || "GET",
    data: options?.body || undefined,
  })

  return response.data
}
