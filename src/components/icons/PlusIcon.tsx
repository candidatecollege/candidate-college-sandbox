import React from "react"

const PlusIcon = (props: any) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" id="Plus" width={props.width} height={props.height} className={`transform transition-transform ${props.isHovered ? "rotate-90 duration-300" : ""}`}>
      <g fill="none" fill-rule="evenodd" stroke={props.fill} stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
        <path d="M8 1v14M1 8h14" fill={props.fill}></path>
      </g>
    </svg>
  )
}

export default PlusIcon