import React, { useEffect } from "react"
import styles from "./styles.module.css"
import zxcvbn from "zxcvbn"
import classNames from "classnames"
import { useTranslation } from "react-i18next"

interface PasswordCheckerProps {
  password: string
  onCheckChanged: (valid: boolean) => void
}

function PasswordChecker(props: PasswordCheckerProps) {
  const { t } = useTranslation("clientpanel")
  const [score, setScore] = React.useState(0)
  const [feedback, setFeedback] = React.useState<string[]>()

  useEffect(() => {
    const res = zxcvbn(props.password, [])
    setScore(res.score)
    const o: string[] = []

    o.push(...res.feedback.suggestions)
    if (res.feedback.warning.length > 0) {
      o.push(res.feedback.warning)
    }
    setFeedback(o)
    props.onCheckChanged(res.score > 2)
  }, [props.password, props])

  const showBars = () => {
    const bars = []

    for (let i = 1; i <= 4; i++) {
      bars.push(
        <div
          className={classNames(styles.item, { [styles[`colored-${score}`]]: i <= score })}
          key={i}
        />
      )
    }

    return bars
  }

  return (
    <div className={styles.checkContainer}>
      <div className={styles.passwordChecker}>{showBars()}</div>

      {props.password.length > 0 && score >= 0 && (
        <div className={classNames(styles.checkText, styles[`colored-${score}`])}>
          <p>{t(`errors.validation.password_checker.${score}`)}</p>

          <ul>{feedback && feedback.map((f, i) => <li key={i}>{f}</li>)}</ul>
        </div>
      )}
    </div>
  )
}

export default PasswordChecker
