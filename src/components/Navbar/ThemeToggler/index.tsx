import { useTheme } from "next-themes"
import React from "react"
import { Sun, Moon } from "react-feather"
import styles from "./style.module.css"

function ThemeToggler() {
  const { theme, setTheme } = useTheme()

  const switchTheme = () => {
    const newTheme = theme == "light" ? "dark" : "light"

    setTheme(newTheme)
  }

  return (
    <button className={styles.toggler} onClick={switchTheme}>
      {theme === "light" ? <Sun /> : <Moon />}
    </button>
  )
}

export default ThemeToggler
