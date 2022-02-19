import React from "react"
import "../styles/globals.css"
import type { AppProps } from "next/app"
import { appWithTranslation } from "next-i18next"
import i18nextConfig from "../../next-i18next.config"
import { Provider } from "react-redux"
import { useStore } from "../store"
import { ThemeProvider } from "next-themes"

function App({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState)

  return (
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="system">
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  )
}

export default appWithTranslation(App, i18nextConfig)
