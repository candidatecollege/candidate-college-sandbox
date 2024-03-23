// Import Packages
import {useState, useEffect} from "react"
import axios from "axios"

// Data Types
interface Event {
  start_date_time: string,
  end_date_time: string,
  [key: string]: any
}

// API Call
export const useEventsData = () => {
  // Variables
  const [events, setEvents] = useState<Event[]>([])
  const [ongoingEvents, setOngoingEvents] = useState<Event[]>([])
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([])
  const [ongoingEventsAvailable, setOngoingEventsAvailable] = useState<boolean>(false)
  const [upcomingEventsAvailable, setUpcomingEventsAvailable] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  // Running Function
  useEffect(() => {
    // Used to retrieve all event data
    const fetchAllEvents = async () => {
      try {
        const response = await axios.get(`/api/events`)
        
        // Used to sort data form earliest date to current date
        const sortedData = response.data.data.sort((a: Event, b: Event) => {
          const dateA: any = new Date(a.start_date_time)
          const dateB: any = new Date(b.start_date_time)
          return dateA - dateB
        })

        // Variables
        let ongoingEventsCount = 0
        let upcomingEventsCount = 0
        const currentDate = new Date()
        const ongoingEvents: Event[] = []
        const upcomingEvents: Event[] = []

        // Used to retrieve ongoing and upcoming events data
        sortedData.forEach((event: Event) => {
          const startDate = new Date(event.start_date_time)
          const endDate = new Date(event.end_date_time)
  
          if (currentDate >= startDate && currentDate <= endDate && ongoingEventsCount < 2) {
            ongoingEvents.push(event)
            ongoingEventsCount++
          } else if (currentDate < startDate && upcomingEventsCount < 5) {
            upcomingEvents.push(event)
            upcomingEventsCount++
          }
        })

        setTimeout(() => {
          setEvents(sortedData)
          setOngoingEvents(ongoingEvents)
          setUpcomingEvents(upcomingEvents)
          setOngoingEventsAvailable(ongoingEvents.length > 0)
          setUpcomingEventsAvailable(upcomingEvents.length > 0)
        }, 1500)
      } catch(error) {
        console.log("Failed to fetch events:", error)
        setError("Failed to load events. Please try again later.")
      }
    }

    fetchAllEvents()
  }, [])

  return {events, ongoingEvents, upcomingEvents, ongoingEventsAvailable, upcomingEventsAvailable, error}
}

