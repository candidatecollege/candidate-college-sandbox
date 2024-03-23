// Import Package
import React from "react"

// Import Style
import border from "@/styles/border.module.css"

// Data Types
interface CardEventProps {
  total: number,
  title: string,
  Icon: React.FC<React.SVGAttributes<SVGElement>>
}

// Component
const CardEvent: React.FC<CardEventProps> = ({
  total,
  title,
  Icon
}) => {
  return (
    // Container
    <div className={`${border.border_graph} flex flex-row bg-[#0000008F] items-start p-5 rounded-[10px] w-[32%] justify-between`}>
      {/* Left Content */}
      <div className="flex flex-col gap-2">
        {/* Total Event */}
        <div className="text-4xl font-medium">{total}</div>
        {/* Type Event */}
        <div className="text-base font-normal">{title}</div>
      </div>
      {/* Right Content */}
      <div>
        {/* Icon */}
        <div className="flex bg-secondary p-4 pt-3 rounded-tr-[15px] rounded-br-[15px] rounded-tl-[15px] rounded-bl-[100px] items-center">
          <Icon width="24" height="24" stroke="#1B4E6B"/>
        </div>
      </div>
    </div>
  )
}

// Export Component
export default CardEvent