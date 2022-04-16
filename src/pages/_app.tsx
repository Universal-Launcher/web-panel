import React, { useEffect } from "react"
import "../styles/globals.css"
import type { AppProps } from "next/app"
import i18nextConfig from "../../next-i18next.config"
import { appWithTranslation } from "next-i18next"
import { SWRConfig } from "swr"
import { fetcher } from "../utils/api"
import { Provider } from "react-redux"
import { useStore } from "../store"
import PanelLayout from "../components/layouts/PanelLayout"
import { ThemeProvider } from "next-themes"
import { Layouts } from "../layouts"
import { useRouter } from "next/router"

function App({ pageProps, Component }: AppProps) {
  const store = useStore(pageProps.initialReduxState)
  fetcher("/")

  const { pathname } = useRouter()

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "auto"
    window.scroll({ top: 0 })
    document.documentElement.style.scrollBehavior = ""
  }, [pathname]) // triggered on route change

  let page: JSX.Element

  if (pageProps.layout === Layouts.CLIENTPANEL) {
    page = (
      <PanelLayout>
        <Component {...pageProps} />
      </PanelLayout>
    )
  } else {
    page = <Component {...pageProps} />
  }
  return (
    <SWRConfig value={{ fetcher: fetcher }}>
      <Provider store={store}>
        <ThemeProvider attribute="class" defaultTheme="system">
          {page}
        </ThemeProvider>
      </Provider>
    </SWRConfig>
  )
}

export default appWithTranslation(App, i18nextConfig)
