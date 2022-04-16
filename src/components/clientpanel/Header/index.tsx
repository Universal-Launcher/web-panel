import React, { useState } from "react"
import styles from "./styles.module.css"
import { Menu } from "react-feather"

interface HeaderProps {
  sidebarOpen: boolean
  setSidebarOpen: (value: boolean) => void
}

function Header({ sidebarOpen, setSidebarOpen }: HeaderProps) {
  const [searchModalOpen, setSearchModalOpen] = useState(false)

  return (
    <header className={styles.header}>
      <div>
        <div>
          {/* Header: Left side */}
          <div className={styles.headerLeft}>
            {/* Hamburger button */}
            <button
              className={styles.burgerBtn}
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <span>Open Sidebar</span>
              <Menu className={styles.burgerIcon} />
            </button>
          </div>

          {/* Header: Right side */}
          <div className={styles.headerRight}></div>
        </div>
      </div>
    </header>
  )
}

export default Header
