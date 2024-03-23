// Import Package
import React from "react"

// Import Style
import border from "@/styles/border.module.css"

// Import Icons
import ClockIcon  from "@/components/icons/ClockIcon"
import LocationIcon from "@/components/icons/LocationIcon"

// Data Types
interface CardUpcomingEventProps {
  day: string,
  month: string,
  title: string,
  start_time: string,
  end_time: string,
  location: string
}

// Component
const CardUpcomingEvent: React.FC<CardUpcomingEventProps> = ({
  day,
  month,
  title,
  start_time,
  end_time,
  location
}) => {
  return (
    // Container
    <div className={`${border.border_graph} flex flex-col rounded-[10px] p-2 gap-2 w-[20%]`}>
      {/* Date */}
      <div className="text-xs font-normal">
        <span className="text-3xl font-medium">{day}</span> &nbsp; {month}
      </div>
      {/* Title */}
      <div className="text-sm font-semibold">{title}</div>
      {/* Time */}
      <div className="flex flex-row items-center gap-1">
        <div><ClockIcon /></div>
        <div className="text-[10px] text-white/[.56]">{start_time} - {end_time}</div>
      </div>
      {/* Location */}
      <div className="flex flex-row items-center gap-1">
        <div><LocationIcon width="16" height="16"/></div>
        <div className="text-[10px] text-white/[.56]">{location}</div>
      </div>
    </div>
  )
}

// Export Component
export default CardUpcomingEvent