import React from "react"
import { useTranslation } from "react-i18next"
import NavLink from "./Items"
import ThemeToggler from "./ThemeToggler"
import styles from "./style.module.css"
import classNames from "classnames"

function Navbar() {
  const { t } = useTranslation("main")

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.flexbox}>
          <div className={styles.nav}>
            <NavLink href="/" ignoreActive={true}>
              Universal-Launcher
            </NavLink>
          </div>

          <div className={classNames(styles.rightNav, styles.nav)}>
            <NavLink href="/" strict={true}>
              {t("navbar.home")}
            </NavLink>

            <NavLink href="/about">{t("navbar.about")}</NavLink>
            <NavLink href="/download">{t("navbar.download")}</NavLink>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
