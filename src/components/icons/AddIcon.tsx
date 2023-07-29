import React from 'react'

const AddIcon: React.FC<any> = ({ size, color }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
        <path d="M20.5 11H15C14.4477 11 14 10.5523 14 10V4.5C14 3.67157 13.3284 3 12.5 3C11.6716 3 11 3.67157 11 4.5V10C11 10.5523 10.5523 11 10 11H4.5C3.67157 11 3 11.6716 3 12.5C3 13.3284 3.67157 14 4.5 14H10C10.5523 14 11 14.4477 11 15V20.5C11 21.3284 11.6716 22 12.5 22C13.3284 22 14 21.3284 14 20.5V15C14 14.4477 14.4477 14 15 14H20.5C21.3284 14 22 13.3284 22 12.5C22 11.6716 21.3284 11 20.5 11Z" fill={color}/>
    </svg>
  )
}

export default AddIcon
