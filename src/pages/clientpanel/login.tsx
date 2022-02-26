import { GetStaticProps } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"
import React from "react"
import { useTranslation } from "react-i18next"
import Footer from "../../components/Footer"

import styles from "../../styles/pages/clientpanel/Login.module.css"
import Input from "../../components/form/Input"
import Button from "../../components/Button"
import { LogIn } from "react-feather"
import { useAuth } from "../../lib/auth/hooks"
import { ErrorObject, isValidationError, parseValidationErrors } from "../../lib/errors"
import axios from "axios"
import Alert from "../../components/Alert"
import Link, { LinkProps } from "next/link"
import { Trans } from "next-i18next"

function Login() {
  const { t } = useTranslation("clientpanel")

  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [errors, setErrors] = React.useState<ErrorObject | undefined>(undefined)
  const auth = useAuth()

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrors(undefined)

    try {
      await auth.login(email, password)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (isValidationError(error.response)) {
          setErrors(parseValidationErrors(error.response?.data))
        } else {
          if (error.response?.data?.error) {
            const errors: ErrorObject = {}
            errors["main"] = [error.response.data.error]
            setErrors(errors)
          }
        }
      }
    }
  }

  const NextLnk = ({ href, children, ...props }: LinkProps & { children: React.ReactNode }) => {
    return (
      <Link href={href || ""}>
        <a className={styles.link}>{children}</a>
      </Link>
    )
  }

  return (
    <>
      <Head>
        <title>{t("login.title")}</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="page-container">
        <section className={styles.middleSection}>
          <form className={styles.box} onSubmit={handleFormSubmit}>
            <h1 className={styles.title}>{t("login.title")}</h1>

            {errors && errors["main"] ? (
              <Alert
                type="error"
                label={t(errors["main"][0])}
                dimissible={true}
                onDimiss={() => {
                  setErrors({
                    ...errors,
                    main: undefined,
                  })
                }}
              />
            ) : undefined}

            <Input
              id="email"
              label={t("login.email")}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              errors={errors ? errors["email"] : undefined}
            />

            <Input
              id="password"
              label={t("login.password")}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              errors={errors ? errors["password"] : undefined}
            />

            <Button icon={LogIn} type="submit">
              {t("login.submitBtn")}
            </Button>

            <p className={styles.registerTips}>
              <Trans t={t} i18nKey="login.no_account">
                Don't have an account ? <NextLnk href="/clientpanel/register">Register</NextLnk>
              </Trans>
            </p>
          </form>
        </section>
      </main>

      <Footer />
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ["main", "clientpanel"])),
  },
})

export default Login
