import React from "react"
import "../styles/globals.css"
import type { AppProps } from "next/app"
import { Provider } from "react-redux"
import { useStore } from "../store"
import { ThemeProvider } from "next-themes"
import PanelLayout from "../components/layouts/PanelLayout"
import { LayoutProps, Layouts } from "../layouts"
import i18nextConfig from "../../next-i18next.config"
import { appWithTranslation } from "next-i18next"

function App({ Component, pageProps, router }: AppProps) {
  const store = useStore(pageProps.initialReduxState)

  let page: JSX.Element

  if ((pageProps as LayoutProps).layout === Layouts.CLIENTPANEL) {
    page = (
      <PanelLayout>
        <Component {...pageProps} />
      </PanelLayout>
    )
  } else {
    page = <Component {...pageProps} />
  }

  return (
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="system">
        {page}
      </ThemeProvider>
    </Provider>
  )
}

export default appWithTranslation(App, i18nextConfig)
