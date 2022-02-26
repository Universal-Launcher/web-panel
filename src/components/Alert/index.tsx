import React from "react"
import styles from "./styles.module.css"
import { Info, AlertTriangle, XCircle, CheckCircle, X } from "react-feather"
import classNames from "classnames"

interface AlertProps {
  type: "info" | "error" | "success" | "warning"
  label: string
  dimissible?: boolean
  onDimiss?: () => void
}

function Alert(props: AlertProps) {
  const showIcon = () => {
    switch (props.type) {
      case "info":
        return <Info className={styles.icon} />
      case "error":
        return <XCircle className={styles.icon} />
      case "success":
        return <CheckCircle className={styles.icon} />
      case "warning":
        return <AlertTriangle className={styles.icon} />
    }
  }

  return (
    <div className={classNames(styles.alert, styles[`alert-${props.type}`])}>
      <div className={styles.content}>
        {showIcon()}
        {props.label}
      </div>
      {props.dimissible && (
        <button type="button" className={styles.closeBtn} onClick={props.onDimiss}>
          <span className="sr-only">Dimiss</span>
          <X className={styles.closeIcon} />
        </button>
      )}
    </div>
  )
}

export default Alert
