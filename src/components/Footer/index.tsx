import React from "react"
import { GitHub } from "react-feather"
import { Discord } from "@icons-pack/react-simple-icons"
import { Trans, useTranslation } from "react-i18next"
import Link from "next/link"
import className from "classnames"

import styles from "./styles.module.css"
import ThemeToggler from "../Navbar/ThemeToggler"

function Footer() {
  const { t } = useTranslation("main")

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <ul className={styles.topList}>
          <li>
            <Link href="/">{t("footer.links.home")}</Link>
          </li>
          <li>
            <Link href="/about">{t("footer.links.about")}</Link>
          </li>
          <li>
            <Link href="/clientpanel">{t("footer.client_panel")}</Link>
          </li>
          <li>
            <ThemeToggler />
          </li>
        </ul>
        <div className={styles.socialList}>
          <a href="#">
            <GitHub className={styles.icons} />
          </a>
          <a href="#">
            <Discord className={styles.icons} />
          </a>
        </div>
        <div className={styles.credits}>
          <p>
            <Trans i18nKey="footer.created_by" t={t}>
              Created by{" "}
              <a className="link" href="https://github.com/Universal-Launcher/">
                Universal-Launcher Organisation
              </a>
            </Trans>
          </p>

          <p>{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
