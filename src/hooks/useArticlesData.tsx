// Import Packages
import {useState, useEffect} from "react"

// Import Interfaces
import { Article } from "@/services/types"

// Import Services
import { fetchAllArticles } from "@/services/articleService"

// API Call
export const useArticlesData = () => {
  // Variables
  const [articles, setArticles] = useState<Article[]>([])
  const [error, setError] = useState<string | null>(null)

  // Render Function
  useEffect(() => {
    // Used to retrieve all articles data
    const getAllArticles = async () => {
      try {
        const response = await fetchAllArticles(); 
        
        // Used to sort data from current date to earliest date
        const sortedData = response.sort((a:  Article, b: Article) => {
          const dateA: any = new Date(a. created_at)
          const dateB: any = new Date(b.created_at)
          return dateB - dateA
        })

        setTimeout(() => {
          setArticles(sortedData)
        }, 1000)
      } catch (error) {
          console.log("Failed to fetch articles:", error);
          setError("Failed to load articles. Please try again later.")
      }
    }
  
    getAllArticles()
  }, [])

  return {articles, error}
}