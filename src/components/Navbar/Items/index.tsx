import Link from "next/link"
import React from "react"

interface NavLinkProps {
  href: string
  children?: React.ReactNode
}

function NavLink({ href, children }: NavLinkProps) {
  return (
    <Link href={href}>
      <a className="px-4 hover:text-orange-600 transition-colors duration-100 ease-in-out">
        {children}
      </a>
    </Link>
  )
}

export default NavLink
