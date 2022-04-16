import React, { useEffect, useRef, useState } from "react"
import styles from "./styles.module.css"
import classNames from "classnames"
import { getLocalStorage } from "../../../utils/helpers"
import { ArrowLeft, Download, Upload } from "react-feather"
import SidebarItem from "./Item"

interface SidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (value: boolean) => void
}

function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const lStorage = getLocalStorage()

  const trigger = useRef<HTMLButtonElement>(null)
  const sidebar = useRef<HTMLDivElement>(null)

  const storedSidebarExpanded = lStorage?.getItem("sidebar-expanded")
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  )

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return
      if (
        !sidebarOpen ||
        sidebar.current.contains(target as Node) ||
        trigger.current.contains(target as Node)
      )
        return
      setSidebarOpen(false)
    }
    document.addEventListener("click", clickHandler)
    return () => document.removeEventListener("click", clickHandler)
  })

  // close if the escape key is pressed
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== "Escape") return
      setSidebarOpen(false)
    }
    document.addEventListener("keydown", keyHandler)
    return () => document.removeEventListener("keydown", keyHandler)
  })

  // save the state of the sidebar
  useEffect(() => {
    if (!lStorage) return
    lStorage.setItem("sidebar-expanded", sidebarExpanded.toString())
    if (sidebarExpanded) {
      document.body.classList.add("sidebar-expanded")
    } else {
      document.body.classList.remove("sidebar-expanded")
    }
  }, [sidebarExpanded, lStorage])

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={classNames(styles.mobileSidebar, { [styles.open]: sidebarOpen })}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={classNames(styles.sidebar, {
          [styles.open]: sidebarOpen,
        })}
      >
        {/* Sidebar header */}
        <header>
          {/* Close button */}
          <button
            ref={trigger}
            className={styles.closeBtn}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span>Close sidebar</span>
            <ArrowLeft className={styles.closeIcon} />
          </button>
        </header>

        {/* Links */}
        <div className={styles.content}>
          {/* Page group */}
          <div>
            <h3 className={styles.mainTitle}>
              <span aria-hidden="true">•••</span>
              <span>Pages</span>
            </h3>

            <ul>
              <SidebarItem path="/">coucou</SidebarItem>
            </ul>
          </div>
        </div>

        {/* Expand / collapse button */}
        <div className={styles.expandContainer}>
          <div className="px-3 py-2">
            <button
              className={styles.expandBtn}
              onClick={() => setSidebarExpanded(!sidebarExpanded)}
            >
              <span className="sr-only">Expand / collapse sidebar</span>
              {sidebarExpanded ? <Download /> : <Upload />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
