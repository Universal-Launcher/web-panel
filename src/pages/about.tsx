import { GetStaticProps } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"
import React from "react"
import { useTranslation } from "react-i18next"
import Footer from "../components/base/Footer"
import Navbar from "../components/base/Navbar"

function About() {
  const { t } = useTranslation()
  return (
    <>
      <Head>
        <title>{t("about.title")}</title>
        <meta name="description" content={t("about.description")} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="page-container"></main>

      <Footer />
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ["main"])),
  },
})

export default About
