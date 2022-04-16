import { GetStaticProps } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"
import React from "react"
import { Download } from "react-feather"
import { useTranslation } from "react-i18next"
import Button from "../components/common/Button"
import Footer from "../components/base/Footer"
import Navbar from "../components/base/Navbar"

import styles from "../styles/pages/Download.module.css"

function About() {
  const { t } = useTranslation()
  return (
    <>
      <Head>
        <title>{t("download.title")}</title>
        <meta name="description" content={t("download.description")} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="page-container">
        <section className={styles.headerSection}>
          <Button icon={Download}>{t("download.button")}</Button>
        </section>
      </main>

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
