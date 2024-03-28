// Import Packages
import React from "react"

// Component
const SkeletonCardArticle = () => {
  return (
    <div className="bg-[#0C222F] flex flex-col w-[32%] p-5 gap-5 rounded-lg shadow-lg">
      {/* Cover */}
      <div className="relative flex justify-center items-center w-full h-36 bg-gray-500 rounded-lg">
        <svg
          className="w-12 h-12 text-gray-100 dark:text-gray-400 animate-pulse"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
           <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
        </svg>
      </div>
      {/* Desc */}
      <div className="flex flex-col gap-5">
        {/* Title */}
        <div className="w-full h-12 bg-gray-500 rounded-lg"></div>
        {/* Detail */}
        <div className="relative flex flex-row justify-between items-center">
          {/* Date and View */}
          <div className="flex flex-col gap-3">
            {/* Date */}
            <div className="w-28 h-4 bg-gray-500 rounded-md"></div>
            {/* View */}
            <div className="w-28 h-4 bg-gray-500 rounded-md"></div>
          </div>
          {/* Button */}
          <div className="absolute bottom-1 right-0 bg-gray-500 px-10 py-[18px] rounded-3xl"></div>
        </div>
      </div>
    </div>
  )
}

export default SkeletonCardArticle