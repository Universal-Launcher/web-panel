import React, { useState } from "react"
import Header from "../clientpanel/Header"
import Sidebar from "../clientpanel/Sidebar"
import styles from "./panel.module.css"

interface LayoutProps {
  children?: React.ReactNode
}

function PanelLayout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className={styles.contentArea}>
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {children}
      </div>
    </div>
  )
}

export default PanelLayout
