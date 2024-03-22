// Import Packages
"use client"
import { useEffect, useState } from "react"
import axios from "axios"

// Import Components
import Navbar from "@/components/superadmin/navbar"
import CardArticle from "@/components/academic-development/articles/CardArticle"

// Import Icons
import {PlusIcon} from "@/components/icons"

// Import Styles
import "@/styles/scrollbar-custom.css"


export default function PageArticlesAcdev() {
  // Variables
  const [articles, setArticles] = useState<any>([])
  const [isHovered, setIsHovered] = useState<boolean>(false)

  // Used to retrieve all articles data
  const fetchAllArticles = async () => {
    try {
      const response = await axios.get(`/api/articles`)

      // Used to sort data from current date to earliest date
      const sortedData = response.data.data.sort((a:  any, b: any) => {
        const dateA: any = new Date(a. created_at)
        const dateB: any = new Date(b.created_at)
        return dateB - dateA
      })

      setTimeout(() => {
        setArticles(sortedData)
      }, 1000)
      
    }
    catch(error) {
      console.log(error)
    }
  }

  // Used to custom date format
  const formatDate = (date: any) => {
    const formatDate = new Date(date)

    const monthName = [
      "January", "February", "March", "April", 
      "May", "June", "July", "August",
      "September", "October", "November", "December"
    ]

    const day = formatDate.getDate()
    const monthIndex = formatDate.getMonth()
    const year = formatDate.getFullYear()

    return `${day} ${monthName[monthIndex]} ${year}`
  }

  // Used to control changes when content is hovered 
  const handleHover = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)

  // Render Functions
  useEffect(() => {
    fetchAllArticles()
  })
  
  return (
    <main>
      {/* Navbar */}
      <Navbar 
        title="Article"
        description="Welcome To Your Article Dashboard"
        placeholder="Search for anything"
      />

      {/* Content */}
      <div className="flex flex-row flex-wrap mt-5 gap-4">
        {/* Card */}
        {articles.map((data: any, index: any) => (
          <CardArticle 
              key={index}
              index={index}
              img={data.cover_landscape}
              category={data.category}
              title={data.title}
              date={formatDate(data.created_at)}
              view={data.view}
              slug={data.slug}
          />
        ))}
      </div>

      {/* Add Article */}
      <div className={`fixed bottom-4 right-6 ${isHovered ? "bg-[#0C222F]" : "bg-secondary"} w-14 h-14 rounded-full flex justify-center items-center shadow-lg cursor-pointer`} onMouseEnter={handleHover} onMouseLeave={handleMouseLeave} title="Click to add new article">
        <div>
          <PlusIcon 
            fill={isHovered ? "#FFDE59" : "#0C222F"}  
            width="34"
            height="34"
            isHovered={isHovered}
          />
        </div>
      </div>
    </main>
  )
}