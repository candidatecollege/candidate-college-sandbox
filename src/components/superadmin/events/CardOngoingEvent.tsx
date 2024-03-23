// Import Packages
import React from "react"
import Image from 'next/image'

// Import Style
import border from "@/styles/border.module.css"

// Data Types
interface CardOngoingEventProps {
  img: string,
  img_name: string,
  name: string,
  date: string,
  start_time: string,
  end_time: string,
  total_participants: number,
}

// Component
const CardOngoingEvent: React.FC<CardOngoingEventProps> = ({
  img,
  img_name,
  name,
  date,
  start_time,
  end_time,
  total_participants
}) => {
  return (
    // Container
    <div className={`${border.border_graph} flex flex-col rounded-[10px] gap-1 w-[48%]`}>
      {/* Cover */}
      <div>
        <Image
          src={`/uploads/${img}`}
          alt={img_name}
          width={0}
          height={0} 
          className="w-full h-[140px] rounded-tr-[10px] rounded-tl-[10px] object-fill"
          />
      </div>
      {/* Content */}
      <div className="flex flex-col gap-1 p-3 bg-[#0E2735]">
        {/* Event Name */}
        <div className="font-semibold text-xl">{name}</div>
        {/* Event Date */}
        <div className="text-xs text-[#86939A] font-medium">
          {date} &nbsp; | &nbsp; {start_time}-{end_time}
        </div>
        {/* Event Participants */}
        <div className="mt-2 text-xs text-secondary font-medium">{total_participants} Participants</div>
      </div>
    </div>
  )
}

// Export Component
export default CardOngoingEvent