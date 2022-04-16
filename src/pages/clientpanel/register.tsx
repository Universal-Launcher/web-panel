import { GetStaticProps } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"
import Link, { LinkProps } from "next/link"
import { useRouter } from "next/router"
import React, { useEffect } from "react"
import { UserPlus } from "react-feather"
import { Trans, useTranslation } from "react-i18next"
import Alert from "../../components/common/Alert"
import Button from "../../components/common/Button"
import Footer from "../../components/base/Footer"
import Input from "../../components/common/form/Input"
import PasswordChecker from "../../components/common/form/PasswordChecker"
import { ErrorObject, isValidationError, parseValidationErrors } from "../../utils/errors"

import styles from "../../styles/pages/clientpanel/Register.module.css"
import { registerUser } from "../../store/actions/auth"
import isApiError from "../../utils/api/helpers/isFetcherError"

function Register() {
  const { t } = useTranslation("clientpanel")
  const router = useRouter()

  const [formData, setFormData] = React.useState({
    email: "",
    username: "",
    password: "",
    confirmation: "",
  })

  const [isFormValid, setIsFormValid] = React.useState(false)
  const [isPasswordValid, setIsPasswordValid] = React.useState(false)

  useEffect(() => {
    setIsFormValid(
      formData.email.length > 0 &&
        formData.username.length > 0 &&
        formData.password.length > 0 &&
        isPasswordValid &&
        formData.password === formData.confirmation
    )
  }, [formData, isPasswordValid])

  const [errors, setErrors] = React.useState<ErrorObject | undefined>(undefined)

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await registerUser(formData)()
      setErrors(undefined)

      if (router.query.redirect && typeof router.query.redirect === "string") {
        router.push(router.query.redirect)
      } else {
        router.push("/clientpanel/")
      }
    } catch (error) {
      if (isApiError(error)) {
        const errs = await error.response.json()
        if (isValidationError(error.response.status, errs)) {
          setErrors(parseValidationErrors(errs))
        } else {
          if (errs?.error) {
            const errors: ErrorObject = {}
            errors["main"] = [errs.error]
            setErrors(errors)
          }
        }
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
        <title>{t("register.title")}</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="page-container">
        <section className={styles.middleSection}>
          <form className={styles.box} onSubmit={handleFormSubmit}>
            <h1 className={styles.title}>{t("register.title")}</h1>

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
              id="username"
              label={t("register.username")}
              type="username"
              name="username"
              value={formData.username}
              autoComplete="username"
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              errors={errors ? errors["username"] : undefined}
            />

            <Input
              id="email"
              label={t("register.email")}
              type="email"
              name="email"
              value={formData.email}
              autoComplete="email"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              errors={errors ? errors["email"] : undefined}
            />

            <Input
              id="password"
              label={t("register.password")}
              type="password"
              name="new-password"
              value={formData.password}
              autoComplete="new-password"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              errors={errors ? errors["password"] : undefined}
            >
              <PasswordChecker
                password={formData.password}
                onCheckChanged={(isValid) => setIsPasswordValid(isValid)}
              />
            </Input>

            <Input
              id="confirmation"
              label={t("register.confirmation")}
              type="password"
              name="confirmation"
              autoComplete="new-password"
              value={formData.confirmation}
              onChange={(e) => setFormData({ ...formData, confirmation: e.target.value })}
              errors={errors ? errors["confirmation"] : undefined}
            />

            <Button icon={UserPlus} type="submit" disabled={!isFormValid}>
              {t("register.submitBtn")}
            </Button>

            <p className={styles.registerTips}>
              <Trans t={t} i18nKey="register.already_account">
                Already have an account ? <NextLnk href="/clientpanel/login">Login</NextLnk>
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
    layout: "default",
  },
})

export default Register
