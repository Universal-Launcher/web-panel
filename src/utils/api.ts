import axios from "axios"

export const Axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

export async function fetcher<T>(url: string): Promise<T> {
  return await Axios.get(url).then((res) => res.data)
}
