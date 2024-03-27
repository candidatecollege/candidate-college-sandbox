// Import Packages
import React from "react"
import Image from 'next/image'
import Link from 'next/link'

// Import Icons
import {
  EditIcon,
  Trash2Icon,
  CalendarIcon,
  ViewIcon
} from "@/components/icons"

// Import Style
import border from "@/styles/border.module.css"

// Data Types
interface CardArticleProps {
  index: number
  img: string,
  category: string,
  title: string,
  date: string,
  view: number,
  slug: string,
}

// Component
const CardArticle: React.FC<CardArticleProps> = ({
  index,
  img,
  category,
  title,
  date,
  view,
  slug
}) => {
  return (
    // Card
    <div className={`${border.border_graph} flex flex-col bg-[#0C222F] w-[32%] p-4 gap-4 rounded-lg shadow-lg ${index === 0 ? "animate-slideUp" : ""} ${index === 3 ? "animate-slideLeft" : ""}${index === 6 ? "animate-slideInFromRight" : ""}`} >
      {/* Cover */}
      <div className="relative">
        {/* Edit and Delete */}
        <div className="absolute top-2 right-3 flex flex-row gap-2">
          {/* Edit */}
          <div className="flex justify-center items-center p-[5px] bg-[#FFDE598F] group hover:bg-secondary rounded-lg cursor-pointer" title="Edit Article">
            <button><EditIcon /></button>
          </div>
          {/* Delete */}
          <div className="flex justify-center items-center p-[5px] bg-[#DC26268F] group hover:bg-[#DC2626] rounded-lg cursor-pointer" title="Delete Article">
            <button><Trash2Icon /></button>
          </div>
        </div>
        {/* Image */}
        <Image 
            src={`/uploads/${img}`}
            alt={title}
            width={100}
            height={53}
            quality={70}
            priority={true} 
            className="w-full rounded-xl"
        />
        {/* Category */}
        <div className="absolute bottom-2 left-2 bg-secondary text-primary text-xs font-bold p-1 rounded-lg w-20 flex justify-center items-center">{category}</div>
      </div>
      {/* Desc */}
      <div className="flex flex-col gap-4">
        {/* Title */}
        <div className="text-[16px] font-bold h-[100px]">{title}</div>
        {/* Detail */}
        <div className="relative flex flex-row justify-between items-center">
          {/* Date and View */}
          <div className="flex flex-col gap-1">
            {/* Date */}
            <div className="flex flex-row gap-2 items-center">
              <div><CalendarIcon /></div>
              <div className="text-xs text-[#949EA4] font-medium">{date}</div>
            </div>
            {/* View */}
            <div className="flex flex-row gap-2 items-center">
              <div><ViewIcon width="15" height="15" stroke="#949EA4" /></div>
              <div className="text-xs text-[#849EA4] font-medium">{view} View</div>
            </div>
          </div>
          {/* Button */}
          <div className="absolute bottom-1 right-0 bg-secondary hover:bg-primary text-primary hover:text-secondary text-sm font-semibold px-4 py-[8px] rounded-3xl cursor-pointer" title="Click to detail article">
            <Link href={`https://candidate-college.vercel.app/articles/${slug}`} target="_blank">
              <button>Detail</button>
            </Link>
          </div>
        </div>
      </div>
  </div>
  )
}

// Export Component
export default CardArticle
