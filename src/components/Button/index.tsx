import React, { Component } from "react"
import { IconProps } from "react-feather"
import styles from "./styles.module.css"

interface ButtonProps {
  onClicked?: () => void
  children?: React.ReactNode
  icon?: React.FC<IconProps>
}

function Button({ children, icon }: ButtonProps) {
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
    <button className={styles.button}>
      {showIcon()}
      {children}
    </button>
  )
}

export default Button
