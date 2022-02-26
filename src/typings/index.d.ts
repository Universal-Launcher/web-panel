import { LayoutProps } from "../layouts"

declare global {
  declare namespace NodeJS {
    export interface ProcessEnv {
      readonly NEXT_PUBLIC_API_URL: string
    }
  }
}
