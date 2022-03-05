import classNames from "classnames"
import React, { ButtonHTMLAttributes } from "react"
import { IconProps } from "react-feather"
import styles from "./styles.module.css"

interface ButtonProps {
  onClick?: () => void
  children?: React.ReactNode
  icon?: React.FC<IconProps>
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"]
  className?: string
  disabled?: boolean
}

function Button({ children, icon, type, className, onClick, disabled }: ButtonProps) {
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
    <button
      className={classNames(styles.button, className)}
      type={type || "button"}
      onClick={onClick}
      disabled={disabled}
    >
      {showIcon()}
      {children}
    </button>
  )
}

export default Button
