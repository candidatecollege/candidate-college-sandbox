// Import Packages
import axios from "axios";

// Import Interfaces
import {Article} from "./types"

// Export Functions
export const fetchAllArticles = async (): Promise<Article[]> => {
  const response = await axios.get(`/api/articles?count=20`)
  return response.data.data
}