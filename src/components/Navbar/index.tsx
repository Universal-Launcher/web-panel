import React from "react"
import { useTranslation } from "react-i18next"
import NavLink from "./Items"
import ThemeToggler from "./ThemeToggler"

function Navbar() {
  const { t } = useTranslation("main")

  return (
    <nav className="border-b border-gray-300 dark:border-gray-700 md:mx-8">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between h-20">
          <div className="w-full justify-between flex">
            <NavLink href="/">Universal-Launcher</NavLink>

            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                <NavLink href="/">{t("navbar.home")}</NavLink>

                <NavLink href="/#">{t("navbar.about")}</NavLink>
                <NavLink href="/login">{t("navbar.login")}</NavLink>

                <ThemeToggler />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
