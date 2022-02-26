import React from "react"
import styles from "./styles.module.css"

interface PasswordCheckerProps {
  password: string
  onCheckChanged: (valid: boolean) => void
}

function PasswordChecker(props: PasswordCheckerProps) {
  return (
    <>
      <div className={styles.passwordChecker}></div>
      <div className={styles.checkText}></div>
    </>
  )
}

export default PasswordChecker
