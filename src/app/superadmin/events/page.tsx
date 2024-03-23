// Import Packages
"use client"
import {useState} from "react"

// Import Hooks
import {useEventsData} from "@/hooks/useEventsData"

// Import Icons
import TimerIcon from "@/components/icons/TimerIcon"
import ProfileTickIcon from "@/components/icons/ProfileTickIcon"
import CalendarSearchIcon from "@/components/icons/CalendarSearchIcon"

// Import Components
import Navbar from "@/components/superadmin/navbar"
import { Calendar } from "react-multi-date-picker"
import ComingSoon from '@/components/ComingSoon'
import CardEvent from "@/components/superadmin/events/CardEvent"
import CardOngoingEvent from "@/components/superadmin/events/CardOngoingEvent"
import CardUpcomingEvent from "@/components/superadmin/events/CardUpcomingEvent"
import TitleEventSection from "@/components/superadmin/events/TitleEventSection"

// Import Styles
import border from "@/styles/border.module.css"
import "@/styles/bg-custom.css";
import "@/styles/color-event-calendar.css";

// Import Utils
import splitName from "@/utils/splitName"
import {
  formatDate, 
  formatTime, 
  getDayDate, 
  getMonthDate
} from "@/utils/dateTime"

export default function PageEventsSuperAdmin() {
  // Variables
  const [showComingSoon, setShowComingSoon] = useState<boolean>(false)
  const {
    events,
    ongoingEvents,
    ongoingEventsAvailable,
    upcomingEvents,
    upcomingEventsAvailable,
    error
  } = useEventsData()

  // Card Event Data
  const StatisticEvent = [
    {
      id: 1,
      total: ongoingEvents.length,
      title: "Ongoing Events",
      Icon: TimerIcon
    },
    {
      id: 2,
      total: 250,
      title: "Attended",
      Icon: ProfileTickIcon
    },
    {
      id: 3,
      total: upcomingEvents.length,
      title: "Upcoming Events",
      Icon: CalendarSearchIcon
    }
  ] 

  // Used to change into coming soon page
  const handleClick = () => setShowComingSoon(true)

  // Used to send error messages to user when loading events fail
  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <main>
      {/* Navbar */}
      <Navbar
        title="Event"
        description="Welcome To Your Event Dashboard"
        placeholder="Search for anything"
      />

      {/* Events */}
      {showComingSoon ? (
        <ComingSoon />
      ) : (
        <div className="mt-4 px-2">
          {/* Content Line 1 */}
          <div className="flex flex-row flex-wrap gap-4">
            {StatisticEvent.map(data => (
              <CardEvent 
                key={data.id}
                total={data.total}
                title={data.title}
                Icon={data.Icon}
              />
            ))}
          </div>

          {/* Content Line 2 */}
          <div className="flex flex-row mt-5 gap-4">
            {/* Ongoing Events */}
            <div className={`bg-[#0000008F] px-7 py-5 rounded-[10px] w-[73%]`}>
              {/* Line 1 */}
              <TitleEventSection title="Ongoing Events" Icon={TimerIcon} onClick={handleClick} />
              {/* Line 2 */}
              <div className="flex flex-row mt-6 gap-10">
                {/* Card */}
                {ongoingEventsAvailable ? (
                  ongoingEvents.map((data: any, index: any) => (
                    <CardOngoingEvent 
                        key={index}
                        img={data.cover_landscape}
                        img_name={data.name}
                        name={splitName(data.name, 2)}
                        date={formatDate(data.start_date_time)}
                        start_time={formatTime(data.start_date_time)}
                        end_time={formatTime(data.end_date_time)}
                        total_participants={121}
                      />
                  ))
                ) : (
                  // Display notification message if there are no ongoing events
                  <div className="flex justify-center items-center w-full h-44 text-lg">
                    There are no ongoing events at the moment
                  </div>
                )}
              </div>
            </div>
            {/* Calendar */}
            <div className={`${border.border_graph} bg-[#0000008F] rounded-[10px]`}>
              <Calendar 
                  className="bg-dark white h-full"
                  multiple
                  onChange={(e) => console.log(e)}
                  mapDays={({ date }) => {
                    // Default background and text color
                    let backgroundColor = ""
                    let textColor = ""

                    // Check if current calendar date is within range of any event
                    const isWithinEventRange = events.some((event: any) => {
                      const startDate = event.start_date_time.split(" ")[0]
                      const endDate = event.end_date_time.split(" ")[0]
                      const currentDate = date.format("YYYY-MM-DD")
                      return currentDate >= startDate && currentDate <= endDate
                    })

                    // If current calendar date is within an event range, set custom background and text color
                    if(isWithinEventRange) {
                      backgroundColor = "#FFDE59"
                      textColor = "#1B4E6B"
                    }

                    return {
                      style: {
                        backgroundColor: backgroundColor,
                        color: textColor
                      }
                    }
                  }}
              />
            </div>
          </div> 

          {/* Content Line 3 */}
          <div className="flex flex-row mt-5">
            {/* Upcoming Events */}
            <div className={`bg-[#0000008F] px-7 py-5 rounded-[10px] w-[100%]`}>
              {/* Line 1 */}
              <TitleEventSection title="Upcoming Events" Icon={CalendarSearchIcon} onClick={handleClick} />
              {/* Line 2 */}
              <div className="flex flex-row mt-6 gap-4">
                {/* Card */}
                {upcomingEventsAvailable ? (
                  upcomingEvents.map((data: any, index: any) => (
                    <CardUpcomingEvent 
                      key={index}
                      day={getDayDate(data.start_date_time)}
                      month={getMonthDate(data.start_date_time)}
                      title={splitName(data.name, 2)}
                      start_time={formatTime(data.start_date_time)}    
                      end_time={formatTime(data.end_date_time)}
                      location={"Zoom"}
                    />
                  ))
                ) : (
                  // Display notification message if there are no upcoming events
                  <div className="flex justify-center items-center w-full h-40 text-lg">
                    There are no upcoming events for the couple next days
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}