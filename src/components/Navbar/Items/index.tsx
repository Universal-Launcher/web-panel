import classNames from "classnames"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import styles from "./style.module.css"

interface NavLinkProps {
  href: string
  children?: React.ReactNode
  ignoreActive?: boolean
  strict?: boolean
}

function NavLink({ href, children, ignoreActive, strict }: NavLinkProps) {
  const router = useRouter()

  const isActive = () => {
    if (ignoreActive) return false
    else if (strict) {
      return router.pathname === href
    } else {
      return router.pathname.startsWith(href)
    }
  }

  return (
    <Link href={href}>
      <a
        className={classNames(styles.navlink, {
          [styles.active]: isActive(),
        })}
      >
        {children}
      </a>
    </Link>
  )
}

export default NavLink
