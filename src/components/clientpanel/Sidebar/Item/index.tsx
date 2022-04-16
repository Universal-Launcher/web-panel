import { useRouter } from "next/router"
import React from "react"
import styles from "./styles.module.css"
import classNames from "classnames"
import Link from "next/link"

interface SidebarItemProps {
  children: React.ReactNode
  icon?: React.ReactNode
  path: string
}

function SidebarItem({ children, path, icon }: SidebarItemProps) {
  const { pathname } = useRouter()
  const p = path.substring(1, path.length)

  return (
    <li
      className={classNames(styles.item, {
        [styles.active]: pathname === `/clientpanel${p}`,
      })}
    >
      <Link href={`/clientpanel${p}`} passHref>
        <a>{children}</a>
      </Link>
    </li>
  )
}

export default SidebarItem
