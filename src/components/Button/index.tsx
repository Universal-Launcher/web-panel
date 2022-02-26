import React, { ButtonHTMLAttributes } from "react"
import { IconProps } from "react-feather"
import styles from "./styles.module.css"

interface ButtonProps {
  onClicked?: () => void
  children?: React.ReactNode
  icon?: React.FC<IconProps>,
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"]
}

function Button({ children, icon, type }: ButtonProps) {
  const showIcon = () => {
    if (icon) {
      return React.createElement(
        icon,
        {
          className: styles.icon,
        },
        null
      )
    }
  }

  return (
    <button className={styles.button} type={type || "button"}>
      {showIcon()}
      {children}
    </button>
  )
}

export default Button
