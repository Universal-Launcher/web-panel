import classNames from "classnames"
import React from "react"
import { useTranslation } from "react-i18next"
import styles from "./styles.module.css"

interface InputProps {
  id: string
  label: string
  type?: React.HTMLInputTypeAttribute
  errors?: string[]
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function Input({ id, label, type, errors, value, onChange }: InputProps) {
  const { t } = useTranslation("clientpanel")

  return (
    <div className={classNames(styles.input, { [styles.error]: !!errors })}>
      <label htmlFor={id}>{label}</label>
      <input type={type || "text"} id={id} placeholder={label} value={value} onChange={onChange} />

      {errors
        ? errors.map((e, index) => (
            <p key={index} className={styles.errorMsg}>
              {t(e)}
            </p>
          ))
        : undefined}
    </div>
  )
}

export default Input
