import React from "react"

interface LayoutProps {
  children?: React.ReactNode
}

function PanelLayout(props: LayoutProps) {
  return <div className="bg-red-400 px-8">{props.children}</div>
}

export default PanelLayout
