// Import Packages
"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import Link from 'next/link'

// Import Hooks
import { useArticlesData } from "@/hooks/useArticlesData"

// Import Icons
import {PlusIcon} from "@/components/icons"

// Import Components
import Navbar from "@/components/superadmin/navbar"
import CardArticle from "@/components/academic-development/articles/CardArticle"
import SkeletonCardArticle from "@/components/academic-development/articles/SkeletonCardArticle"

// Import Utils
import { getToken } from "@/utils/token";

// Import Styles
import "@/styles/scrollbar-custom.css"

export default function PageArticlesAcdev() {
  // Variables
  const loadingContent = Array.from(Array(20).keys())
  const [isHovered, setIsHovered] = useState<boolean>(false)
  const {isLoading, articles, error} = useArticlesData()

  // Used to check user already login or not
  const storedToken = getToken();
  const router = useRouter();

  useEffect(() => {
    if (!storedToken) {
      router.push("/auth");
    }
  }, [storedToken, router]);

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

  // Used to send error messages to user when loading articles fail
  if (error) {
    return <div>Err: {error}</div>
  }

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
        {isLoading ? loadingContent?.map((_, index) => (
          <SkeletonCardArticle key={index} />
        )) : articles?.map((data: any, index: any) => (
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
      <Link href="/academic-development/articles/create">
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
      </Link>
    </main>
  )
}