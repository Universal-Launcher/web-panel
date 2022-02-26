import axios from "axios"

export type EmptyObject = Record<string, never>

export const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

export async function fetcher<T>(url: string): Promise<T> {
  return await API.get(url).then((res) => res.data)
}
