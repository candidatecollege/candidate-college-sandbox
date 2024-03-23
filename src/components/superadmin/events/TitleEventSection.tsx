// Import Package
import React from "react"

// Data Types
interface TitleEventSectionProps {
  title: string,
  Icon: React.FC<React.SVGAttributes<SVGAElement>>
  onClick: () => void
}

// Component
const TitleEventSection: React.FC<TitleEventSectionProps> = ({
  title,
  Icon,
  onClick
}) => {
  return (
    <div className="flex flex-row items-center justify-between">
      {/* Title */}
      <div className="flex flex-row items-center gap-2">
        <div className="text-xl">{title}</div>
        <Icon width="21" height="21" stroke="#FFFFFF" />
      </div>
      {/* View All */}
      <div className="text-sm text-white/[.56] cursor-pointer" onClick={onClick} title="Click to view all">
        View All
      </div>
    </div>
  )
}

// Export Component
export default TitleEventSection