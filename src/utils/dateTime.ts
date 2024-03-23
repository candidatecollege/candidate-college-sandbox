// Used to custom date format
export const formatDate = (date : any) => {
  const formatDate = new Date(date)
  
  const monthName = [
    "Jan", "Feb", "Mar", "Apr", 
    "Mei", "Jun", "Jul", "Agu", 
    "Sep", "Okt", "Nov", "Des"
  ]
  
  const day = formatDate.getDate()
  const monthIndex = formatDate.getMonth()
  const year = formatDate.getFullYear()

  return `${day} ${monthName[monthIndex]}, ${year}`
}

// Used to custom time format
export const formatTime = (time: any) => {
  const date = new Date(time)

  const hours = date.getHours()
  const minutes = date.getMinutes()

  const formattedHours = hours % 12 || 12
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
  const ampm = hours < 12 ? "AM" : "PM"

  return `${formattedHours}:${formattedMinutes} ${ampm}`
}

// Used to get only day of date
export const getDayDate = (dayDate: any) => {
  const formatDate = new Date(dayDate)
  const date = formatDate.getDate()

  return `${date}`
}

// Used to get only month of date
export const getMonthDate = (monthDate: any) => {
  const formatDate = new Date(monthDate)
  const monthIndex = formatDate.getMonth()

  const monthName = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ]

  return `${monthName[monthIndex]}`
}