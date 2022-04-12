import { GetStaticProps } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"
import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"
import Footer from "../../components/base/Footer"

import styles from "../../styles/pages/clientpanel/Login.module.css"
import Input from "../../components/form/Input"
import Button from "../../components/Button"
import { LogIn } from "react-feather"
import { ErrorObject, isValidationError, parseValidationErrors } from "../../utils/errors"
import Alert from "../../components/Alert"
import Link, { LinkProps } from "next/link"
import { Trans } from "next-i18next"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import { loginUser } from "../../store/actions/auth"
import isApiError from "../../utils/api/helpers/isFetcherError"

function Login() {
  const { t } = useTranslation("clientpanel")
  const router = useRouter()
  const dispatch = useDispatch()

  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [errors, setErrors] = React.useState<ErrorObject | undefined>(undefined)

  const [isFormValid, setIsFormValid] = React.useState(false)

  useEffect(() => {
    setIsFormValid(email.length > 0 && password.length > 0)
  }, [email, password])

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrors(undefined)

    try {
      await loginUser(email, password)(dispatch)

      if (router.query.redirect && typeof router.query.redirect === "string") {
        return router.push(router.query.redirect)
      } else {
        return router.push("/clientpanel")
      }
    } catch (error) {
      if (isApiError(error)) {
        const errs = await error.response.json()
        if (isValidationError(error.response)) {
          setErrors(parseValidationErrors(errs))
        } else {
          if (errs?.error) {
            const errors: ErrorObject = {}
            errors["main"] = [errs.error]
            setErrors(errors)
          }
        }
      } else {
        console.error(error)
      }
    }
  }

  const NextLnk = ({ href, children }: LinkProps & { children: React.ReactNode }) => {
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
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              errors={errors ? errors["email"] : undefined}
            />

            <Input
              id="password"
              label={t("login.password")}
              type="password"
              name="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              errors={errors ? errors["password"] : undefined}
            />

            <Button icon={LogIn} type="submit" disabled={!isFormValid}>
              {t("login.submitBtn")}
            </Button>

            <p className={styles.registerTips}>
              <Trans t={t} i18nKey="login.no_account">
                Doesn&#39;t have an account ?{" "}
                <NextLnk href="/clientpanel/register">Register</NextLnk>
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
    default: "default",
  },
})

export default Login
