import { GetStaticProps } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"
import React from "react"
import { useTranslation } from "react-i18next"

function ClientPanel() {
  const { t } = useTranslation("clientpanel")
  return (
    <>
      <Head>
        <title>{t("login.title")}</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Web panel</h1>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ["main", "clientpanel"])),
  },
})

export default ClientPanel
