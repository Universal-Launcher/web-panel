import { useTheme } from "next-themes"
import React from "react"
import { Sun, Moon } from "react-feather"
function ThemeToggler() {
  const { theme, setTheme } = useTheme()

  const switchTheme = () => {
    const newTheme = theme == "light" ? "dark" : "light"

    setTheme(newTheme)
  }

  return (
    <button
      className="px-4 hover:text-orange-600 transition-colors duration-100 ease-out"
      onClick={switchTheme}
    >
      {theme === "light" ? <Sun /> : <Moon />}
    </button>
  )
}

export default ThemeToggler
