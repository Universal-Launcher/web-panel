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
            <NavLink href="/">Universal-Launcher</NavLink>
          </div>

          <div className={classNames(styles.rightNav, styles.nav)}>
            <NavLink href="/">{t("navbar.home")}</NavLink>

            <NavLink href="/#">{t("navbar.about")}</NavLink>
            <NavLink href="/#">{t("navbar.download")}</NavLink>

            <ThemeToggler />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
