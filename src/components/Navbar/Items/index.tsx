import Link from "next/link"
import React from "react"
import styles from "./style.module.css"

interface NavLinkProps {
  href: string
  children?: React.ReactNode
}

function NavLink({ href, children }: NavLinkProps) {
  return (
    <Link href={href}>
      <a className={styles.navlink}>{children}</a>
    </Link>
  )
}

export default NavLink
