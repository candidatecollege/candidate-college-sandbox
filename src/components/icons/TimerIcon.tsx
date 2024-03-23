import React from "react"

const TimerIcon = (props: any) => {
  return (
    <svg width={props.width} height={props.height} viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M26.4372 17.0625C26.4372 23.1 21.5372 28 15.4997 28C9.46223 28 4.56223 23.1 4.56223 17.0625C4.56223 11.025 9.46223 6.125 15.4997 6.125C21.5372 6.125 26.4372 11.025 26.4372 17.0625Z" stroke={props.stroke} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M15.5 10.5V16.75" stroke={props.stroke} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M11.75 3H19.25" stroke={props.stroke} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  )
}

export default TimerIcon
