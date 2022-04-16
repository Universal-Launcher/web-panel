import classNames from "classnames"
import React, { InputHTMLAttributes } from "react"
import { useTranslation } from "react-i18next"
import styles from "./styles.module.css"

interface InputProps {
  id: string
  label: string
  name?: string
  type?: React.HTMLInputTypeAttribute
  errors?: string[]
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  children?: React.ReactNode
  autoComplete?: InputHTMLAttributes<HTMLInputElement>["autoComplete"]
}

function Input({
  id,
  label,
  name,
  type,
  errors,
  value,
  onChange,
  children,
  autoComplete,
}: InputProps) {
  const { t } = useTranslation("clientpanel")

  return (
    <div className={classNames(styles.input, { [styles.error]: !!errors })}>
      <label htmlFor={id}>{label}</label>
      <input
        type={type || "text"}
        id={id}
        name={name}
        placeholder={label}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
      />

      {errors
        ? errors.map((e, index) => (
            <p key={index} className={styles.errorMsg}>
              {t(e)}
            </p>
          ))
        : undefined}

      {children}
    </div>
  )
}

export default Input
