import { GetStaticProps } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"
import Link, { LinkProps } from "next/link"
import React from "react"
import { UserPlus } from "react-feather"
import { Trans, useTranslation } from "react-i18next"
import Alert from "../../components/Alert"
import Button from "../../components/Button"
import Footer from "../../components/Footer"
import Input from "../../components/form/Input"
import PasswordChecker from "../../components/form/PasswordChecker"
import { ErrorObject } from "../../lib/errors"

import styles from "../../styles/pages/clientpanel/Register.module.css"

function Register() {
  const { t } = useTranslation("clientpanel")

  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [confirmation, setConfirmation] = React.useState("")
  const [errors, setErrors] = React.useState<ErrorObject | undefined>(undefined)

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrors(undefined)
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
              id="email"
              label={t("register.email")}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              errors={errors ? errors["email"] : undefined}
            />

            <Input
              id="password"
              label={t("register.password")}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              errors={errors ? errors["password"] : undefined}
            >
              <PasswordChecker
                password={password}
                onCheckChanged={(isValid) => {
                  console.log(isValid)
                }}
              />
            </Input>

            <Input
              id="confirmation"
              label={t("register.confirmation")}
              type="password"
              value={confirmation}
              onChange={(e) => setConfirmation(e.target.value)}
              errors={errors ? errors["confirmation"] : undefined}
            />

            <Button icon={UserPlus} type="submit">
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
